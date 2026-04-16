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
    <div>
      <button onClick={() => navigate('/')}>← 뒤로</button>
      <h1>{pet.name}</h1>
      <p>종: {SPECIES_LABEL[pet.species] ?? pet.species}</p>
      <p>생년월일: {pet.birthDate}</p>

      <ScheduleCard species={pet.species} records={records} />

      <h2>진료 기록</h2>
      {records.length === 0 && <p>진료 기록이 없습니다.</p>}
      <ul>
        {records.map((r) => (
          <li key={r.id}>
            {r.date} · {r.items.join(', ')}
            {r.hospital && ` · ${r.hospital}`}
            {r.memo && <p style={{ color: '#888', fontSize: '0.9em' }}>{r.memo}</p>}
          </li>
        ))}
      </ul>

      {showForm ? (
        <RecordForm petId={petId} onSave={handleSaveRecord} onCancel={() => setShowForm(false)} />
      ) : (
        <button onClick={() => setShowForm(true)}>+ 진료 기록 추가</button>
      )}

      <button onClick={() => navigate(`/pets/${petId}/report`)}>AI 리포트 생성</button>
    </div>
  )
}
