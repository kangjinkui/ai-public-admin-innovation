// 발표자료 정합성 검증: node scripts/verify.js
// 1) 장수·id  2) 수치 원장 대조  3) 금지어  4) 필수 문구  5) 공개안전  6) 이미지 실존·alt  7) 외부 링크 허용목록
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const { facts } = JSON.parse(fs.readFileSync(path.join(root, 'data', 'facts.json'), 'utf8'));
const errors = [];
const fail = (msg) => errors.push(msg);

// 1) 장수·id
const EXPECTED_SLIDES = 20;
const ids = [...html.matchAll(/<section class="slide[^"]*" id="([^"]+)"/g)].map((m) => m[1]);
if (ids.length !== EXPECTED_SLIDES) fail(`슬라이드 ${EXPECTED_SLIDES}장 기대, 실제 ${ids.length}장`);
if (new Set(ids).size !== ids.length) fail('슬라이드 id 중복');
const sections = [...html.matchAll(/<section class="slide[\s\S]*?<\/section>/g)].map((m) => m[0]);
sections.forEach((s, i) => {
  if (!/<aside class="notes">[\s\S]*?<p>/.test(s)) fail(`s${i + 1}: 발표자 노트 없음`);
});

// 슬라이드 텍스트(노트 포함, 태그·주석·URL 제거)
const text = sections.join('\n')
  .replace(/<!--[\s\S]*?-->/g, ' ')
  .replace(/<svg[\s\S]*?<\/svg>/g, (svg) => svg.replace(/<(?!text)[^>]+>/g, ' ')) // SVG 내부 좌표 속성 제거
  .replace(/<[^>]+>/g, ' ')
  .replace(/https?:\/\/\S+/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"');

// 2) 수치 원장 대조
const allowed = new Set(facts.flatMap((f) => f.tokens.map((t) => t.replace(/\s+/g, ''))));
const UNIT = '(?:%|건|분|종|개소|개월|개|회|만원|원|초|일|년|월|m|단계|가지|곳)';
const numRe = new RegExp(`(?<![제\\d.~])(?:약\\s*)?\\d[\\d.,]*(?:\\s*~\\s*\\d[\\d.,]*)?\\s*${UNIT}(?![가-힣A-Za-z])`, 'g');
// 날짜·조문·자료명 등 수치 성과가 아닌 표기는 제외
const ignore = [/^\d{4}\./, /^제?\d+조/, /^\d{1,2}\.\s*\d/, /^\d{4}년/];
const unknown = new Set();
for (const m of text.matchAll(numRe)) {
  const tok = m[0].replace(/\s+/g, '');
  if (ignore.some((r) => r.test(tok))) continue;
  const bare = tok.replace(/^약/, '');
  if (!allowed.has(tok) && !allowed.has(bare)) unknown.add(tok);
}
// 날짜 표기 문맥(YYYY. M. D.)의 숫자는 위 정규식 단위에 걸리지 않음
for (const u of unknown) fail(`원장에 없는 수치: "${u}"`);

// 3) 금지어 (사실과 다르거나 과장된 기존 표현)
const forbidden = ['90%', '8회', '완벽', '제로화', '표준이 되다', '전국 확산을 주도', 'gangnam-go', '기적', '박제'];
for (const w of forbidden) if (text.includes(w)) fail(`금지어 포함: "${w}"`);
if (/(?<![~\d])15분\s*→/.test(text)) fail('"15분 →" 표기 금지(10~15분으로 표기)');
if (/판정\s*매칭률/.test(text)) fail('"판정 매칭률" 표현 금지(설계 대비 구현 일치율로 표기)');

// 4) 필수 문구
const required = ['사람 승인', '보도자료 기준', '적극행정 신청서 기준', '10~15분', '근거 조문', '3회 개선', '기타'];
for (const w of required) if (!text.includes(w)) fail(`필수 문구 누락: "${w}"`);

// 5) 공개안전
const unsafe = [/C:[\\/]+Users/i, /\\\\wsl/i, /\/home\/jinkui/, /API_KEY\s*=/, /DATABASE_URL/, /PRIVATE KEY/, /01[016789]-?\d{3,4}-?\d{4}/, /[\w.+-]+@[\w-]+\.(?:go\.kr|com|net|kr)/];
for (const r of unsafe) if (r.test(html)) fail(`공개안전 위반 패턴: ${r}`);

// 6) 이미지 실존·alt
for (const m of html.matchAll(/<img\s[^>]*>/g)) {
  const tag = m[0];
  const src = (tag.match(/src="([^"]+)"/) || [])[1];
  const alt = (tag.match(/alt="([^"]*)"/) || [])[1];
  if (!src || !fs.existsSync(path.join(root, src))) fail(`이미지 없음: ${src}`);
  if (!alt) fail(`alt 없음: ${src}`);
}

// 7) 외부 링크 허용목록
const allowHosts = ['hbc.ai.kr', 'signcheck.vercel.app', 'ad-permit-manager.vercel.app', 'biweekly-report-board.vercel.app', 'github.com', 'fonts.googleapis.com', 'fonts.gstatic.com', 'www.w3.org'];
for (const m of html.matchAll(/https?:\/\/([^/"'\s<>)]+)/g)) {
  if (!allowHosts.includes(m[1])) fail(`허용되지 않은 외부 호스트: ${m[1]}`);
}

if (errors.length) {
  console.error(`FAIL (${errors.length})\n- ` + errors.join('\n- '));
  process.exit(1);
}
console.log(`PASS: slides=${ids.length}, notes=${sections.length}, facts=${facts.length}, allowedTokens=${allowed.size}`);
