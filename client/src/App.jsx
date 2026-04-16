import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PetDetail from './pages/PetDetail'
import Report from './pages/Report'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pets/:petId" element={<PetDetail />} />
      <Route path="/pets/:petId/report" element={<Report />} />
    </Routes>
  )
}
