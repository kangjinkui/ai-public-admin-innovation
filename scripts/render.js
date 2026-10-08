// 렌더 검증: node scripts/render.js [outDir]
// 1920x1080·1366x768·390x844에서 각 슬라이드를 캡처하고, 넘침·가로스크롤·콘솔 오류·PDF 페이지 수를 점검한다.
// playwright 모듈 경로는 PLAYWRIGHT_DIR 환경변수로 지정할 수 있다.
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');
const pwPath = process.env.PLAYWRIGHT_DIR ? path.join(process.env.PLAYWRIGHT_DIR, 'playwright') : 'playwright';
const { chromium } = require(pwPath);

const root = path.resolve(__dirname, '..');
const outDir = path.resolve(process.argv[2] || path.join(root, '.render'));
const url = pathToFileURL(path.join(root, 'index.html')).href;
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  // PW_CHANNEL=msedge 처럼 설치된 브라우저 채널을 쓸 수 있다
  const browser = await chromium.launch(process.env.PW_CHANNEL ? { channel: process.env.PW_CHANNEL } : {});
  const problems = [];
  for (const [w, h, tag] of [[1920, 1080, 'fhd'], [1366, 768, 'hd'], [390, 844, 'mobile']]) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, reducedMotion: 'reduce' }); // 모션이 끝난 최종 화면을 점검
    const logs = [];
    page.on('console', (m) => { if (m.type() === 'error') logs.push(m.text()); });
    page.on('pageerror', (e) => logs.push(String(e)));
    await page.goto(url + '#s1', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const total = await page.$$eval('.slide', (s) => s.length);
    for (let i = 0; i < total; i++) {
      await page.evaluate((n) => { location.hash = `#s${n + 1}`; }, i);
      await page.keyboard.press('Home');
      for (let k = 0; k < i; k++) await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(80);
      if (tag === 'fhd') {
        // 슬라이드 내부 넘침: 자식 요소가 1080 높이/1920 너비를 넘는지 (deck 좌표계)
        const over = await page.evaluate(() => {
          const s = document.querySelector('.slide.active');
          const deck = document.getElementById('deck').getBoundingClientRect();
          const scale = deck.width / 1920;
          const bad = [];
          s.querySelectorAll('*').forEach((el) => {
            if (el.closest('aside.notes') || el.closest('svg')) return;
            const r = el.getBoundingClientRect();
            if (!r.width || !r.height) return;
            const bottom = (r.bottom - deck.top) / scale, right = (r.right - deck.left) / scale;
            if (bottom > 1080.5 || right > 1920.5) bad.push(`${el.tagName.toLowerCase()}.${el.className || ''} b=${Math.round(bottom)} r=${Math.round(right)}`);
          });
          // 본문이 출처줄(하단 34px + 높이)과 겹치는지
          const src = s.querySelector('.src')?.getBoundingClientRect();
          const content = [...s.children].filter((c) => !c.classList.contains('src') && c.tagName !== 'ASIDE' && getComputedStyle(c).position !== 'absolute');
          const maxBottom = Math.max(...content.map((c) => c.getBoundingClientRect().bottom));
          if (src && maxBottom > src.top - 4) bad.push(`본문이 출처줄과 겹침 (${Math.round((maxBottom - src.top) / scale)}px)`);
          return bad.slice(0, 5);
        });
        if (over.length) problems.push(`s${i + 1}: ${over.join(' | ')}`);
      }
      await page.screenshot({ path: path.join(outDir, `${tag}-s${String(i + 1).padStart(2, '0')}.png`) });
    }
    const hscroll = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    if (hscroll) problems.push(`${tag}: 가로 스크롤 발생`);
    if (logs.length) problems.push(`${tag}: 콘솔 오류 ${logs.join(' / ')}`);
    if (tag === 'fhd') {
      // 노트 패널 동작
      await page.keyboard.press('n');
      await page.screenshot({ path: path.join(outDir, 'fhd-notes.png') });
      const open = await page.$eval('#notesPanel', (el) => el.classList.contains('open'));
      if (!open) problems.push('노트 패널이 N 키로 열리지 않음');
      await page.keyboard.press('n');
      await page.keyboard.press('o');
      await page.screenshot({ path: path.join(outDir, 'fhd-overview.png') });
      await page.keyboard.press('Escape');
      // PDF
      const pdf = await page.pdf({ path: path.join(outDir, 'deck.pdf'), width: '13.333in', height: '7.5in', printBackground: true });
      const pages = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
      if (pages !== total) problems.push(`PDF 페이지 ${pages}장 (기대 ${total})`);
      console.log(`PDF pages=${pages}`);
    }
    await page.close();
  }
  await browser.close();
  if (problems.length) { console.error('RENDER ISSUES\n- ' + problems.join('\n- ')); process.exit(1); }
  console.log(`RENDER PASS → ${outDir}`);
})();
