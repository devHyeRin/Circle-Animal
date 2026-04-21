import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NAV_LINKS = [
  { label: '진료 안내', href: '/services' },
  { label: '병원 소개', href: '/about' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* 로고 */}
        <Link to="/" className="text-lg font-bold text-blue-600 tracking-tight">
          서클동물병원
        </Link>

        {/* 데스크탑 네비 */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link to="/my" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            마이페이지
          </Link>
          <button
            onClick={() => navigate('/reservation')}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            예약하기
          </button>
        </nav>

        {/* 모바일 햄버거 */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="메뉴 열기"
        >
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* 모바일 드롭다운 */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="block text-sm text-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/my"
            className="block text-sm text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            마이페이지
          </Link>
          <button
            onClick={() => { navigate('/reservation'); setMenuOpen(false) }}
            className="w-full bg-blue-600 text-white text-sm px-4 py-2 rounded-lg"
          >
            예약하기
          </button>
        </div>
      )}
    </header>
  )
}
