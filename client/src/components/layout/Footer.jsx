import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* 병원 정보 */}
          <div>
            <p className="text-white font-semibold mb-3">서클동물병원</p>
            <p className="text-sm">서울특별시 마포구 서교동 123-45</p>
            <p className="text-sm mt-1">대표전화: 02-1234-5678</p>
            <p className="text-sm mt-1">응급전화: 010-9876-5432</p>
          </div>

          {/* 운영시간 */}
          <div>
            <p className="text-white font-semibold mb-3">운영시간</p>
            <p className="text-sm">평일 09:00 – 19:00</p>
            <p className="text-sm mt-1">토요일 09:00 – 15:00</p>
            <p className="text-sm mt-1">일요일·공휴일 휴진</p>
            <p className="text-sm mt-1 text-blue-400">야간 응급 24시간 운영</p>
          </div>

          {/* 바로가기 */}
          <div>
            <p className="text-white font-semibold mb-3">바로가기</p>
            <ul className="space-y-1 text-sm">
              <li><Link to="/reservation" className="hover:text-white transition-colors">예약하기</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">진료 안내</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">병원 소개</Link></li>
              <li><Link to="/my" className="hover:text-white transition-colors">마이페이지</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-xs text-center">
          © 2026 서클동물병원. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
