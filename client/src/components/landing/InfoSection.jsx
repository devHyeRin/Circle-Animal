const HOURS = [
  { day: '월 – 금', time: '09:00 – 19:00' },
  { day: '토요일', time: '09:00 – 15:00' },
  { day: '일요일 · 공휴일', time: '휴진' },
  { day: '응급 진료', time: '24시간 가능', highlight: true },
]

export default function InfoSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">찾아오시는 길</h2>
          <p className="text-gray-500 text-lg">예약 후 편하게 방문해 주세요.</p>
        </div>

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
                  <p className="text-gray-500">02-1234-5678</p>
                </div>
              </li>
              <li className="flex gap-3 items-start text-sm">
                <span className="text-lg">🚨</span>
                <div>
                  <p className="font-medium text-gray-900">24시간 응급</p>
                  <p className="text-gray-500">010-9876-5432</p>
                </div>
              </li>
              <li className="flex gap-3 items-start text-sm">
                <span className="text-lg">✉️</span>
                <div>
                  <p className="font-medium text-gray-900">이메일</p>
                  <p className="text-gray-500">hello@circle-vet.kr</p>
                </div>
              </li>
            </ul>
          </div>

          {/* 위치 */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">위치</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start text-sm">
                <span className="text-lg">📍</span>
                <div>
                  <p className="font-medium text-gray-900">주소</p>
                  <p className="text-gray-500">서울 마포구 서교동 123-45<br />서클빌딩 2층</p>
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
                  <p className="text-gray-500">건물 내 주차 1시간 무료</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* 지도 자리 */}
        <div className="mt-6 w-full h-48 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 text-sm border border-dashed border-gray-300">
          지도 영역 (추후 카카오맵 / 네이버맵 연동)
        </div>
      </div>
    </section>
  )
}
