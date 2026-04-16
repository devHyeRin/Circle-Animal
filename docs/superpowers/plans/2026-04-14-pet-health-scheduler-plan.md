# 반려동물 건강 스케줄러 MVP — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 반려동물 진료 기록 입력 → 접종 일정 자동 계산 → LLM 요약 리포트 생성 및 PDF 다운로드가 가능한 반응형 웹 MVP를 구축한다.

**Architecture:** React (Vite) 클라이언트가 모든 데이터를 localStorage에서 관리하고 접종 스케줄을 계산한다. Node.js/Express 서버는 Claude API 키를 보호하며 `/api/summary` 단일 엔드포인트만 제공한다. Vite proxy로 개발 중 CORS 없이 두 서버를 연결한다.

**Tech Stack:** React 19, Vite 8, Tailwind CSS 3, React Router 7, Vitest, @testing-library/react, @testing-library/user-event, @testing-library/jest-dom, Node.js 20, Express 5, @anthropic-ai/sdk, jsPDF, html2canvas

---

## 파일 구조 전체 맵

```
pet-health-scheduler/
├── client/
│   ├── src/
│   │   ├── test/
│   │   │   └── setup.js                  # Vitest global setup
│   │   ├── hooks/
│   │   │   ├── useStorage.js             # localStorage CRUD (React hook)
│   │   │   └── __tests__/
│   │   │       └── useStorage.test.js
│   │   ├── utils/
│   │   │   ├── scheduleRules.js          # 접종 주기 규칙 + 계산 함수
│   │   │   └── __tests__/
│   │   │       └── scheduleRules.test.js
│   │   ├── components/
│   │   │   ├── PetForm.jsx               # 반려동물 등록 폼
│   │   │   ├── RecordForm.jsx            # 진료 기록 입력 폼
│   │   │   ├── ScheduleCard.jsx          # 다음 일정 카드
│   │   │   └── ReportViewer.jsx          # 리포트 표시 + PDF 버튼
│   │   ├── pages/
│   │   │   ├── Home.jsx                  # 반려동물 목록
│   │   │   ├── PetDetail.jsx             # 기록 & 일정 뷰
│   │   │   └── Report.jsx                # 리포트 페이지
│   │   ├── App.jsx                       # 라우터 셸
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── vite.config.js
│
├── server/
│   ├── routes/
│   │   ├── health.js                     # GET /api/health
│   │   └── summary.js                    # POST /api/summary (Claude API)
│   ├── index.js
│   ├── package.json
│   └── .env                              # ANTHROPIC_API_KEY (git 제외)
│
├── .env.example
└── README.md
```

---

## Task 1: 프로젝트 스캐폴딩

**Files:**
- Create: `client/` (Vite scaffold)
- Create: `client/vite.config.js`
- Create: `client/src/test/setup.js`
- Create: `client/src/index.css`
- Create: `server/package.json`
- Create: `server/index.js`
- Create: `.env.example`

- [ ] **Step 1: 클라이언트 초기화**

```bash
npm create vite@latest client -- --template react
cd client
npm install
```

- [ ] **Step 2: 클라이언트 의존성 설치**

```bash
npm install react-router-dom jspdf html2canvas
npm install -D tailwindcss postcss autoprefixer \
  vitest jsdom \
  @vitejs/plugin-react \
  @testing-library/react \
  @testing-library/user-event \
  @testing-library/jest-dom
npx tailwindcss init -p
```

- [ ] **Step 3: vite.config.js 작성**

`client/vite.config.js` 전체를 아래로 교체:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    globals: true,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
```

- [ ] **Step 4: Tailwind 설정**

`client/tailwind.config.js` 전체를 아래로 교체:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {} },
  plugins: [],
}
```

`client/src/index.css` 전체를 아래로 교체:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 5: Vitest setup 파일 생성**

`client/src/test/setup.js`:

```js
import '@testing-library/jest-dom'
```

- [ ] **Step 6: client/package.json scripts 수정**

`client/package.json`의 `"scripts"` 섹션을 아래로 교체:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest",
  "test:run": "vitest run"
}
```

- [ ] **Step 7: 서버 초기화**

```bash
cd ../
mkdir server && cd server
npm init -y
```

`server/package.json`에 `"type": "module"` 추가 (scripts 바로 위에):

```json
{
  "name": "server",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js"
  }
}
```

- [ ] **Step 8: 서버 의존성 설치**

```bash
npm install express cors dotenv @anthropic-ai/sdk
```

- [ ] **Step 9: .env.example 생성**

프로젝트 루트에 `.env.example`:

```
ANTHROPIC_API_KEY=your_api_key_here
PORT=3001
```

`server/` 디렉토리에 `.env` 파일 생성 (실제 키 입력):

```
ANTHROPIC_API_KEY=실제_키_입력
PORT=3001
```

- [ ] **Step 10: 클라이언트 테스트 실행 확인**

```bash
cd client
npm run test:run
```

Expected: `No test files found` 또는 `0 tests passed` (에러 없이 종료)

- [ ] **Step 11: 커밋**

```bash
cd ..
git init
echo "node_modules\n.env\ndist" > .gitignore
git add .
git commit -m "chore: project scaffolding - React Vite client + Express server"
```

---

## Task 2: useStorage 훅

**Files:**
- Create: `client/src/hooks/__tests__/useStorage.test.js`
- Create: `client/src/hooks/useStorage.js`

- [ ] **Step 1: 실패 테스트 작성**

`client/src/hooks/__tests__/useStorage.test.js`:

```js
import { renderHook, act } from '@testing-library/react'
import { useStorage } from '../useStorage'

beforeEach(() => {
  localStorage.clear()
})

test('초기 상태는 빈 배열', () => {
  const { result } = renderHook(() => useStorage('pets'))
  expect(result.current.items).toEqual([])
})

test('save: 새 아이템 추가', () => {
  const { result } = renderHook(() => useStorage('pets'))
  act(() => {
    result.current.save({ id: '1', name: '초코' })
  })
  expect(result.current.items).toHaveLength(1)
  expect(result.current.items[0].name).toBe('초코')
})

test('save: 기존 아이템 업데이트 (id 기준)', () => {
  const { result } = renderHook(() => useStorage('pets'))
  act(() => {
    result.current.save({ id: '1', name: '초코' })
  })
  act(() => {
    result.current.save({ id: '1', name: '초코(수정)' })
  })
  expect(result.current.items).toHaveLength(1)
  expect(result.current.items[0].name).toBe('초코(수정)')
})

test('remove: id로 아이템 삭제', () => {
  const { result } = renderHook(() => useStorage('pets'))
  act(() => {
    result.current.save({ id: '1', name: '초코' })
    result.current.save({ id: '2', name: '나비' })
  })
  act(() => {
    result.current.remove('1')
  })
  expect(result.current.items).toHaveLength(1)
  expect(result.current.items[0].id).toBe('2')
})

test('localStorage에 실제로 저장됨', () => {
  const { result } = renderHook(() => useStorage('pets'))
  act(() => {
    result.current.save({ id: '1', name: '초코' })
  })
  const stored = JSON.parse(localStorage.getItem('pets'))
  expect(stored[0].name).toBe('초코')
})

test('다른 key는 독립적으로 동작', () => {
  const { result: pets } = renderHook(() => useStorage('pets'))
  const { result: records } = renderHook(() => useStorage('records'))
  act(() => {
    pets.current.save({ id: '1', name: '초코' })
  })
  expect(records.current.items).toHaveLength(0)
})
```

- [ ] **Step 2: 테스트 실행 — 실패 확인**

```bash
cd client && npm run test:run -- hooks/__tests__/useStorage.test.js
```

Expected: FAIL — `Cannot find module '../useStorage'`

- [ ] **Step 3: useStorage 구현**

`client/src/hooks/useStorage.js`:

```js
import { useState, useCallback } from 'react'

export function useStorage(key) {
  const [items, setItems] = useState(() => {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  })

  const save = useCallback((item) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === item.id)
      const next =
        idx >= 0
          ? prev.map((i, j) => (j === idx ? item : i))
          : [...prev, item]
      localStorage.setItem(key, JSON.stringify(next))
      return next
    })
  }, [key])

  const remove = useCallback((id) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id)
      localStorage.setItem(key, JSON.stringify(next))
      return next
    })
  }, [key])

  return { items, save, remove }
}
```

- [ ] **Step 4: 테스트 실행 — 통과 확인**

```bash
npm run test:run -- hooks/__tests__/useStorage.test.js
```

Expected: 6 tests passed

- [ ] **Step 5: 커밋**

```bash
git add client/src/hooks/
git commit -m "feat: useStorage hook - localStorage CRUD with React state"
```

---

## Task 3: scheduleRules 유틸리티

**Files:**
- Create: `client/src/utils/__tests__/scheduleRules.test.js`
- Create: `client/src/utils/scheduleRules.js`

- [ ] **Step 1: 실패 테스트 작성**

`client/src/utils/__tests__/scheduleRules.test.js`:

```js
import { getNextVaccinationDate, getSchedules } from '../scheduleRules'

describe('getNextVaccinationDate', () => {
  test('강아지 종합백신: 1년 후 날짜 반환', () => {
    const result = getNextVaccinationDate('dog', '종합백신 5차', '2025-01-15')
    expect(result).toBe('2026-01-15')
  })

  test('강아지 심장사상충: 30일 후 날짜 반환', () => {
    const result = getNextVaccinationDate('dog', '심장사상충 예방약', '2025-01-01')
    expect(result).toBe('2025-01-31')
  })

  test('강아지 켄넬코프: 180일 후 날짜 반환', () => {
    const result = getNextVaccinationDate('dog', '켄넬코프', '2025-01-01')
    expect(result).toBe('2025-06-30')
  })

  test('고양이 FVRCP 종합백신: 1년 후 날짜 반환', () => {
    const result = getNextVaccinationDate('cat', 'FVRCP 종합백신', '2025-03-10')
    expect(result).toBe('2026-03-10')
  })

  test('규칙에 없는 항목: null 반환', () => {
    const result = getNextVaccinationDate('dog', '스케일링', '2025-01-01')
    expect(result).toBeNull()
  })

  test('알 수 없는 species: null 반환', () => {
    const result = getNextVaccinationDate('rabbit', '종합백신', '2025-01-01')
    expect(result).toBeNull()
  })
})

describe('getSchedules', () => {
  test('여러 기록 중 가장 최근 날짜 기준으로 계산', () => {
    const records = [
      { date: '2024-06-01', items: ['종합백신'] },
      { date: '2025-01-01', items: ['종합백신'] },
    ]
    const schedules = getSchedules('dog', records)
    const vaccine = schedules.find((s) => s.item === '종합백신')
    expect(vaccine.lastDate).toBe('2025-01-01')
    expect(vaccine.nextDate).toBe('2026-01-01')
  })

  test('규칙 없는 항목은 결과에서 제외', () => {
    const records = [{ date: '2025-01-01', items: ['스케일링', '종합백신'] }]
    const schedules = getSchedules('dog', records)
    const items = schedules.map((s) => s.item)
    expect(items).not.toContain('스케일링')
    expect(items).toContain('종합백신')
  })

  test('빈 기록이면 빈 배열 반환', () => {
    expect(getSchedules('dog', [])).toEqual([])
  })

  test('결과는 nextDate 오름차순 정렬', () => {
    const records = [
      { date: '2025-01-01', items: ['심장사상충 예방약', '종합백신'] },
    ]
    const schedules = getSchedules('dog', records)
    const dates = schedules.map((s) => s.nextDate)
    expect(dates).toEqual([...dates].sort())
  })
})
```

- [ ] **Step 2: 테스트 실행 — 실패 확인**

```bash
npm run test:run -- utils/__tests__/scheduleRules.test.js
```

Expected: FAIL — `Cannot find module '../scheduleRules'`

- [ ] **Step 3: scheduleRules 구현**

`client/src/utils/scheduleRules.js`:

```js
// 규칙 추가 시 여기에 species 키와 항목명 키워드를 추가
const RULES = {
  dog: {
    종합백신: 365,
    DHPPL: 365,
    코로나: 365,
    켄넬코프: 180,
    광견병: 365,
    심장사상충: 30,
    외부기생충: 30,
  },
  cat: {
    종합백신: 365,
    FVRCP: 365,
    광견병: 365,
    심장사상충: 30,
  },
}

function addDays(dateStr, days) {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

function findRule(species, itemName) {
  const speciesRules = RULES[species]
  if (!speciesRules) return null
  const key = Object.keys(speciesRules).find(
    (k) => itemName.includes(k) || k.includes(itemName)
  )
  return key ? speciesRules[key] : null
}

/**
 * @param {'dog'|'cat'} species
 * @param {string} itemName  진료/접종 항목명
 * @param {string} lastDate  마지막 접종일 (YYYY-MM-DD)
 * @returns {string|null}    다음 권장일 (YYYY-MM-DD) or null
 */
export function getNextVaccinationDate(species, itemName, lastDate) {
  const intervalDays = findRule(species, itemName)
  if (intervalDays === null) return null
  return addDays(lastDate, intervalDays)
}

/**
 * 기록 배열에서 항목별 최신 날짜를 찾아 다음 접종 스케줄 목록 반환
 * @param {'dog'|'cat'} species
 * @param {{ date: string, items: string[] }[]} records
 * @returns {{ item: string, lastDate: string, nextDate: string }[]}
 */
export function getSchedules(species, records) {
  const latestByItem = {}
  records.forEach((record) => {
    record.items.forEach((item) => {
      if (!latestByItem[item] || record.date > latestByItem[item]) {
        latestByItem[item] = record.date
      }
    })
  })

  return Object.entries(latestByItem)
    .map(([item, lastDate]) => ({
      item,
      lastDate,
      nextDate: getNextVaccinationDate(species, item, lastDate),
    }))
    .filter((s) => s.nextDate !== null)
    .sort((a, b) => a.nextDate.localeCompare(b.nextDate))
}
```

- [ ] **Step 4: 테스트 실행 — 통과 확인**

```bash
npm run test:run -- utils/__tests__/scheduleRules.test.js
```

Expected: 10 tests passed

- [ ] **Step 5: 커밋**

```bash
git add client/src/utils/
git commit -m "feat: scheduleRules - vaccination interval calculation for dog/cat"
```

---

## Task 4: App 셸 + 라우팅 + 페이지 스텁

**Files:**
- Modify: `client/src/main.jsx`
- Create: `client/src/App.jsx`
- Create: `client/src/pages/Home.jsx`
- Create: `client/src/pages/PetDetail.jsx`
- Create: `client/src/pages/Report.jsx`

- [ ] **Step 1: main.jsx 수정**

`client/src/main.jsx` 전체:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
```

- [ ] **Step 2: App.jsx 작성**

`client/src/App.jsx`:

```jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import PetDetail from './pages/PetDetail'
import Report from './pages/Report'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pets/:petId" element={<PetDetail />} />
        <Route path="/pets/:petId/report" element={<Report />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
```

- [ ] **Step 3: 페이지 스텁 작성**

`client/src/pages/Home.jsx`:

```jsx
export default function Home() {
  return <main className="p-4"><h1 className="text-2xl font-bold">반려동물 목록</h1></main>
}
```

`client/src/pages/PetDetail.jsx`:

```jsx
export default function PetDetail() {
  return <main className="p-4"><h1 className="text-2xl font-bold">진료 기록</h1></main>
}
```

`client/src/pages/Report.jsx`:

```jsx
export default function Report() {
  return <main className="p-4"><h1 className="text-2xl font-bold">건강 리포트</h1></main>
}
```

- [ ] **Step 4: 개발 서버 실행 확인**

```bash
cd client && npm run dev
```

Expected: `http://localhost:5173` 에서 "반려동물 목록" 텍스트 표시

- [ ] **Step 5: 커밋**

```bash
git add client/src/
git commit -m "feat: app shell - React Router with Home/PetDetail/Report routes"
```

---

## Task 5: 반려동물 등록 폼 + Home 페이지

**Files:**
- Create: `client/src/components/PetForm.jsx`
- Modify: `client/src/pages/Home.jsx`

- [ ] **Step 1: PetForm 컴포넌트 작성**

`client/src/components/PetForm.jsx`:

```jsx
import { useState } from 'react'

const SPECIES_LABELS = { dog: '강아지', cat: '고양이' }

export default function PetForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    species: 'dog',
    breed: '',
    birthDate: '',
    gender: 'male',
    neutered: false,
  })

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.birthDate) return
    onSubmit({
      ...form,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">이름 *</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="예: 초코"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">종류 *</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          value={form.species}
          onChange={(e) => set('species', e.target.value)}
        >
          {Object.entries(SPECIES_LABELS).map(([val, label]) => (
            <option key={val} value={val}>{label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">품종 (선택)</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          value={form.breed}
          onChange={(e) => set('breed', e.target.value)}
          placeholder="예: 말티즈"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">생년월일 *</label>
        <input
          type="date"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          value={form.birthDate}
          onChange={(e) => set('birthDate', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">성별</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          value={form.gender}
          onChange={(e) => set('gender', e.target.value)}
        >
          <option value="male">수컷</option>
          <option value="female">암컷</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="neutered"
          type="checkbox"
          checked={form.neutered}
          onChange={(e) => set('neutered', e.target.checked)}
        />
        <label htmlFor="neutered" className="text-sm text-gray-700">중성화 완료</label>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          등록
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
        >
          취소
        </button>
      </div>
    </form>
  )
}
```

- [ ] **Step 2: Home 페이지 구현**

`client/src/pages/Home.jsx`:

```jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStorage } from '../hooks/useStorage'
import PetForm from '../components/PetForm'

const SPECIES_LABELS = { dog: '🐶 강아지', cat: '🐱 고양이' }

function calcAge(birthDate) {
  const birth = new Date(birthDate)
  const now = new Date()
  const years = now.getFullYear() - birth.getFullYear()
  const months = now.getMonth() - birth.getMonth()
  if (months < 0 || (months === 0 && now.getDate() < birth.getDate())) {
    return `${years - 1}세`
  }
  return `${years}세`
}

export default function Home() {
  const { items: pets, save, remove } = useStorage('pets')
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()

  function handleAdd(pet) {
    save(pet)
    setShowForm(false)
  }

  function handleDelete(e, id) {
    e.stopPropagation()
    if (window.confirm('정말 삭제하시겠어요?')) remove(id)
  }

  return (
    <main className="max-w-lg mx-auto p-4">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">🐾 내 반려동물</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
        >
          + 추가
        </button>
      </header>

      {showForm && (
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <h2 className="text-lg font-semibold mb-3">반려동물 등록</h2>
          <PetForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {pets.length === 0 && !showForm && (
        <p className="text-gray-500 text-center py-12">
          아직 등록된 반려동물이 없어요.<br />+ 추가 버튼을 눌러 시작하세요.
        </p>
      )}

      <ul className="space-y-3">
        {pets.map((pet) => (
          <li
            key={pet.id}
            onClick={() => navigate(`/pets/${pet.id}`)}
            className="bg-white rounded-xl shadow p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
          >
            <div>
              <p className="font-semibold text-gray-900">{pet.name}</p>
              <p className="text-sm text-gray-500">
                {SPECIES_LABELS[pet.species]} {pet.breed && `· ${pet.breed}`} · {calcAge(pet.birthDate)}
              </p>
            </div>
            <button
              onClick={(e) => handleDelete(e, pet.id)}
              className="text-red-400 hover:text-red-600 text-sm px-2"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
```

- [ ] **Step 3: 동작 확인**

```bash
npm run dev
```

브라우저에서 확인:
1. "+" 버튼 클릭 시 등록 폼 표시
2. 이름·생년월일 필수 입력 후 "등록" → 목록에 카드 추가
3. 카드 클릭 시 `/pets/:id` 이동
4. "삭제" 클릭 시 confirm 후 목록에서 제거

- [ ] **Step 4: 커밋**

```bash
git add client/src/components/PetForm.jsx client/src/pages/Home.jsx
git commit -m "feat: pet profile management - add/list/delete on Home page"
```

---

## Task 6: 진료 기록 입력 폼 (RecordForm)

**Files:**
- Create: `client/src/components/RecordForm.jsx`

- [ ] **Step 1: RecordForm 컴포넌트 작성**

`client/src/components/RecordForm.jsx`:

```jsx
import { useState } from 'react'

const COMMON_ITEMS = {
  dog: ['종합백신', '켄넬코프', '코로나', '광견병', '심장사상충 예방약', '외부기생충 예방약'],
  cat: ['종합백신(FVRCP)', '광견병', '심장사상충 예방약'],
}

export default function RecordForm({ petId, species, onSubmit, onCancel }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [items, setItems] = useState([])
  const [itemInput, setItemInput] = useState('')
  const [hospital, setHospital] = useState('')
  const [cost, setCost] = useState('')
  const [nextVisitDate, setNextVisitDate] = useState('')
  const [memo, setMemo] = useState('')

  function addItem(name) {
    const trimmed = name.trim()
    if (trimmed && !items.includes(trimmed)) {
      setItems([...items, trimmed])
    }
    setItemInput('')
  }

  function removeItem(item) {
    setItems(items.filter((i) => i !== item))
  }

  function handleItemKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      addItem(itemInput)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!date || items.length === 0) return
    onSubmit({
      id: crypto.randomUUID(),
      petId,
      date,
      items,
      hospital: hospital || null,
      cost: cost ? Number(cost) : null,
      nextVisitDate: nextVisitDate || null,
      memo: memo || null,
      createdAt: new Date().toISOString(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 날짜 — 필수 */}
      <div>
        <label className="block text-sm font-medium text-gray-700">날짜 *</label>
        <input
          type="date"
          className="mt-1 block w-full rounded-md border p-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      {/* 진료/접종 항목 — 필수 */}
      <div>
        <label className="block text-sm font-medium text-gray-700">진료/접종 항목 *</label>
        <div className="flex flex-wrap gap-1 mt-1 mb-1">
          {items.map((item) => (
            <span
              key={item}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1"
            >
              {item}
              <button type="button" onClick={() => removeItem(item)} className="font-bold">×</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-md border p-2 text-sm"
            value={itemInput}
            onChange={(e) => setItemInput(e.target.value)}
            onKeyDown={handleItemKeyDown}
            placeholder="항목 입력 후 Enter 또는 추가"
          />
          <button
            type="button"
            onClick={() => addItem(itemInput)}
            className="px-3 py-2 bg-gray-200 rounded-md text-sm"
          >
            추가
          </button>
        </div>
        {/* 자주 쓰는 항목 빠른 선택 */}
        <div className="flex flex-wrap gap-1 mt-2">
          {(COMMON_ITEMS[species] || []).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => addItem(item)}
              className="text-xs px-2 py-1 border border-gray-300 rounded-full hover:bg-gray-100"
            >
              + {item}
            </button>
          ))}
        </div>
      </div>

      {/* 병원명 — 선택 */}
      <div>
        <label className="block text-sm font-medium text-gray-700">병원명 (선택)</label>
        <input
          className="mt-1 block w-full rounded-md border p-2"
          value={hospital}
          onChange={(e) => setHospital(e.target.value)}
          placeholder="예: 행복동물병원"
        />
      </div>

      {/* 비용 — 선택 */}
      <div>
        <label className="block text-sm font-medium text-gray-700">비용 (선택)</label>
        <input
          type="number"
          className="mt-1 block w-full rounded-md border p-2"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          placeholder="예: 45000"
          min="0"
        />
      </div>

      {/* 재방문일 — 선택, 저장·표시만 */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          재방문 예정일 (선택)
          <span className="text-xs text-gray-400 ml-1">— 수의사 지정 날짜를 직접 입력</span>
        </label>
        <input
          type="date"
          className="mt-1 block w-full rounded-md border p-2"
          value={nextVisitDate}
          onChange={(e) => setNextVisitDate(e.target.value)}
        />
      </div>

      {/* 메모 — 선택 */}
      <div>
        <label className="block text-sm font-medium text-gray-700">메모 (선택)</label>
        <textarea
          className="mt-1 block w-full rounded-md border p-2 text-sm"
          rows={3}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="특이사항, 수의사 코멘트 등"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          기록 저장
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
        >
          취소
        </button>
      </div>
    </form>
  )
}
```

- [ ] **Step 2: 커밋**

```bash
git add client/src/components/RecordForm.jsx
git commit -m "feat: RecordForm - structured fields + free text memo for medical records"
```

---

## Task 7: ScheduleCard 컴포넌트 + PetDetail 페이지

**Files:**
- Create: `client/src/components/ScheduleCard.jsx`
- Modify: `client/src/pages/PetDetail.jsx`

- [ ] **Step 1: ScheduleCard 컴포넌트 작성**

`client/src/components/ScheduleCard.jsx`:

```jsx
function daysUntil(dateStr) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(dateStr)
  return Math.round((target - today) / (1000 * 60 * 60 * 24))
}

function urgencyClass(days) {
  if (days < 0) return 'border-red-400 bg-red-50'
  if (days <= 14) return 'border-orange-400 bg-orange-50'
  if (days <= 30) return 'border-yellow-400 bg-yellow-50'
  return 'border-green-400 bg-green-50'
}

function urgencyLabel(days) {
  if (days < 0) return `${Math.abs(days)}일 경과`
  if (days === 0) return '오늘'
  return `${days}일 후`
}

export default function ScheduleCard({ item, lastDate, nextDate, type = 'vaccination' }) {
  const days = daysUntil(nextDate)
  const label = type === 'visit' ? '재방문 예정' : '다음 접종 권장일'

  return (
    <div className={`rounded-lg border-l-4 p-3 ${urgencyClass(days)}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-900 text-sm">{item}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            {label} · {nextDate}
          </p>
          {lastDate && (
            <p className="text-xs text-gray-400">마지막: {lastDate}</p>
          )}
        </div>
        <span className="text-sm font-semibold text-gray-700 shrink-0 ml-2">
          {urgencyLabel(days)}
        </span>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: PetDetail 페이지 구현**

`client/src/pages/PetDetail.jsx`:

```jsx
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useStorage } from '../hooks/useStorage'
import { getSchedules } from '../utils/scheduleRules'
import RecordForm from '../components/RecordForm'
import ScheduleCard from '../components/ScheduleCard'

const SPECIES_LABELS = { dog: '강아지', cat: '고양이' }

export default function PetDetail() {
  const { petId } = useParams()
  const navigate = useNavigate()
  const { items: pets } = useStorage('pets')
  const { items: allRecords, save: saveRecord, remove: removeRecord } = useStorage('records')
  const [showForm, setShowForm] = useState(false)

  const pet = pets.find((p) => p.id === petId)
  const records = allRecords
    .filter((r) => r.petId === petId)
    .sort((a, b) => b.date.localeCompare(a.date))

  if (!pet) {
    return (
      <main className="p-4 text-center">
        <p className="text-gray-500">반려동물 정보를 찾을 수 없어요.</p>
        <button onClick={() => navigate('/')} className="mt-4 text-blue-600 underline">홈으로</button>
      </main>
    )
  }

  const schedules = getSchedules(pet.species, records)
  const visitSchedules = records
    .filter((r) => r.nextVisitDate)
    .map((r) => ({ item: '재방문', lastDate: r.date, nextDate: r.nextVisitDate }))
    .sort((a, b) => a.nextDate.localeCompare(b.nextDate))
    .slice(0, 1)

  function handleAddRecord(record) {
    saveRecord(record)
    setShowForm(false)
  }

  function handleDeleteRecord(id) {
    if (window.confirm('이 기록을 삭제할까요?')) removeRecord(id)
  }

  return (
    <main className="max-w-lg mx-auto p-4">
      <button onClick={() => navigate('/')} className="text-sm text-gray-500 mb-4 flex items-center gap-1">
        ← 목록
      </button>

      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{pet.name}</h1>
        <p className="text-sm text-gray-500">
          {SPECIES_LABELS[pet.species]} {pet.breed && `· ${pet.breed}`}
        </p>
      </header>

      {/* 일정 섹션 */}
      {(schedules.length > 0 || visitSchedules.length > 0) && (
        <section className="mb-6">
          <h2 className="text-base font-semibold text-gray-700 mb-2">📅 다음 일정</h2>
          <div className="space-y-2">
            {visitSchedules.map((s) => (
              <ScheduleCard key="visit" {...s} type="visit" />
            ))}
            {schedules.map((s) => (
              <ScheduleCard key={s.item} {...s} />
            ))}
          </div>
        </section>
      )}

      {/* 리포트 버튼 */}
      {records.length > 0 && (
        <button
          onClick={() => navigate(`/pets/${petId}/report`)}
          className="w-full bg-green-600 text-white py-2 rounded-lg mb-6 hover:bg-green-700 text-sm font-medium"
        >
          📋 수의사 상담 리포트 생성
        </button>
      )}

      {/* 기록 추가 */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-gray-700">진료 기록</h2>
        <button
          onClick={() => setShowForm(true)}
          className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700"
        >
          + 기록 추가
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <RecordForm
            petId={petId}
            species={pet.species}
            onSubmit={handleAddRecord}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {records.length === 0 && !showForm && (
        <p className="text-gray-400 text-sm text-center py-8">
          기록이 없어요. 첫 번째 진료 기록을 추가해보세요.
        </p>
      )}

      <ul className="space-y-3">
        {records.map((record) => (
          <li key={record.id} className="bg-white rounded-xl shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900 text-sm">{record.date}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {record.items.map((item) => (
                    <span key={item} className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
                {record.hospital && (
                  <p className="text-xs text-gray-500 mt-1">🏥 {record.hospital}</p>
                )}
                {record.cost != null && (
                  <p className="text-xs text-gray-500">💰 {record.cost.toLocaleString()}원</p>
                )}
                {record.nextVisitDate && (
                  <p className="text-xs text-gray-500">📅 재방문: {record.nextVisitDate}</p>
                )}
                {record.memo && (
                  <p className="text-xs text-gray-400 mt-1 italic">"{record.memo}"</p>
                )}
              </div>
              <button
                onClick={() => handleDeleteRecord(record.id)}
                className="text-red-400 hover:text-red-600 text-xs"
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
```

- [ ] **Step 3: 동작 확인**

1. Home에서 반려동물 카드 클릭 → PetDetail 이동
2. "기록 추가" 클릭 → RecordForm 표시
3. 종합백신 항목으로 기록 저장 → "다음 일정" 섹션에 ScheduleCard 표시
4. 재방문일 입력 시 "재방문 예정" 카드 표시

- [ ] **Step 4: 커밋**

```bash
git add client/src/components/ScheduleCard.jsx client/src/pages/PetDetail.jsx
git commit -m "feat: PetDetail page - record list, schedule cards, record CRUD"
```

---

## Task 8: Express 서버 + 헬스 엔드포인트

**Files:**
- Create: `server/routes/health.js`
- Create: `server/index.js`

- [ ] **Step 1: health 라우터 작성**

`server/routes/health.js`:

```js
import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ status: 'ok' })
})

export default router
```

- [ ] **Step 2: server/index.js 작성**

`server/index.js`:

```js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import healthRouter from './routes/health.js'
import summaryRouter from './routes/summary.js'

dotenv.config()

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/health', healthRouter)
app.use('/api/summary', summaryRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
```

- [ ] **Step 3: summary 라우터 플레이스홀더 생성** (Task 9 이전에 필요)

`server/routes/summary.js`:

```js
import { Router } from 'express'

const router = Router()

router.post('/', (_req, res) => {
  res.status(501).json({ error: 'Not implemented yet' })
})

export default router
```

- [ ] **Step 4: 서버 실행 및 헬스 엔드포인트 확인**

```bash
cd server && npm run dev
```

새 터미널에서:

```bash
curl http://localhost:3001/api/health
```

Expected: `{"status":"ok"}`

- [ ] **Step 5: 커밋**

```bash
git add server/
git commit -m "feat: express server - health endpoint and app skeleton"
```

---

## Task 9: Claude API 요약 엔드포인트 (POST /api/summary)

**Files:**
- Modify: `server/routes/summary.js`

- [ ] **Step 1: summary 라우터 구현**

`server/routes/summary.js` 전체를 아래로 교체:

```js
import { Router } from 'express'
import Anthropic from '@anthropic-ai/sdk'

const router = Router()
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function calcAge(birthDate) {
  const birth = new Date(birthDate)
  const years = new Date().getFullYear() - birth.getFullYear()
  return `${years}세`
}

function formatRecords(records) {
  return records
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((r) => {
      const parts = [`[${r.date}] 항목: ${r.items.join(', ')}`]
      if (r.hospital) parts.push(`병원: ${r.hospital}`)
      if (r.cost != null) parts.push(`비용: ${r.cost.toLocaleString()}원`)
      if (r.nextVisitDate) parts.push(`재방문 예정: ${r.nextVisitDate}`)
      if (r.memo) parts.push(`메모: ${r.memo}`)
      return parts.join(' / ')
    })
    .join('\n')
}

function buildPrompt(pet, records) {
  const SPECIES = { dog: '강아지', cat: '고양이' }
  return `당신은 수의사 상담 보조 AI입니다.
아래 반려동물의 진료 기록을 바탕으로, 수의사가 빠르게 파악할 수 있는 요약 리포트를 한국어로 작성하세요.

[반려동물 정보]
이름: ${pet.name} / 종: ${SPECIES[pet.species] || pet.species} / 품종: ${pet.breed || '미입력'} / 나이: ${calcAge(pet.birthDate)} / 성별: ${pet.gender === 'male' ? '수컷' : '암컷'} / 중성화: ${pet.neutered ? '완료' : '미완료'}

[진료 기록 (최신순)]
${formatRecords(records)}

[출력 형식 — 아래 4개 섹션을 반드시 포함]
## 1. 전체 건강 이력 요약
(3~5문장으로 전체 이력 서술)

## 2. 주요 접종 현황
(접종 항목별 최신 날짜 목록)

## 3. 특이사항 및 수의사 권고 사항
(메모에서 추출한 특이사항)

## 4. 다음 권장 방문 일정
(기록 기반 권장 일정)`
}

router.post('/', async (req, res) => {
  const { pet, records } = req.body

  if (!pet || !records || !Array.isArray(records)) {
    return res.status(400).json({ error: 'pet과 records 필드가 필요합니다.' })
  }

  try {
    const message = await client.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 1024,
      messages: [{ role: 'user', content: buildPrompt(pet, records) }],
    })
    const summary = message.content[0].text
    console.log(`[summary] petId=${pet.id} tokens=${message.usage.input_tokens}+${message.usage.output_tokens}`)
    res.json({ summary })
  } catch (err) {
    console.error('[summary] LLM error:', err.message)
    res.status(500).json({ error: 'LLM 호출 중 오류가 발생했습니다.' })
  }
})

export default router
```

- [ ] **Step 2: 엔드포인트 수동 테스트**

서버가 실행 중인 상태에서 (`npm run dev`):

```bash
curl -X POST http://localhost:3001/api/summary \
  -H "Content-Type: application/json" \
  -d '{
    "pet": {"id":"1","name":"초코","species":"dog","breed":"말티즈","birthDate":"2021-03-15","gender":"female","neutered":true},
    "records": [{"date":"2025-01-10","items":["종합백신"],"hospital":"행복동물병원","cost":45000,"nextVisitDate":null,"memo":"건강 양호"}]
  }'
```

Expected: `{"summary": "## 1. 전체 건강 이력 요약\n..."}` 형태의 JSON

- [ ] **Step 3: 커밋**

```bash
git add server/routes/summary.js
git commit -m "feat: POST /api/summary - Claude API integration with logging"
```

---

## Task 10: ReportViewer 컴포넌트 + 캐싱 + Report 페이지

**Files:**
- Create: `client/src/components/ReportViewer.jsx`
- Modify: `client/src/pages/Report.jsx`

- [ ] **Step 1: ReportViewer 컴포넌트 작성**

`client/src/components/ReportViewer.jsx`:

```jsx
import { useState, useEffect, useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const CACHE_KEY_PREFIX = 'report_cache_'

function getCacheKey(petId) {
  return `${CACHE_KEY_PREFIX}${petId}`
}

function loadCache(petId) {
  const raw = localStorage.getItem(getCacheKey(petId))
  return raw ? JSON.parse(raw) : null
}

function saveCache(petId, summary, recordsHash) {
  localStorage.setItem(
    getCacheKey(petId),
    JSON.stringify({ summary, recordsHash, generatedAt: new Date().toISOString() })
  )
}

// 기록 배열의 간단한 해시 (변경 감지용)
function hashRecords(records) {
  return JSON.stringify(
    records.map((r) => ({ date: r.date, items: r.items, memo: r.memo }))
  )
}

function renderMarkdown(text) {
  return text
    .replace(/^## (.+)$/gm, '<h2 class="text-base font-bold mt-4 mb-1 text-gray-800">$1</h2>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-sm text-gray-700">$1</li>')
    .replace(/\n/g, '<br />')
}

export default function ReportViewer({ pet, records }) {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fromCache, setFromCache] = useState(false)
  const reportRef = useRef(null)

  const currentHash = hashRecords(records)

  useEffect(() => {
    const cache = loadCache(pet.id)
    if (cache && cache.recordsHash === currentHash) {
      setSummary(cache.summary)
      setFromCache(true)
    }
  }, [pet.id, currentHash])

  async function handleGenerate() {
    setLoading(true)
    setError(null)
    setFromCache(false)
    try {
      const res = await fetch('/api/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pet, records }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || '서버 오류')
      }
      const { summary: newSummary } = await res.json()
      setSummary(newSummary)
      saveCache(pet.id, newSummary, currentHash)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDownloadPDF() {
    if (!reportRef.current) return
    const canvas = await html2canvas(reportRef.current, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const pageWidth = pdf.internal.pageSize.getWidth()
    const imgWidth = pageWidth - 20
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight)
    const today = new Date().toISOString().split('T')[0]
    pdf.save(`${pet.name}_health_report_${today}.pdf`)
  }

  return (
    <div className="space-y-4">
      {!summary && (
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium"
        >
          {loading ? '리포트 생성 중...' : '📋 리포트 생성'}
        </button>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          ⚠️ {error}
          <button onClick={handleGenerate} className="ml-2 underline">다시 시도</button>
        </div>
      )}

      {summary && (
        <>
          {fromCache && (
            <div className="flex items-center justify-between text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2">
              <span>💾 이전에 생성된 리포트입니다 (기록 변경 없음)</span>
              <button onClick={handleGenerate} className="underline text-blue-500">다시 생성</button>
            </div>
          )}

          <div ref={reportRef} className="bg-white rounded-xl shadow p-5">
            <div className="border-b pb-3 mb-3">
              <h2 className="text-lg font-bold text-gray-900">🐾 {pet.name} 건강 리포트</h2>
              <p className="text-xs text-gray-400">생성일: {new Date().toLocaleDateString('ko-KR')}</p>
            </div>
            <div
              className="text-sm text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(summary) }}
            />
          </div>

          <button
            onClick={handleDownloadPDF}
            className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 text-sm"
          >
            ⬇️ PDF 다운로드
          </button>
        </>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Report 페이지 구현**

`client/src/pages/Report.jsx`:

```jsx
import { useParams, useNavigate } from 'react-router-dom'
import { useStorage } from '../hooks/useStorage'
import ReportViewer from '../components/ReportViewer'

export default function Report() {
  const { petId } = useParams()
  const navigate = useNavigate()
  const { items: pets } = useStorage('pets')
  const { items: allRecords } = useStorage('records')

  const pet = pets.find((p) => p.id === petId)
  const records = allRecords.filter((r) => r.petId === petId)

  if (!pet) {
    return (
      <main className="p-4 text-center">
        <p className="text-gray-500">반려동물 정보를 찾을 수 없어요.</p>
        <button onClick={() => navigate('/')} className="mt-4 text-blue-600 underline">홈으로</button>
      </main>
    )
  }

  if (records.length === 0) {
    return (
      <main className="max-w-lg mx-auto p-4">
        <button onClick={() => navigate(`/pets/${petId}`)} className="text-sm text-gray-500 mb-4">
          ← 진료 기록
        </button>
        <p className="text-gray-400 text-center py-12">
          진료 기록이 없어요. 먼저 기록을 추가해주세요.
        </p>
      </main>
    )
  }

  return (
    <main className="max-w-lg mx-auto p-4">
      <button
        onClick={() => navigate(`/pets/${petId}`)}
        className="text-sm text-gray-500 mb-4 flex items-center gap-1"
      >
        ← 진료 기록
      </button>
      <h1 className="text-xl font-bold text-gray-900 mb-4">{pet.name}의 건강 리포트</h1>
      <ReportViewer pet={pet} records={records} />
    </main>
  )
}
```

- [ ] **Step 3: 전체 흐름 확인**

클라이언트와 서버 모두 실행:

```bash
# 터미널 1
cd server && npm run dev

# 터미널 2
cd client && npm run dev
```

확인 순서:
1. 반려동물 등록 → 진료 기록 추가 (종합백신 포함)
2. PetDetail에서 "수의사 상담 리포트 생성" 클릭
3. Report 페이지에서 "리포트 생성" 클릭 → 로딩 후 마크다운 리포트 표시
4. 같은 페이지 재방문 시 "이전에 생성된 리포트" 캐시 표시
5. "PDF 다운로드" 클릭 → `초코_health_report_2026-04-14.pdf` 저장

- [ ] **Step 4: 커밋**

```bash
git add client/src/components/ReportViewer.jsx client/src/pages/Report.jsx
git commit -m "feat: ReportViewer - LLM summary display, localStorage caching, PDF download"
```

---

## Task 11: 최종 통합 확인 + 반응형 점검

**Files:**
- Modify: `client/src/App.jsx` (필요 시 네비게이션 추가)

- [ ] **Step 1: 전체 흐름 시나리오 테스트**

아래 시나리오를 순서대로 실행하며 확인:

```
1. 홈 화면 접근 → 반려동물 없음 안내 메시지 표시
2. "초코" (강아지, 말티즈, 2021-03-15) 등록
3. "나비" (고양이) 등록
4. 초코 카드 클릭 → PetDetail 이동
5. 기록 추가: 날짜=오늘, 항목=[종합백신, 심장사상충 예방약], 병원=행복동물병원, 비용=45000, 메모=건강 양호
6. "다음 일정" 섹션에 두 개의 ScheduleCard 표시 확인
7. "수의사 상담 리포트 생성" 클릭 → Report 페이지 이동
8. "리포트 생성" 클릭 → 로딩 → 4섹션 리포트 표시
9. PetDetail로 돌아갔다가 Report 재방문 → 캐시 표시
10. "PDF 다운로드" → 파일 저장 확인
11. 브라우저 창 400px 이하로 축소 → 레이아웃 깨짐 없는지 확인
```

- [ ] **Step 2: 모바일 반응형 점검**

Chrome DevTools에서 iPhone SE (375px) 기준으로 각 페이지 확인:

- Home: 카드 목록이 단일 컬럼으로 표시
- PetDetail: 폼 입력 필드가 전체 너비 사용
- Report: 리포트 텍스트가 읽기 편한 크기

문제가 있는 경우, 해당 컴포넌트에서 `w-full`, `max-w-lg mx-auto`, `p-4` 클래스 적용 확인.

- [ ] **Step 3: 전체 테스트 실행**

```bash
cd client && npm run test:run
```

Expected: All tests passed (useStorage 6개 + scheduleRules 10개)

- [ ] **Step 4: 최종 커밋**

```bash
git add .
git commit -m "feat: MVP complete - pet health scheduler with LLM report and PDF export"
```

---

## 자체 검토 결과

**스펙 커버리지:**
- ✅ 반려동물 프로필 등록 (Task 5)
- ✅ 진료 기록 입력 - 필수/선택 필드 분리 (Task 6)
- ✅ 접종 일정 자동 계산 (Task 3, 7)
- ✅ 재방문 일정 저장·표시 (Task 6, 7)
- ✅ LLM 요약 리포트 생성 (Task 9, 10)
- ✅ 명시적 버튼 클릭에서만 LLM 호출 (Task 10)
- ✅ localStorage 캐싱으로 재호출 방지 (Task 10)
- ✅ 리포트 화면 표시 + PDF 다운로드 (Task 10)
- ✅ 반응형 UI (모든 컴포넌트 Tailwind 반응형 클래스)
- ✅ localStorage 기반 저장 (Task 2)

**타입 일관성:**
- `Pet.id`, `MedicalRecord.petId` UUID 문자열로 일관
- `useStorage('pets')`, `useStorage('records')` 키 일관
- `getSchedules(species, records)` 시그니처 Task 3, 7에서 동일하게 사용
- `ReportViewer({ pet, records })` 시그니처 Task 10, 11에서 일치
