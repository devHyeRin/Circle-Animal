const FEATURES = [
  {
    icon: '🏥',
    title: '전문 의료진',
    desc: '10년 이상 경력의 수의사가 직접 진료합니다. 내과·외과·치과 분야별 전문 케어.',
  },
  {
    icon: '🕐',
    title: '24시간 응급 진료',
    desc: '야간·주말 응급 상황에도 언제든 달려옵니다. 응급 전화 연결 즉시 대응.',
  },
  {
    icon: '📋',
    title: '진료 기록 관리',
    desc: '접종 이력, 진료 내용, 처방전을 체계적으로 관리. 수의사 상담용 리포트 자동 생성.',
  },
  {
    icon: '💊',
    title: '예방 접종 알림',
    desc: '다음 접종일을 자동으로 계산해 알려드립니다. 놓치는 접종 없이 건강하게.',
  },
  {
    icon: '📱',
    title: '간편 온라인 예약',
    desc: '앱 없이 웹에서 바로 예약. 원하는 날짜와 시간을 직접 선택하세요.',
  },
  {
    icon: '❤️',
    title: '평생 건강 파트너',
    desc: '어릴 때부터 노령까지, 반려동물의 전 생애를 함께하는 주치의 서비스.',
  },
]

export default function FeatureSection() {
  return (
    <section className="py-20 px-4 bg-ivory">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-ink mb-3">
            왜 서클동물병원인가요?
          </h2>
          <p className="text-ink-sub text-lg">
            반려동물의 건강을 위해 가장 중요한 것들에 집중합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-6 border border-warm-border hover:shadow-warm-md transition-shadow"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-base font-semibold text-ink mb-2">{f.title}</h3>
              <p className="text-sm text-ink-sub leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
