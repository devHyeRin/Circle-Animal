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
    <header className="sticky top-0 z-50 bg-ivory border-b border-warm-border shadow-warm-xs">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* 로고 */}
        <Link to="/" className="text-lg font-bold text-ink tracking-tight">
          서클동물병원
        </Link>

        {/* 데스크탑 네비 */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm text-ink-sub hover:text-ink transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link to="/my" className="text-sm text-ink-sub hover:text-ink transition-colors">
            마이페이지
          </Link>
          <button
            onClick={() => navigate('/reservation')}
            className="bg-brand text-ink text-sm font-semibold px-4 py-2 rounded-xl hover:bg-brand-dark transition-colors shadow-warm-xs"
          >
            예약하기
          </button>
        </nav>

        {/* 모바일 햄버거 */}
        <button
          className="md:hidden p-2 text-ink-sub"
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
        <div className="md:hidden bg-ivory border-t border-warm-border px-4 py-3 space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="block text-sm text-ink-sub"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/my"
            className="block text-sm text-ink-sub"
            onClick={() => setMenuOpen(false)}
          >
            마이페이지
          </Link>
          <button
            onClick={() => { navigate('/reservation'); setMenuOpen(false) }}
            className="w-full bg-brand text-ink font-semibold text-sm px-4 py-2 rounded-xl"
          >
            예약하기
          </button>
        </div>
      )}
    </header>
  )
}
