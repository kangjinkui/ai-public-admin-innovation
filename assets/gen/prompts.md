# 생성 이미지 프롬프트 기록

생성 도구: Codex CLI 0.153.4 이미지 생성 기능(GPT 이미지). 모든 이미지는 글자·숫자·로고 없이 생성하고, 라벨과 수치는 HTML로 얹는다.

## 공통 스타일 (2026-10-08 확정: 밝은 톤)
SOLID flat warm off-white background exactly #f6f4ef edge to edge (no vignette, no gradient, no floor texture). Flat vector isometric illustration with thin navy outlines. Muted teal (#0f766e), navy (#13213b) and orange (#c2410c) accents; orange marks the problem point. Soft shadows, clean modern editorial style suited to a government presentation on a light page. ABSOLUTELY NO text, letters, numbers, signs, logos or UI anywhere.

## s02-bridges.webp — 흐름의 단절
- 원본 1536×1024 → 세로 90~890px 잘라 1536×800 webp(q82)
- 프롬프트: Six pairs of small objects arranged in a clean 3-column x 2-row grid with generous even spacing; leave the area directly ABOVE each pair empty for labels. In each pair a left block and a right block are joined by a bridge that is BROKEN in the middle, the broken gap highlighted in orange with a few small falling fragments. Left blocks teal accents, right blocks navy accents. + 공통 스타일
- 선택: B안(평면 벡터·윤곽선). 비교안 A(점토 질감 3D), 다크 톤 1안은 사용자 피드백("더 밝은 톤")으로 제외
