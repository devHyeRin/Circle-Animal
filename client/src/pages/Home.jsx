import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStorage } from '../hooks/useStorage'
import PetForm from '../components/PetForm'

const SPECIES_LABEL = { dog: '강아지', cat: '고양이' }

export default function Home() {
  const { items: pets, save } = useStorage('pets')
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()

  function handleSave(pet) {
    save(pet)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-beige py-6 px-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-ink">내 반려동물</h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-brand text-ink text-sm font-semibold px-4 py-2 rounded-xl hover:bg-brand-dark transition-colors shadow-warm-xs"
            >
              + 추가
            </button>
          )}
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl px-6 py-5 shadow-warm-sm border border-warm-border">
            <h2 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-4">반려동물 등록</h2>
            <PetForm onSave={handleSave} onCancel={() => setShowForm(false)} />
          </div>
        )}

        {pets.length === 0 && !showForm && (
          <p className="text-ink-muted text-sm">등록된 반려동물이 없습니다.</p>
        )}

        <ul className="space-y-2">
          {pets.map((pet) => (
            <li
              key={pet.id}
              onClick={() => navigate(`/my/pets/${pet.id}`)}
              className="bg-white rounded-2xl px-6 py-4 shadow-warm-xs border border-warm-border cursor-pointer hover:border-brand hover:shadow-warm-md transition-all"
            >
              <p className="font-semibold text-ink">{pet.name}</p>
              <p className="text-sm text-ink-muted">{SPECIES_LABEL[pet.species] ?? pet.species} · {pet.birthDate}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
