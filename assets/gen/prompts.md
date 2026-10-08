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

## s07·s12·s14·s15·s16·s17·s18·s20 (2026-10-08, 2개 배치 병렬 생성)
- 생성: `codex exec -i ref-style.png - < prompt.txt` — s02 원본을 화풍 참고 이미지로 첨부. (주의: `-i`는 파일을 여러 개 받으므로 프롬프트는 표준입력으로 넘길 것)
- 공통 지시: Match the visual style of the attached reference image exactly + 공통 스타일. s20만 배경 #13213b(다크).
- 자르기(x, y, w, h): s07 0,220,1536,560 · s12 0,120,1536,520 · s14 0,150,1536,810 · s15 0,260,1536,480 · s16 0,30,1536,860 · s17 640,120,896,820 · s18 0,240,1536,650 · s20 0,150,1536,720

### 배치 1 프롬프트
```
Use your image generation tool to create FOUR images and save them in the current directory with the exact file names given. Do not write any code. Shared style for all: Match the visual style of the attached reference image exactly: soft matte clay 3D isometric objects, rounded edges, gentle soft shadows, palette muted teal (#0f766e), navy (#13213b), light gray, orange (#c2410c) only for highlights. SOLID flat warm off-white background exactly #f6f4ef edge to edge (no vignette, no gradient, no floor texture) unless stated otherwise. Landscape 1536x1024. ABSOLUTELY NO text, letters, numbers, writing, logos, screens with UI, or human faces anywhere (figures, if any, are faceless clay mannequins).

1) s07-funnel.png: Left third: seven small differently shaped clay pieces (tiles, cubes, cylinders, a small sign board blank, a tiny lamp) scattered chaotically in the air. Middle: a horizontal tunnel-funnel made of FOUR separate clay rings in a row, decreasing in size from left to right, evenly spaced with clear gaps between rings. Right: a single neat blank clay document card with a teal checkmark badge. The pieces flow into the large ring and come out as the single card. Keep the top 15% and bottom 20% of the image empty.

2) s12-pipeline.png: A long straight horizontal conveyor belt across the image with SIX stations evenly spaced in one row, each station on the belt, a small blank card travelling along. Station 1: a blank speech bubble. Station 2: a small robotic arm writing on the card. Station 3: a magnifying glass over an open blank book. Station 4: an hourglass on a tray. Station 5: a larger ORANGE gate arch with a big rubber stamp held above it, clearly the most prominent station. Station 6: a neat bookshelf of navy binders. Keep the bottom 25% of the image empty for labels.

3) s14-report.png: Split composition, left half and right half separated by empty space; keep the top 18% empty. LEFT (before, grays with small orange alert accents): several small desks each sending blank paper files along arrows toward ONE central desk buried under a tall messy toppling stack of papers, a faceless clay mannequin with hands on head. RIGHT (after, teal/navy): several small laptops sending thin teal lines into one tidy machine that outputs a single neat stapled blank document, a faceless mannequin calmly holding it.

4) s15-learning.png: Three separate clay objects in ONE horizontal row, evenly spaced in 3 equal columns, each on its own small round pedestal, empty space above and below. Column 1: a soft orange clay heart held in two cupped hands. Column 2: a small classical government building with a navy roof and a few stacked blank file folders beside it. Column 3: a glowing light bulb next to a small closed laptop and a tiny wrench.
```

### 배치 2 프롬프트
```
Use your image generation tool to create FOUR images and save them in the current directory with the exact file names given. Do not write any code. Shared style for all: Match the visual style of the attached reference image exactly: soft matte clay 3D isometric objects, rounded edges, gentle soft shadows, palette muted teal (#0f766e), navy (#13213b), light gray, orange (#c2410c) only for highlights. SOLID flat warm off-white background exactly #f6f4ef edge to edge (no vignette, no gradient, no floor texture) unless stated otherwise. Landscape 1536x1024. ABSOLUTELY NO text, letters, numbers, writing, logos, screens with UI, or human faces anywhere (figures, if any, are faceless clay mannequins).

1) s16-spread.png: Bird's-eye isometric view: one central clay town hall building in the middle; SEVEN small town clusters arranged in a ring around it; from the center, seven clean teal paths radiate out to each town. Plenty of empty margin.

2) s17-night.png: A calm night-duty scene placed in the RIGHT 55% of the image, left 45% completely empty: a small clay government building with one warm lit window, a clay crescent moon and two small stars above it, in front a desk phone ringing with small orange sound-wave arcs, and a headset resting beside it. Background still solid #f6f4ef.

3) s18-split.png: Two pedestals side by side, left and right, with a thin teal line connecting them; keep the top 15% empty. LEFT pedestal: a navy server rack with a teal shield bearing a checkmark and a small blank rulebook on top (the one that decides). RIGHT pedestal: a light-gray headset with two blank speech bubbles (one teal, one white) floating beside it (the one that listens and speaks).

4) s20-connected.png: Same composition as the attached reference image — six pairs of blocks in a 3-column x 2-row grid — BUT every bridge is now fully intact and connected, with a soft teal glow along each bridge, no orange, no falling fragments. Background SOLID deep navy exactly #13213b edge to edge instead of off-white; blocks in teal and lighter slate blue so they read well on navy.
```
