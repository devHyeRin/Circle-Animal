import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import PetDetail from './pages/PetDetail'
import Report from './pages/Report'

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* 기존 경로 → /my 하위로 이동 */}
        <Route path="/my" element={<Home />} />
        <Route path="/my/pets/:petId" element={<PetDetail />} />
        <Route path="/my/pets/:petId/report" element={<Report />} />

        {/* 루트는 Landing으로 (Step 2에서 교체) */}
        <Route path="/" element={<Navigate to="/my" replace />} />
      </Routes>
    </Layout>
  )
}
