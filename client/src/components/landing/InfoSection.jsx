const HOURS = [
  { day: '월 – 금', time: '09:00 – 19:00' },
  { day: '토요일', time: '09:00 – 15:00' },
  { day: '일요일 · 공휴일', time: '휴진' },
  { day: '응급 진료', time: '24시간 가능', highlight: true },
]

const ADDRESS = '서울 마포구 서교동 123-45'
const KAKAO_URL = `https://map.kakao.com/link/search/${encodeURIComponent('서클동물병원 마포구 서교동')}`
const NAVER_URL = `https://map.naver.com/v5/search/${encodeURIComponent('서클동물병원 마포구 서교동')}`

export default function InfoSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">찾아오시는 길</h2>
          <p className="text-gray-500 text-lg">예약 후 편하게 방문해 주세요.</p>
        </div>

        {/* 지도 Mock + 핀 */}
        <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-blue-50 to-slate-100 border border-gray-200">

          {/* 도로망 느낌의 배경 라인 */}
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 가로 도로 */}
            <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#94a3b8" strokeWidth="8" />
            <line x1="0" y1="55%" x2="100%" y2="55%" stroke="#94a3b8" strokeWidth="14" />
            <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#94a3b8" strokeWidth="6" />
            {/* 세로 도로 */}
            <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#94a3b8" strokeWidth="6" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#94a3b8" strokeWidth="12" />
            <line x1="78%" y1="0" x2="78%" y2="100%" stroke="#94a3b8" strokeWidth="6" />
            {/* 블록 */}
            <rect x="21%" y="31%" width="28%" height="23%" rx="2" fill="#cbd5e1" />
            <rect x="51%" y="31%" width="26%" height="23%" rx="2" fill="#cbd5e1" />
            <rect x="21%" y="56%" width="28%" height="23%" rx="2" fill="#cbd5e1" />
            <rect x="51%" y="56%" width="26%" height="23%" rx="2" fill="#cbd5e1" />
          </svg>

          {/* 위치 핀 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg mb-1 whitespace-nowrap">
                서클동물병원
              </div>
              <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-md" />
              <div className="w-0.5 h-3 bg-blue-600" />
              <div className="w-2 h-1 bg-blue-400 rounded-full opacity-50" />
            </div>
          </div>

          {/* 주소 오버레이 */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow text-xs text-gray-600">
            📍 {ADDRESS} · 서클빌딩 2층
          </div>

          {/* 지도 앱 버튼 */}
          <div className="absolute bottom-3 right-3 flex gap-2">
            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 text-xs font-semibold px-3 py-1.5 rounded-lg shadow transition-colors"
            >
              카카오맵
            </a>
            <a
              href={NAVER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow transition-colors"
            >
              네이버지도
            </a>
          </div>
        </div>

        {/* 정보 카드 3열 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* 운영시간 */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">운영시간</h3>
            <ul className="space-y-3">
              {HOURS.map((h) => (
                <li key={h.day} className="flex justify-between text-sm">
                  <span className="text-gray-500">{h.day}</span>
                  <span className={`font-medium ${h.highlight ? 'text-blue-600' : 'text-gray-900'}`}>
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-400 mt-4">응급 시 전화 먼저 주세요.</p>
          </div>

          {/* 연락처 */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">연락처</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start text-sm">
                <span className="text-lg">📞</span>
                <div>
                  <p className="font-medium text-gray-900">대표 전화</p>
                  <a href="tel:0212345678" className="text-blue-600 hover:underline">02-1234-5678</a>
                </div>
              </li>
              <li className="flex gap-3 items-start text-sm">
                <span className="text-lg">🚨</span>
                <div>
                  <p className="font-medium text-gray-900">24시간 응급</p>
                  <a href="tel:01098765432" className="text-blue-600 hover:underline">010-9876-5432</a>
                </div>
              </li>
              <li className="flex gap-3 items-start text-sm">
                <span className="text-lg">✉️</span>
                <div>
                  <p className="font-medium text-gray-900">이메일</p>
                  <a href="mailto:hello@circle-vet.kr" className="text-blue-600 hover:underline">hello@circle-vet.kr</a>
                </div>
              </li>
            </ul>
          </div>

          {/* 위치 · 교통 */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">교통 안내</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start text-sm">
                <span className="text-lg">📍</span>
                <div>
                  <p className="font-medium text-gray-900">주소</p>
                  <p className="text-gray-500">{ADDRESS}<br />서클빌딩 2층</p>
                </div>
              </li>
              <li className="flex gap-3 items-start text-sm">
                <span className="text-lg">🚇</span>
                <div>
                  <p className="font-medium text-gray-900">지하철</p>
                  <p className="text-gray-500">홍대입구역 3번 출구<br />도보 5분</p>
                </div>
              </li>
              <li className="flex gap-3 items-start text-sm">
                <span className="text-lg">🅿️</span>
                <div>
                  <p className="font-medium text-gray-900">주차</p>
                  <p className="text-gray-500">건물 내 주차 1시간 무료<br />(진료 확인 필수)</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}
