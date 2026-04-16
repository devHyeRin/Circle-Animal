import { useParams } from 'react-router-dom'

export default function PetDetail() {
  const { petId } = useParams()
  return <div>PetDetail — petId: {petId}</div>
}
