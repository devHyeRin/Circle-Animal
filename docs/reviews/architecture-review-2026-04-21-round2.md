# Architecture Review — 2026-04-21 (Round 2: 동물병원 서비스 고도화)

## 컨텍스트 (자동 추론 + 사용자 확인)

- **서비스**: 반려동물 보호자를 위한 동물병원 예약 + 진료기록 관리 웹서비스 [확인됨]
- **코드베이스 규모**: JSX/JS 22파일, React 19 + Vite + Tailwind CSS [추론]
- **주요 도메인**: 마케팅(Landing/About/Services), 예약(Reservation), 반려동물 관리(Home/PetDetail/Report) [추론]
- **주 사용자**: 반려동물 보호자 [추론]
- **다음 기능**: 예약 내역 조회, /my와 예약 데이터 연동 [확인됨]
- **토이처럼 보이는 지점**: 예약이 실제 데이터 흐름과 미연결 (목업 느낌) [확인됨]

> ℹ️ 이 컨텍스트는 이번 진단 한 번에만 사용됩니다.

---

## 요약

- **진단 대상**: 22개 파일 (pages 8, components 10, utils 2, hooks 1, layout 3)
- **주요 증상**: 예약 submit 이벤트의 write 경로 없음 (Reservation → storage 단절)
- **권장 패턴**: Single Source of Truth — 예약 데이터 write 경로 + 공유 상수 추출
- **플랜 스킬 호출 필요**: Yes

---

## 상태 지도

| 값의 정체성 | 쓰기 지점 | 읽기 지점 | 중복/단절 여부 |
|---|---|---|---|
| pets | `Home.jsx:handleSave → useStorage('pets').save` | `Home`, `PetDetail`, `Report` | 정상 (SSOT) |
| records | `PetDetail.jsx:handleSaveRecord → useStorage('records').save` | `PetDetail`, `Report` | 정상 (SSOT) |
| **reservations** | **쓰기 없음** — `handleSubmit`이 `setSubmitted(true)`만 호출 | 읽기 없음 | **⚠️ write 경로 단절** |
| SPECIES_LABEL | `Home.jsx:6` { dog, cat } | Home | 중복 |
| SPECIES_LABEL | `PetDetail.jsx:7` { dog, cat } | PetDetail | 중복 |
| SPECIES_LABEL | `Reservation.jsx:3` { dog, cat, **other** } | Reservation | 중복 + **값 불일치 (`other` 키 추가)** |
| SPECIES_LABEL | `reportGenerator.js:3` { dog, cat } | reportGenerator | 중복 |
| 병원 대표전화 | (상수 없음, 4곳에 리터럴) | Footer, InfoSection, About, Reservation | **중복 + 포맷 불일치** |
| 병원 주소 | (상수 없음, 3곳에 리터럴) | Footer("서울특별시"), InfoSection("서울"), About("서울특별시") | **중복 + 내용 불일치** |

---

## 이벤트 지도

| 이벤트 | 핸들러 위치 | 결과 | 일관성 |
|---|---|---|---|
| 예약하기 클릭 | HeroSection, Landing CTA, Services CTA, Header | navigate('/reservation') | 일관됨 |
| 예약 폼 submit | `Reservation.jsx:handleSubmit` | `setSubmitted(true)` | ⚠️ **storage write 없음** |
| 반려동물 저장 | `Home.jsx:handleSave` | `useStorage('pets').save(pet)` | 정상 |
| 진료기록 저장 | `PetDetail.jsx:handleSaveRecord` | `useStorage('records').save(record)` | 정상 |

핵심: `handleSubmit`이 이벤트를 받았지만 데이터가 어디에도 기록되지 않는다.
pets/records와 동일한 패턴(`useStorage('reservations').save(...)`)이 있어야 할 자리가 비어 있다.

---

## 의존 방향 지도

```
App.jsx
  ├── Landing → HeroSection, FeatureSection, TestimonialSection, InfoSection
  ├── About     (독립, 데이터 없음)
  ├── Services  (독립, 데이터 없음)
  ├── Reservation → [form state만, storage 연결 없음]  ← 고립
  ├── Home      → useStorage('pets'), PetForm
  ├── PetDetail → useStorage('pets'), useStorage('records'), RecordForm, ScheduleCard
  └── Report    → useStorage('pets'), useStorage('records'), reportGenerator
```

순환 의존 없음. 전체 단방향 구조 유지.
`Reservation`이 storage layer와 단절된 고립 섬이라는 점이 유일한 구조적 문제.

---

## 선택된 패턴 및 근거

**패턴: Single Source of Truth**

증상이 두 곳에서 같은 뿌리를 가진다.

1. `reservations` 도메인 — write 경로가 없어 데이터가 React state에 갇혀 사라진다. 사용자가 원하는 다음 기능(예약 내역 조회, /my 연동)은 이 write 경로 없이 구현 불가능하다. "목업처럼 보인다"는 인상의 직접 원인.

2. `SPECIES_LABEL` / `CLINIC_INFO` 상수 — 이미 값이 갈라졌다. `SPECIES_LABEL`은 `Reservation.jsx`에만 `other` 키가 있고 나머지 3곳에는 없다. 주소는 "서울특별시"와 "서울"이 혼재한다. 이 상태에서 축종 하나를 추가하거나 전화번호를 바꾸면 4개 파일을 각각 찾아 수정해야 한다.

---

## 방향 제안

- **패턴**: Single Source of Truth
- **적용 범위**:
  - `Reservation.jsx:handleSubmit` — `useStorage('reservations').save(reservation)` write 경로 추가
  - `client/src/constants/clinic.js` (신규) — 전화번호·주소·운영시간 공유 상수. Footer·InfoSection·About·Reservation이 import
  - `client/src/constants/species.js` (신규) — `SPECIES_LABEL` 단일 파일. 4개 파일이 import
- **개괄 접근**: `reservations` key로 `useStorage` 뼈대를 먼저 연결한다. `pets`/`records`가 이미 같은 패턴으로 동작하므로 `handleSubmit`에 save 호출 한 줄을 추가하는 것으로 write 경로가 완성된다. 그 후 상수를 단일 파일로 분리하고 기존 리터럴을 import로 교체한다. 제거는 import 교체 완료 뒤 인라인 정의를 삭제하는 순서로 진행한다.
- **주의점**: `reservations` 스키마를 먼저 결정해야 한다 (petId 연결 여부, status 필드 등). `/my` 연동 시 `petId`로 조인할 수 있어야 하므로, 예약 폼에 pet 선택 필드 추가 시점과 함께 결정하는 것이 좋다.
- **Golden Master 필요**: No (상태 단순, 로직 변경 없음)

---

## 대기 리스트 (이번 라운드 적용 안 함)

| 증상 | 위치 | 우선순위 |
|---|---|---|
| PetDetail/Report "찾을 수 없습니다" 스타일 없음 | `PetDetail.jsx:20-25`, `Report.jsx:36-41` | 낮음 |
| Header "예약하기" navigate+button → Link로 통일 가능 | `Header.jsx:36-41` | 낮음 |
| menuOpen 토글 시 외부 클릭으로 닫히지 않음 | `Header.jsx` | 낮음 |
| Landing CTA 버튼 복수 배치로 전환 목표 희석 | `Landing.jsx`, `HeroSection.jsx` | 낮음 |

---

## 제품 수준 관찰 (5가지 개선 우선순위)

| # | 영역 | 현상 | 실무 기준 갭 |
|---|---|---|---|
| 1 | **예약 데이터 흐름** | submit 후 localStorage 미저장 | 핵심 기능 미완성. SSOT 방향 제안이 해결 |
| 2 | **CLINIC_INFO 분산** | 전화번호·주소 4곳에 리터럴, 이미 불일치 | 정보 변경 시 누락 필수 발생 |
| 3 | **에러 화면 스타일 없음** | PetDetail/Report not-found가 bare div | 실서비스에서 도달 가능한 화면이 미완성 |
| 4 | **예약 폼 validation 피드백 없음** | HTML required만 있고 커스텀 에러 없음 | 브라우저 기본 팝업 — 프로덕션 feel 저하 |
| 5 | **예약↔반려동물 미연결** | 예약 폼에 pet 선택 없음, /my 연동 없음 | 두 기능이 같은 서비스인지 모르는 UX |

---

## 다음 단계 — 플랜 작성

이 방향 제안을 실행 가능한 plan으로 변환하려면 `superpowers:writing-plans` 스킬을 호출하세요.
본 문서를 입력으로 전달하면 플랜 스킬이 라운드별 plan, 단계별 task, 커밋 계획까지 작성합니다.

우선순위 권장 순서:
1. `reservations` write 경로 + 스키마 결정 (예약 내역 조회의 선결 조건)
2. `CLINIC_INFO` 공유 상수 추출 (이미 불일치 발생 중)
3. `SPECIES_LABEL` 공유 상수 추출 (Reservation에서 이미 diverge)
