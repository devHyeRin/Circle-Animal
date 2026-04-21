import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Landing from './pages/Landing'
import Home from './pages/Home'
import PetDetail from './pages/PetDetail'
import Report from './pages/Report'
import Reservation from './pages/Reservation'
import About from './pages/About'
import Services from './pages/Services'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/my" element={<Home />} />
        <Route path="/my/pets/:petId" element={<PetDetail />} />
        <Route path="/my/pets/:petId/report" element={<Report />} />
      </Routes>
    </Layout>
  )
}
