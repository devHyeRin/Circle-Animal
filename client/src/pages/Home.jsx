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
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">내 반려동물</h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              + 추가
            </button>
          )}
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100">
            <h2 className="text-base font-semibold text-gray-500 uppercase tracking-wide mb-4">반려동물 등록</h2>
            <PetForm onSave={handleSave} onCancel={() => setShowForm(false)} />
          </div>
        )}

        {pets.length === 0 && !showForm && (
          <p className="text-gray-400 text-sm">등록된 반려동물이 없습니다.</p>
        )}

        <ul className="space-y-2">
          {pets.map((pet) => (
            <li
              key={pet.id}
              onClick={() => navigate(`/pets/${pet.id}`)}
              className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-gray-100 cursor-pointer hover:border-blue-200 hover:shadow-md transition-shadow"
            >
              <p className="font-semibold text-gray-900">{pet.name}</p>
              <p className="text-sm text-gray-400">{SPECIES_LABEL[pet.species] ?? pet.species} · {pet.birthDate}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
