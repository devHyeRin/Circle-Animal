import { useParams, useNavigate } from 'react-router-dom'
import { useStorage } from '../hooks/useStorage'

const SPECIES_LABEL = { dog: '강아지', cat: '고양이' }

export default function PetDetail() {
  const { petId } = useParams()
  const { items: pets } = useStorage('pets')
  const navigate = useNavigate()

  const pet = pets.find((p) => p.id === petId)

  if (!pet) return (
    <div>
      <p>반려동물을 찾을 수 없습니다.</p>
      <button onClick={() => navigate('/')}>홈으로</button>
    </div>
  )

  return (
    <div>
      <button onClick={() => navigate('/')}>← 뒤로</button>
      <h1>{pet.name}</h1>
      <p>종: {SPECIES_LABEL[pet.species] ?? pet.species}</p>
      <p>생년월일: {pet.birthDate}</p>
    </div>
  )
}
