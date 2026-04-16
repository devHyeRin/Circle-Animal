import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useStorage } from '../hooks/useStorage'
import RecordForm from '../components/RecordForm'
import ScheduleCard from '../components/ScheduleCard'

const SPECIES_LABEL = { dog: '강아지', cat: '고양이' }

export default function PetDetail() {
  const { petId } = useParams()
  const { items: pets } = useStorage('pets')
  const { items: allRecords, save: saveRecord } = useStorage('records')
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()

  const pet = pets.find((p) => p.id === petId)
  const records = allRecords.filter((r) => r.petId === petId)
    .sort((a, b) => b.date.localeCompare(a.date))

  if (!pet) return (
    <div>
      <p>반려동물을 찾을 수 없습니다.</p>
      <button onClick={() => navigate('/')}>홈으로</button>
    </div>
  )

  function handleSaveRecord(record) {
    saveRecord(record)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-2xl mx-auto space-y-4">

        {/* 상단 액션 바 */}
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/')} className="text-sm text-gray-500 hover:text-gray-800">
            ← 뒤로
          </button>
          <button
            onClick={() => navigate(`/pets/${petId}/report`)}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            리포트 생성
          </button>
        </div>

        {/* 기본 정보 */}
        <div className="bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900">{pet.name}</h1>
          <p className="text-sm text-gray-400 mt-1">
            {SPECIES_LABEL[pet.species] ?? pet.species} · {pet.birthDate}
          </p>
        </div>

        <ScheduleCard species={pet.species} records={records} />

        {/* 진료 기록 */}
        <div className="bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-500 uppercase tracking-wide">진료 기록</h2>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                + 추가
              </button>
            )}
          </div>

          {showForm && (
            <div className="mb-4">
              <RecordForm petId={petId} onSave={handleSaveRecord} onCancel={() => setShowForm(false)} />
            </div>
          )}

          {records.length === 0 && !showForm && (
            <p className="text-sm text-gray-400">진료 기록이 없습니다.</p>
          )}

          <ul className="space-y-3">
            {records.map((r) => (
              <li key={r.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <p className="text-sm font-medium text-gray-800">{r.date}</p>
                <p className="text-sm text-gray-600">{r.items.join(', ')}</p>
                {r.hospital && <p className="text-xs text-gray-400">{r.hospital}</p>}
                {r.memo && <p className="text-xs text-gray-400 mt-0.5">{r.memo}</p>}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}
