import { useNavigate } from 'react-router-dom'

const STATS = [
  { value: '3만+', label: '누적 환자' },
  { value: '12년', label: '개원 경력' },
  { value: '3인', label: '전문 수의사' },
  { value: '24h', label: '응급 대응' },
]

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="bg-gradient-to-br from-brand-xlight to-ivory pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* 텍스트 */}
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block bg-brand-light text-brand-dark text-xs font-semibold px-3 py-1 rounded-full mb-4">
            24시간 응급 진료 운영 중
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-ink leading-tight mb-4">
            반려동물의 건강,<br />
            <span className="text-accent-dark">서클동물병원</span>이<br />
            함께합니다
          </h1>
          <p className="text-ink-sub text-lg mb-8 leading-relaxed">
            진료 기록부터 예방접종 일정까지.<br />
            믿을 수 있는 전문 의료진이 곁에 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <button
              onClick={() => navigate('/reservation')}
              className="bg-brand text-ink px-8 py-3 rounded-xl font-semibold hover:bg-brand-dark transition-colors shadow-warm-md"
            >
              지금 예약하기
            </button>
            <button
              onClick={() => navigate('/services')}
              className="bg-white text-ink px-8 py-3 rounded-xl font-semibold border border-warm-border hover:bg-beige transition-colors"
            >
              진료 안내 보기
            </button>
          </div>
        </div>

        {/* 일러스트 자리 (추후 이미지 교체) */}
        <div className="flex-1 flex justify-center">
          <div className="w-72 h-72 bg-brand-light rounded-3xl flex items-center justify-center text-7xl shadow-warm-md">
            🐾
          </div>
        </div>
      </div>

      {/* 신뢰 지표 바 */}
      <div className="max-w-5xl mx-auto mt-12">
        <div className="bg-white rounded-2xl shadow-warm-sm border border-warm-border grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-warm-border">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center py-5">
              <span className="text-2xl font-bold text-accent-dark">{s.value}</span>
              <span className="text-xs text-ink-muted mt-1">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
