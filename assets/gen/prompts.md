# 생성 이미지 프롬프트 기록

생성 도구: Codex CLI 0.153.4 이미지 생성 기능(GPT 이미지). 모든 이미지는 글자·숫자·로고 없이 생성하고, 라벨과 수치는 HTML로 얹는다.

## 공통 스타일 (2026-10-08 확정: 밝은 톤 + 점토 3D)
SOLID flat warm off-white background exactly #f6f4ef edge to edge (no vignette, no gradient, no floor texture). Soft matte clay 3D isometric objects, rounded edges, gentle soft shadows. Palette: muted teal (#0f766e), navy (#13213b), light gray, and orange (#c2410c) used only for highlights. Clean modern editorial style for a government presentation. ABSOLUTELY NO text, letters, numbers, signs with writing, logos, screens with UI, or human faces anywhere.

## s02-bridges.webp — 흐름의 단절
- 원본 1536×1024 → 세로 120~900px 잘라 1536×780 webp(q82)
- 프롬프트: Six pairs of small objects arranged in a clean 3-column x 2-row grid with generous even spacing; leave the area directly ABOVE each pair empty for labels. In each pair a left block and a right block are joined by a bridge that is BROKEN in the middle, the broken gap highlighted in orange with a few small falling fragments. Left blocks teal accents, right blocks navy accents. + 공통 스타일
- 선택: A안(점토 3D). 다크 톤 시안 → "더 밝은 톤", 평면 벡터 B안 → "점토 3D 화풍으로" 사용자 피드백으로 제외

## s03-systems.webp — 전체 성과 지도
- 원본 1536×1024 → 세로 280~700px 잘라 1536×420 webp(q82)
- 프롬프트: Four separate small clay objects in ONE horizontal row, evenly spaced in 4 equal columns, each on its own small round pedestal. 1) folded city map with three location pins and two tiny blank banner flags 2) balance scale with a blank document and a small blank law book 3) open blank book with a teal checkmark badge and an orange approval stamp 4) loose blank sheets flowing into one navy folder. + 공통 스타일

## s04-before-after.webp — 현수막 관리 전후
- 원본 1536×1024 → 세로 200~910px 잘라 1536×710 webp(q82)
- 프롬프트: Split composition, top 18% empty for labels. LEFT (before, grays + small orange alerts): tangled looping path, ringing desk phone, scattered blank papers, small figure walking the loop. RIGHT (after, teal/navy): tidy city map block with pins (one orange), straight arrow path to a row of banner poles with blank banners. + 공통 스타일
