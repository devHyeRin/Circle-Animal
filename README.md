# 🐾 반려동물 건강 스케줄러 (Pet Health Scheduler)

> 진료 기록을 입력하면 AI가 다음 접종 일정을 계산하고, 수의사 상담용 요약 리포트를 자동 생성해주는 반응형 웹 서비스

---

## 📌 프로젝트 소개

반려동물 보호자가 겪는 두 가지 문제를 해결합니다.

- **"다음 접종이 언제였더라?"** → 접종 기록 입력 시 다음 권장일 자동 계산
- **"수의사 선생님께 설명하기 막막해요"** → 누적 진료 기록을 AI가 요약해 상담용 리포트 생성

로그인 없이 바로 사용할 수 있으며, 데이터는 기기에만 저장됩니다 (localStorage).

---

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 🐶🐱 반려동물 프로필 | 강아지·고양이 등록, 종류·생년월일·중성화 여부 관리 |
| 📝 진료 기록 입력 | 날짜·항목 필수 / 병원·비용·재방문일·메모 선택 |
| 📅 접종 일정 자동 계산 | 표준 접종 주기 기반 다음 권장일 계산 (규칙 기반) |
| 🗓️ 재방문 일정 표시 | 수의사가 지정한 날짜를 직접 입력해 관리 |
| 📋 AI 요약 리포트 | Claude API로 수의사 상담용 리포트 자동 생성 |
| ⬇️ PDF 다운로드 | 리포트를 PDF로 저장해 상담 시 제출 |
| 📱 반응형 UI | 모바일 브라우저에서도 편하게 사용 |

---

## 🛠 기술 스택

### Client
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white)

| 라이브러리 | 용도 |
|-----------|------|
| React 18 + Vite 5 | UI 프레임워크 및 빌드 도구 |
| Tailwind CSS 3 | 반응형 스타일링 |
| React Router 6 | 클라이언트 사이드 라우팅 |
| jsPDF + html2canvas | PDF 다운로드 |
| Vitest + @testing-library/react | 단위 테스트 |

### Server
![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)

| 라이브러리 | 용도 |
|-----------|------|
| Express 4 | API 서버 |
| @anthropic-ai/sdk | Claude API 연동 |
| dotenv | 환경변수 관리 |

---

## 🗂 프로젝트 구조

```
pet-health-scheduler/
├── client/                        # React + Vite 클라이언트
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx           # 반려동물 목록
│   │   │   ├── PetDetail.jsx      # 진료 기록 & 일정 뷰
│   │   │   └── Report.jsx         # AI 리포트 페이지
│   │   ├── components/
│   │   │   ├── PetForm.jsx        # 반려동물 등록 폼
│   │   │   ├── RecordForm.jsx     # 진료 기록 입력 폼
│   │   │   ├── ScheduleCard.jsx   # 다음 일정 카드
│   │   │   └── ReportViewer.jsx   # 리포트 표시 + PDF 버튼
│   │   ├── hooks/
│   │   │   └── useStorage.js      # localStorage CRUD hook
│   │   ├── utils/
│   │   │   └── scheduleRules.js   # 접종 주기 계산 (규칙 기반)
│   │   └── App.jsx                # 라우터 셸
│   └── vite.config.js
│
├── server/                        # Node.js + Express API 서버
│   ├── routes/
│   │   ├── health.js              # GET  /api/health
│   │   └── summary.js             # POST /api/summary (Claude API)
│   └── index.js
│
├── docs/
│   └── superpowers/
│       ├── specs/                 # 제품 기획서 (PRD)
│       └── plans/                 # 구현 계획서
│
├── .env.example                   # 환경변수 예시
└── README.md
```

---

## ⚙️ 아키텍처

```
[Browser]
  │
  ├── localStorage  ←── 모든 데이터 저장 (pets, records, report cache)
  ├── scheduleRules.js  ←── 접종 주기 계산 (클라이언트, 순수 함수)
  │
  └── POST /api/summary
          │
     [Express Server]
          │
          └── Claude API  ←── 요약 리포트 생성
                               (API 키는 서버에서만 관리)
```

**설계 원칙:**
- 서버는 Claude API 키 보호 목적으로만 존재 — 나머지 로직은 모두 클라이언트
- LLM 호출은 사용자의 **명시적 버튼 클릭**에서만 발생 (자동/백그라운드 호출 없음)
- 동일 기록에 대한 리포트는 localStorage에 캐싱 → 불필요한 API 호출 방지
- `useStorage` 훅과 `scheduleRules` 유틸은 이후 DB·로그인 추가 시 교체 포인트로 설계

---

## 🚀 로컬 실행 방법

### 사전 준비
- Node.js 20+
- Anthropic API 키 ([발급받기](https://console.anthropic.com/))

### 1. 저장소 클론

```bash
git clone https://github.com/your-username/pet-health-scheduler.git
cd pet-health-scheduler
```

### 2. 서버 설정

```bash
cd server
npm install

# .env 파일 생성
echo "ANTHROPIC_API_KEY=your_key_here\nPORT=3001" > .env

npm run dev
# → http://localhost:3001
```

### 3. 클라이언트 설정

```bash
cd client
npm install
npm run dev
# → http://localhost:5173
```

### 4. 테스트 실행

```bash
cd client
npm run test:run
```

---

## 📋 접종 스케줄 규칙 (MVP 기준)

| 동물 | 항목 | 권장 주기 |
|------|------|----------|
| 강아지 | 종합백신 (DHPPL) | 1년 |
| 강아지 | 코로나 | 1년 |
| 강아지 | 켄넬코프 | 6개월 |
| 강아지 | 광견병 | 1년 |
| 강아지 | 심장사상충 예방약 | 1개월 |
| 강아지 | 외부기생충 예방약 | 1개월 |
| 고양이 | 종합백신 (FVRCP) | 1년 |
| 고양이 | 광견병 | 1년 |
| 고양이 | 심장사상충 예방약 | 1개월 |

---

## 🗺 향후 계획 (MVP 이후)

- [ ] 로그인 / 계정 기능 (다기기 동기화)
- [ ] 서버 DB 연동 (데이터 영속성)
- [ ] 접종 알림 (이메일 / 푸시)
- [ ] 강아지·고양이 외 동물 지원
- [ ] 다중 보호자 / 공유 기능

---

## 📁 기획 문서

| 문서 | 경로 |
|------|------|
| 제품 기획서 (PRD) | [`docs/superpowers/specs/2026-04-14-pet-health-scheduler-design.md`](docs/superpowers/specs/2026-04-14-pet-health-scheduler-design.md) |
| 구현 계획서 | [`docs/superpowers/plans/2026-04-14-pet-health-scheduler-mvp.md`](docs/superpowers/plans/2026-04-14-pet-health-scheduler-mvp.md) |

---

## 👤 만든 사람

**Hyerin** · [GitHub](https://github.com/your-username)

---

> 이 프로젝트는 디자인씽킹 기반 기획 → 개발 스펙 → 구현 순서로 진행된 포트폴리오 프로젝트입니다.
