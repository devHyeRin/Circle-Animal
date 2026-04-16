import { useParams } from 'react-router-dom'

export default function Report() {
  const { petId } = useParams()
  return <div>Report — petId: {petId}</div>
}
