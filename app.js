// 슬라이드 원문 텍스트 (접근성·검색용). 이미지 슬라이드의 내용을 그대로 옮김.
const SLIDES = [
  {
    title: "행정을 잇는 공공개발",
    items: ["16년의 현장 경험과 AI 코딩으로 단절된 행정의 흐름을 다시 잇다"],
    note: "강남구 도시계획과 강진규 | 일반행정 분야",
  },
  {
    title: "행정의 진짜 문제는 제도의 부족이 아니라 '흐름의 끊어짐'입니다",
    items: [
      "<b>현장 ↔ 사무실</b> — 민원 발생 후 움직이는 사후 대응, 파편화된 수기/엑셀 데이터",
      "<b>법령 ↔ 담당자</b> — 수만 가지 경우의 수를 개인의 기억과 수동 대조에 의존",
      "<b>전임자 ↔ 후임자</b> — 2~3년 순환보직으로 현장의 암묵지가 휘발됨",
    ],
    note: "기술은 무언가를 새로 과시하는 것이 아니라, 이 끊어진 지점들을 잇는 도구여야 합니다.",
  },
  {
    title: "단절을 이은 3대 공공개발 연결망",
    items: [
      "<b>정당현수막 관리 (현장↔사무실)</b> — 사후 대응 → 위치 데이터 기반 사전 관리 · <span class=key>기간 경과 민원 약 70% 감소</span>",
      "<b>옥외광고 3종 (데이터↔판단)</b> — 수동 검색 → 4단계 규칙 엔진(AdJudge) 자동판정 · <span class=key>민원 검토시간 15분 → 1분 이내 (약 90% 감소)</span>",
      "<b>LLM Wiki &amp; 업무보고 (경험↔조직)</b> — 경험 휘발 → 조직의 공식 지식 파이프라인 구축 · <span class=key>업무 질의 265건 지식화, 수합 반복 제로화</span>",
    ],
    note: "전체 예산 0원 / AI·노코드·바이브 코딩 자체 개발 (약 35일 소요)",
  },
  {
    title: "사후 민원 대응에서 위치 데이터 기반 '선제적 현장관리'로",
    items: [
      "<b>데이터 필터링:</b> 13개 활성 정당, 행정동별·상태별 즉시 검색 및 엑셀 출력",
      "<b>공간 시각화:</b> 카카오맵 기반 활성 54건, 만료 53건 분리 (빨간 핀 = 만료)",
      "<b>사전 정비 동선:</b> 현장 출동 전 만료 위치 파악으로 철거 동선 최적화",
    ],
    note: "기존: 민원 접수 → 현장 확인 → 수기/엑셀 기록  ⟶  현재: 스마트폰 지도 확인 → 만료 즉시 사전 정비",
  },
  {
    title: "기간 경과 민원 70% 감소, 전국 지자체 확산의 표준이 되다",
    items: [
      "기간 경과 민원: 11.3건 → 3.3건 <span class=key>↓ 70% 감소</span>",
      "금지 장소 설치 민원: 3.3건 → 0건 <span class=key>Zero 달성</span>",
      "설치 방법 위반 민원: 7.7건 → 2.7건 <span class=key>↓ 65% 감소</span>",
      "언론 보도: 한국일보 「정당 현수막 늪에 빠진 지자체…공무원 개발 '강남스타일' 시스템 통했다」, 조선비즈 「'3개월 독학' 공무원, 민원 70% 줄인 시스템 개발」 (2025.06.19)",
    ],
    note: "성북구, 파주시, 경남도청, 세종시, 동작구, 김포시, 대전 동구청 도입 문의 및 확산 중",
  },
  {
    title: "10분이 걸리던 복잡한 법령 대조, 1초 만에 끝나는 규칙 엔진(AdJudge)",
    items: [
      "기존: 민원 1건당 평균 10~15분 수동 대조 (광고물 종류, 면적, 층수, 조명, 용도지역, 특정구역, 심의대상)",
      "4단계 규칙: 1. 옥외광고물법 → 2. 시행령 → 3. 서울시 조례 → 4. 강남구 심의기준",
      "결과: 허가/신고/불가 판정 · 수수료 금액 · 구비서류 목록 · 근거 조문 링크",
    ],
  },
  {
    title: "동일 입력 동일 결과, 담당자 개인의 경험 의존도를 낮추다",
    items: [
      "13종 광고물 조건 입력",
      "판정 매칭률: <span class=key>84% → 98%</span> (8회 반복 검증 완료)",
      "민원 검토 시간: <span class=key>15분 → 1분 이내 단축</span>",
      "112건 · 46건 — 접수-검토-소심의-점검-허가의 전 과정을 하나의 타임라인으로 통합 (보도자료 기준 148건 관리 중)",
    ],
  },
  {
    title: "눈으로 찾던 이격 거리 검토, 위치 기반 공간 데이터 분석으로 전환",
    items: [
      "기존: 지도와 서류를 번갈아 확인하며 자(Ruler)로 개별 검색",
      "1. 강남구 내 대형 디지털 광고물 48개소 위치 DB 구축",
      "2. 신규 설치 예정 핀 클릭 → 즉시 반경 200m 분석",
      "3. 인접 광고물 자동 추출 및 검토보고서 즉시 생성",
    ],
  },
  {
    title: "업무의 진짜 어려움은 법령 검색이 아닌 '경험의 휘발'에 있습니다",
    items: [
      "담당자가 민원 현장에서 온몸으로 부딪히며 쌓아 올린 강력한 행정 경험과 암묵지.",
    ],
    note: "2~3년 순환보직 사이클과 함께 조직에 축적되지 못하고 연기처럼 사라집니다.",
  },
  {
    title: "흩어지는 암묵지를 살아있는 지식 매뉴얼로: LLM Wiki 파이프라인",
    items: [
      "1. 현장 질의 (Input) — 실제 업무 질의 발생",
      "2. AI 초안 작성 (Draft) — 간판도우미(Agent) 1차 답변 생성",
      "3. 원문 검증 (Verify) — 법규집, 설치가이드 원문 교차 대기",
      "<span class=key>4. 사람의 승인 (Human in the Loop)</span> — 담당자가 검토 후 최종 승인 (AI에 결정을 맡기지 않음)",
      "5. 지식 승격 (Wiki) — 공식 매뉴얼로 박제 및 축적",
    ],
    note: "데이터: 실제 업무 질의응답 265건 → 11개 유형으로 완벽 분류 및 지식화",
  },
  {
    title: "조직 내부의 낭비도 끊어내다: 격주 업무보고 자동 수합판",
    items: [
      "<b>과거의 단절 (The Past)</b> — 잦은 한글(HWP) 양식 깨짐 → 각 팀 엑셀/한글 무한 복붙 제출 → 수합 담당자 순서 정렬 및 노가다. 작성자도, 수합자도 피곤한 흐름",
      "<b>현재의 연결 (The Present)</b> — 웹 기반 실시간 항목 입력 · 자동 저장 및 대시보드 관리 · 실시간 PDF 출력",
    ],
    note: "작성자는 덜 쓰고, 수합자는 덜 고치고, 보고자는 더 빨리 확인한다. (지난 회차 복사 기능 및 읽기 전용 공유 화면 제공)",
  },
  {
    title: "예산 0원, 35일의 기적. 공감(Empathy)이 제1의 프로그래밍 언어입니다",
    items: [
      "<b>1. 16년의 도메인 지식</b> — 현장 정비와 민원 처리 경험이 '진짜 문제(Pain point)'를 정의",
      "<b>2. AI 코딩 도구의 활용</b> — 바이브 코딩으로 비전공자의 한계 돌파. 단 35일 만에 3종 자체 구축",
      "<b>3. 오픈소스 기반 확산</b> — 타 지자체 즉시 이식 가능하도록 투명하게 코드 공개",
    ],
  },
  {
    title: "기술을 위해 문제를 찾지 않고, 문제를 풀기 위해 기술을 잇습니다",
    items: [
      "<b>사후 대응에서 사전 관리로</b> — 공간 데이터를 활용한 선제적 현장 정비",
      "<b>개인의 기억에서 조직의 지식으로</b> — 로컬 LLM 시대를 대비한 행정 암묵지 축적",
      "<b>새로운 공공개발의 표준</b> — 예산 없이, 비전공자도 AI와 협업하여 전국 확산을 주도",
    ],
    note: "단절된 현장, 데이터, 조직의 지식을 연결하여 빠르고 정확한 'AX 행정'의 청사진을 완성하겠습니다.",
  },
];

const pad = (n) => String(n).padStart(2, "0");
const src = (i) => `slides/slide-${pad(i + 1)}.webp`;
const thumb = (i) => `slides/thumb-${pad(i + 1)}.webp`;
const plain = (html) => html.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&");

const $ = (id) => document.getElementById(id);
const img = $("slideImg");
const total = SLIDES.length;
let current = 0;

// 썸네일 스트립과 전체 보기 그리드 생성
SLIDES.forEach((s, i) => {
  const li = document.createElement("li");
  li.innerHTML = `<button type="button" aria-label="${i + 1}번 슬라이드: ${plain(s.title)}"><img src="${thumb(i)}" alt="" loading="lazy" width="480" height="268"></button>`;
  li.firstChild.addEventListener("click", () => go(i));
  $("thumbs").appendChild(li);

  const card = document.createElement("button");
  card.type = "button";
  card.innerHTML = `<img src="${thumb(i)}" alt="" loading="lazy" width="480" height="268"><span><b>${pad(i + 1)}</b>${plain(s.title)}</span>`;
  card.addEventListener("click", () => { toggleGrid(false); go(i); });
  $("grid").appendChild(card);
});

function go(i) {
  current = Math.max(0, Math.min(total - 1, i));
  const s = SLIDES[current];
  img.src = src(current);
  img.alt = `${current + 1}번 슬라이드: ${plain(s.title)}`;
  $("counter").textContent = `${current + 1} / ${total}`;
  $("progress").style.width = `${((current + 1) / total) * 100}%`;
  $("prevBtn").disabled = current === 0;
  $("nextBtn").disabled = current === total - 1;

  $("noteNum").textContent = pad(current + 1);
  $("noteTitle").textContent = plain(s.title);
  $("noteBody").innerHTML =
    `<ul>${s.items.map((t) => `<li>${t}</li>`).join("")}</ul>` + (s.note ? `<p>${s.note}</p>` : "");

  $("thumbs").querySelectorAll("button").forEach((b, k) => {
    b.setAttribute("aria-current", k === current ? "true" : "false");
    if (k === current) b.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  });

  if (location.hash !== `#${current + 1}`) history.replaceState(null, "", `#${current + 1}`);

  // 다음/이전 슬라이드 미리 로드
  [current - 1, current + 1].forEach((k) => { if (k >= 0 && k < total) new Image().src = src(k); });
}

function toggleGrid(show) {
  $("grid").hidden = !show;
  $("viewer").hidden = show;
  $("gridBtn").setAttribute("aria-pressed", String(show));
  $("gridBtn").textContent = show ? "슬라이드 보기" : "전체 보기";
}

$("prevBtn").addEventListener("click", () => go(current - 1));
$("nextBtn").addEventListener("click", () => go(current + 1));
$("gridBtn").addEventListener("click", () => toggleGrid($("grid").hidden));
$("fsBtn").addEventListener("click", () => {
  const stage = $("stage");
  if (document.fullscreenElement) document.exitFullscreen();
  else if (stage.requestFullscreen) stage.requestFullscreen();
});

document.addEventListener("keydown", (e) => {
  if (e.target.closest("input, textarea")) return;
  if (["ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); go(current + 1); }
  else if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); go(current - 1); }
  else if (e.key === "Home") go(0);
  else if (e.key === "End") go(total - 1);
});

let touchX = null;
$("stage").addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
$("stage").addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1));
  touchX = null;
});
$("stage").addEventListener("click", (e) => {
  if (e.target !== img) return;
  const r = img.getBoundingClientRect();
  go(current + (e.clientX - r.left > r.width / 2 ? 1 : -1));
});

const fromHash = parseInt(location.hash.slice(1), 10);
go(Number.isInteger(fromHash) ? fromHash - 1 : 0);
