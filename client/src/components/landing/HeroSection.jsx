import { useNavigate } from 'react-router-dom'

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* 텍스트 */}
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            24시간 응급 진료 운영 중
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            반려동물의 건강,<br />
            <span className="text-blue-600">서클동물병원</span>이<br />
            함께합니다
          </h1>
          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            진료 기록부터 예방접종 일정까지.<br />
            믿을 수 있는 전문 의료진이 곁에 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <button
              onClick={() => navigate('/reservation')}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md"
            >
              지금 예약하기
            </button>
            <button
              onClick={() => navigate('/my')}
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold border border-blue-200 hover:bg-blue-50 transition-colors"
            >
              진료 기록 관리
            </button>
          </div>
        </div>

        {/* 일러스트 자리 (추후 이미지 교체) */}
        <div className="flex-1 flex justify-center">
          <div className="w-72 h-72 bg-blue-100 rounded-3xl flex items-center justify-center text-7xl shadow-inner">
            🐾
          </div>
        </div>
      </div>
    </section>
  )
}
