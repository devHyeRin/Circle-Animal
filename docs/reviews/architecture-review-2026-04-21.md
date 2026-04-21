# Architecture Review — 2026-04-21

## 컨텍스트 (자동 추론 — 대화 이력 기반)

- **서비스**: 반려동물 건강 스케줄러 — 진료 기록 입력 → 접종 일정 자동 계산 → 규칙 기반 요약 리포트 + PDF 다운로드 [확인됨]
- **코드베이스 규모**: JSX/JS 11파일, 전부 클라이언트 사이드 (서버 미구현) [추론]
- **주요 도메인**: Pet, MedicalRecord [추론]
- **주 사용자**: 강아지·고양이를 키우는 반려동물 보호자 [확인됨]
- **다음 기능**: MVP 이후 미정 (사용자가 명시적으로 MVP 범위 외 진행 보류 중) [확인됨]

> ℹ️ 이 컨텍스트는 이번 진단 한 번에만 사용됩니다.

---

## 요약

- **진단 대상**: 11 파일 (pages 3 · components 4 · hooks 1 · utils 2 · App/main 2)
- **주요 증상**: 파생 로직 중복 + 상수 중복 (동기화 버그 이력 없음)
- **권장 패턴**: **현재 구조 유지**
- **플랜 스킬 호출 필요 여부**: No — 조건 미충족 (아래 필터 참조)

---

## 상태 지도

| 값의 정체성 | 쓰기 지점 | 읽기 지점 | 중복 여부 |
|-------------|-----------|-----------|-----------|
| Pet[] 목록 | `useStorage('pets').save` ← Home | Home, PetDetail, Report | ❌ 없음 — SSOT |
| MedicalRecord[] 목록 | `useStorage('records').save` ← PetDetail | PetDetail, Report | ❌ 없음 — SSOT |
| `pets.find(petId)` 파생값 | — | PetDetail:16, Report:33 | ⚠️ 파생 로직 2곳 중복 |
| `records.filter(petId)` 파생값 | — | PetDetail:17, Report:34 | ⚠️ 파생 로직 2곳 중복 |
| `SPECIES_LABEL` 상수 | — | Home:6, PetDetail:7, reportGenerator:3 | ⚠️ 상수 3곳 중복 |

**판정**: 상태(localStorage) 자체는 단일 저장소. 동기화 어긋남 구조적으로 없음.  
중복은 "동일 파생 로직이 두 페이지에 복사"된 수준이며 현재 동기화 버그 없음.

---

## 이벤트 지도

| 이벤트 | 핸들러 위치 | 해석 일관성 |
|--------|-------------|-------------|
| 반려동물 등록 | `PetForm.handleSubmit` → `Home.handleSave` → `useStorage.save` | ✅ 단일 경로 |
| 진료 기록 추가 | `RecordForm.handleSubmit` → `PetDetail.handleSaveRecord` → `useStorage.save` | ✅ 단일 경로 |
| PDF 다운로드 | `Report.handleDownloadPdf` | ✅ 단일 경로 |
| 페이지 이동 | 각 페이지에서 `navigate()` 직접 호출 | ✅ 3곳이나 각자 다른 목적지 — 분산 아님 |

**판정**: 같은 이벤트가 여러 핸들러에서 해석되는 경우 없음. Command Pattern 불필요.

---

## 의존 방향 지도

```
Home        → useStorage('pets')     [읽기+쓰기]
Home        → PetForm                [렌더]

PetDetail   → useStorage('pets')     [읽기]
PetDetail   → useStorage('records')  [읽기+쓰기]
PetDetail   → RecordForm             [렌더]
PetDetail   → ScheduleCard           [렌더]

ScheduleCard → scheduleRules         [순수 함수]

Report      → useStorage('pets')     [읽기]
Report      → useStorage('records')  [읽기]
Report      → reportGenerator        [순수 함수]

reportGenerator → scheduleRules      [순수 함수]
```

- 순환 의존: ❌ 없음
- 내부 관통 (A → B.internal): ❌ 없음
- 의존 방향 모두 단방향, 하향

**판정**: 의존 구조 정상.

---

## 과대설계 필터 — 현재 구조 유지 선택 근거

| 필터 조건 | 판정 |
|-----------|------|
| 상태가 2곳 이하에 저장되고 동기화 버그 이력 없음 | ✅ 해당 — 상태는 localStorage 1곳 |
| 사용자/팀이 현재 구조로 기능 추가에 문제 없음 | ✅ 해당 — MVP 내 기능 추가 무난히 진행 |
| **관찰 도구(테스트)가 전무한 상태에서 대공사 금지** | ✅ **해당 — 테스트 파일 0개** |

세 번째 조건이 결정적: 테스트 없이 파생 로직 추출·상수 통합 리팩토링을 하면 회귀를 잡을 수단이 없음.  
→ **"현재 구조 유지 권장"** 결정.

---

## 대기 리스트 (이번 라운드 적용 안 함)

다음 항목은 발견했으나 현재 필터 기준으로 패턴 적용을 보류. 관찰 도구 확보 후 재평가 권장.

1. **파생 로직 중복** (`pets.find` / `records.filter` in PetDetail+Report)  
   → 커스텀 훅 `usePetWithRecords(petId)` 추출로 제거 가능. 테스트 확보 후 진행.

2. **SPECIES_LABEL 상수 3곳 중복** (Home, PetDetail, reportGenerator)  
   → `client/src/constants/species.js` 단일 파일로 추출 권장. 단순 추출이므로 테스트 없이도 가능하나 영향 파일이 3개.

3. **Report.jsx의 Card/Row 헬퍼가 같은 파일에 인라인 정의**  
   → `components/` 로 분리 고려. 현재 Report 전용이므로 급하지 않음.

---

## 다음 단계 — 플랜 작성

현재 라운드는 **구조 유지** 결정이므로 즉시 플랜 작성 불필요.

단, **대기 리스트 2번(상수 통합)** 은 테스트 없이도 낮은 위험으로 진행 가능한 유일한 항목.  
이 항목만 빠르게 해결하려면 `superpowers:writing-plans` 스킬로 단일 파일 추출 plan을 작성하세요.

더 큰 리팩토링(파생 로직 훅 추출 등)을 안전하게 진행하려면:
1. `scheduleRules`, `reportGenerator` 에 대한 유닛 테스트 먼저 확보 (순수 함수라 테스트 작성 쉬움)
2. `usePetWithRecords` 훅 추출 plan 작성
3. 이후 architecture-review 재실행
