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
    <div>
      <h1>내 반려동물</h1>

      {pets.length === 0 && !showForm && (
        <p>등록된 반려동물이 없습니다.</p>
      )}

      <ul>
        {pets.map((pet) => (
          <li key={pet.id} onClick={() => navigate(`/pets/${pet.id}`)} style={{ cursor: 'pointer' }}>
            {pet.name} · {SPECIES_LABEL[pet.species] ?? pet.species} · {pet.birthDate}
          </li>
        ))}
      </ul>

      {showForm ? (
        <PetForm onSave={handleSave} onCancel={() => setShowForm(false)} />
      ) : (
        <button onClick={() => setShowForm(true)}>+ 반려동물 추가</button>
      )}
    </div>
  )
}
