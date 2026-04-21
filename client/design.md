# PetCircle Design Guide

## 1. Product Tone

PetCircle은 반려동물 보호자를 위한 동물병원 예약 및 진료기록 관리 서비스다.  
디자인은 따뜻함, 신뢰감, 친근함, 가독성을 우선한다.

핵심 키워드:

- warm
- trustworthy
- friendly
- clean
- product-like

---

## 2. Color System

### Brand

- Primary: `#F5C542`
- Primary Dark: `#D4A017`
- Primary Light: `#FEF3C7`
- Primary XLight: `#FFFBEB`

### Accent

- Accent: `#F59E0B`
- Accent Dark: `#D97706`

### Warm Neutrals

- Beige: `#FDF6E3`
- Ivory: `#FFFDF7`
- Warm 100: `#F5EED8`
- Warm 200: `#E8DFC6`
- Warm 300: `#D6CEB5`

### Text

- Text Primary: `#3A3A3A`
- Text Secondary: `#6B6B6B`
- Text Muted: `#9CA3AF`
- Text Inverse: `#FFFFFF`

### Border

- Border: `#E8E2D9`
- Border Strong: `#D0C9BC`

### Surface

- Surface 1: `#FFFFFF`
- Surface 2: `#FFFDF7`
- Surface 3: `#FDF6E3`

### Semantic

- Success: `#16A34A`
- Warning: `#F59E0B`
- Error: `#EF4444`
- Info: `#3B82F6`
- Emergency: `#EF4444`

### Footer / Dark Surface

- Footer Background: `#2C2416`
- Dark Text: `#D1C9B8`
- Dark Muted: `#8A7D6B`

---

## 3. Typography

### Font Family

- Sans: `'Noto Sans KR', system-ui, -apple-system, sans-serif`
- Mono: `'Courier New', Courier, monospace`

### Type Scale

- xs: `11px`
- sm: `13px`
- base: `15px`
- lg: `18px`
- xl: `20px`
- 2xl: `24px`
- 3xl: `28px`
- 4xl: `32px`
- 5xl: `40px`
- display: `48px`

### Font Weight

- Regular: `400`
- Medium: `500`
- Semibold: `600`
- Bold: `700`

### Usage

- Hero headline: bold, large, warm and trustworthy
- Section title: strong but not aggressive
- Body text: easy to read, relaxed line height
- Labels/captions: muted and supportive

---

## 4. Radius / Shadow / Spacing

### Radius

- sm: `8px`
- md: `12px`
- lg: `16px`
- xl: `20px`
- 2xl: `28px`
- 3xl: `36px`
- full: `9999px`

### Shadow

- xs: subtle warm shadow
- sm: soft card shadow
- md: medium card / hover shadow
- lg/xl: for featured cards or CTA emphasis
- glow: only for important CTA buttons

### Spacing

- 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80 scale 사용
- 섹션 간 여백은 넉넉하게
- 카드 내부 패딩은 답답하지 않게 유지

---

## 5. Component Rules

### Buttons

- Primary button: primary color background, dark readable text, rounded-xl 이상
- Secondary button: light surface + border
- CTA button should stand out clearly
- hover / active states should feel warm and soft, not harsh

### Cards

- white or warm light surface
- rounded-lg 이상
- soft warm shadow
- 충분한 내부 여백
- 정보 그룹이 명확해야 함

### Inputs

- background is bright and calm
- border uses warm neutral tone
- focus state should be clear but soft
- form should feel simple and friendly

### Sections

- Hero → Feature → Review → Location → CTA 흐름 유지
- 각 섹션은 배경/여백 차이로 자연스럽게 구분
- 정보 밀도가 너무 높아지지 않게 조절

---

## 6. Page-specific Direction

### Landing

- 따뜻한 첫인상
- 예약 CTA가 즉시 보여야 함
- 후기, 위치, 강점 정보로 신뢰 강화

### About

- 의료진, 진료 철학, 시설 정보를 신뢰감 있게 구성

### Services

- 진료 항목은 카드형
- 절차와 FAQ는 읽기 쉽게 구조화

### Reservation

- 폼은 단순하고 친절하게
- 완료 화면은 신뢰 문구와 방문 안내 포함

### My

- 기존 기능을 유지하되 전체 서비스와 톤을 통일
- 카드, 버튼, 제목, 여백을 공통 스타일로 정리

---

## 7. Refactor Priority

1. color tokens 통일
2. typography 통일
3. button style 통일
4. card style 통일
5. spacing / section rhythm 정리
6. my page 톤 통일

---

## 8. Implementation Rule

- 기존 라우팅과 구조는 유지
- 앱을 새로 만들지 않음
- 현재 컴포넌트를 최대한 재사용
- 디자인 시스템을 기준으로 점진적으로 리팩토링
- Landing부터 적용 후 About, Services, Reservation, My 순서로 확장
