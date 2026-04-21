import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Landing from './pages/Landing'
import Home from './pages/Home'
import PetDetail from './pages/PetDetail'
import Report from './pages/Report'
import Reservation from './pages/Reservation'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/my" element={<Home />} />
        <Route path="/my/pets/:petId" element={<PetDetail />} />
        <Route path="/my/pets/:petId/report" element={<Report />} />
      </Routes>
    </Layout>
  )
}
