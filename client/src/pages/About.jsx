const VETS = [
  {
    name: '김서준 원장',
    role: '내과 · 일반 진료',
    career: '서울대학교 수의학과 졸업 · 경력 12년',
    desc: '만성 질환 및 노령견 케어 전문. 보호자와의 소통을 가장 중요하게 생각합니다.',
  },
  {
    name: '이하은 수의사',
    role: '외과 · 치과',
    career: '건국대학교 수의학과 졸업 · 경력 8년',
    desc: '연부조직 외과 및 발치 전문. 최소 침습 수술로 회복 부담을 줄입니다.',
  },
  {
    name: '박지호 수의사',
    role: '피부과 · 응급',
    career: '전북대학교 수의학과 졸업 · 경력 6년',
    desc: '알러지·피부 질환 및 야간 응급 담당. 빠른 판단으로 골든타임을 지킵니다.',
  },
]

const FACILITIES = [
  { icon: '🔬', name: '디지털 X-ray', desc: '방사선 피폭을 최소화한 고해상도 영상 진단' },
  { icon: '🩺', name: '초음파 진단기', desc: '복부·심장 실시간 영상으로 정밀 진단' },
  { icon: '💉', name: '자체 검사실', desc: '혈액·뇨 검사 결과를 30분 내 확인' },
  { icon: '🏥', name: '입원실', desc: '24시간 모니터링 가능한 독립 입원 공간' },
  { icon: '🦷', name: '치과 유닛', desc: '구강 내시경 + 초음파 스케일링 장비 보유' },
  { icon: '🚑', name: '응급 처치실', desc: '야간·주말 응급 즉시 대응 가능한 전용 공간' },
]

const HOURS = [
  { day: '월 – 금', time: '09:00 – 19:00' },
  { day: '토요일', time: '09:00 – 15:00' },
  { day: '일요일 · 공휴일', time: '휴진' },
  { day: '응급 진료', time: '24시간 가능 (전화 먼저)' },
]

export default function About() {
  return (
    <div className="bg-ivory">

      {/* 히어로 */}
      <section className="bg-gradient-to-br from-brand-xlight to-ivory py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-brand-light text-brand-dark text-xs font-semibold px-3 py-1 rounded-full mb-4">
            2012년 개원 · 누적 환자 3만+
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-ink leading-tight mb-4">
            반려동물 곁에서<br />
            <span className="text-accent-dark">12년을 함께했습니다</span>
          </h1>
          <p className="text-ink-sub text-lg leading-relaxed">
            서클동물병원은 과잉 진료 없는 정직한 의료를 원칙으로,<br />
            보호자와 반려동물이 함께 안심할 수 있는 공간을 만듭니다.
          </p>
        </div>
      </section>

      {/* 진료 철학 */}
      <section className="py-16 px-4 bg-ivory">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-ink mb-10 text-center">진료 철학</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: '정직한 설명', desc: '진단 결과와 치료 옵션을 있는 그대로 전달합니다. 보호자가 충분히 이해하고 결정할 수 있도록 시간을 씁니다.' },
              { title: '최소 침습 원칙', desc: '꼭 필요한 검사와 치료만 진행합니다. 반려동물의 스트레스와 보호자의 부담을 함께 줄입니다.' },
              { title: '지속적인 관계', desc: '한 번 방문으로 끝나지 않습니다. 전 생애에 걸쳐 건강을 함께 관리하는 주치의를 지향합니다.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-warm-border shadow-warm-xs">
                <h3 className="text-base font-semibold text-ink mb-2">{item.title}</h3>
                <p className="text-sm text-ink-sub leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 의료진 */}
      <section className="py-16 px-4 bg-beige">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-ink mb-2 text-center">의료진 소개</h2>
          <p className="text-ink-sub text-center mb-10">전문 분야별 수의사가 직접 진료합니다.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VETS.map((vet) => (
              <div key={vet.name} className="bg-white rounded-2xl p-6 shadow-warm-sm border border-warm-border">
                <div className="w-14 h-14 bg-brand-light rounded-full flex items-center justify-center text-2xl mb-4">🩺</div>
                <p className="text-xs text-accent-dark font-semibold mb-1">{vet.role}</p>
                <h3 className="text-base font-bold text-ink mb-1">{vet.name}</h3>
                <p className="text-xs text-ink-muted mb-3">{vet.career}</p>
                <p className="text-sm text-ink-sub leading-relaxed">{vet.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 시설 */}
      <section className="py-16 px-4 bg-ivory">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-ink mb-2 text-center">시설 · 장비</h2>
          <p className="text-ink-sub text-center mb-10">정밀 진단을 위한 장비를 직접 운영합니다.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {FACILITIES.map((f) => (
              <div key={f.name} className="flex gap-4 items-start bg-white rounded-2xl p-5 border border-warm-border shadow-warm-xs">
                <span className="text-3xl">{f.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-ink mb-1">{f.name}</p>
                  <p className="text-xs text-ink-sub leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 운영시간 + 연락처 */}
      <section className="py-16 px-4 bg-beige">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* 운영시간 */}
          <div className="bg-white rounded-2xl p-6 shadow-warm-sm border border-warm-border">
            <h2 className="text-lg font-bold text-ink mb-5">운영시간</h2>
            <ul className="space-y-3">
              {HOURS.map((h) => (
                <li key={h.day} className="flex justify-between text-sm">
                  <span className="text-ink-sub">{h.day}</span>
                  <span className={`font-medium ${h.day === '응급 진료' ? 'text-accent-dark' : 'text-ink'}`}>
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-ink-muted mt-4">※ 응급의 경우 사전 전화 후 방문해 주세요.</p>
          </div>

          {/* 연락처 */}
          <div className="bg-white rounded-2xl p-6 shadow-warm-sm border border-warm-border">
            <h2 className="text-lg font-bold text-ink mb-5">오시는 길</h2>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="text-lg">📍</span>
                <div>
                  <p className="font-medium text-ink">주소</p>
                  <p className="text-ink-sub">서울특별시 마포구 서교동 123-45<br />서클빌딩 2층</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-lg">📞</span>
                <div>
                  <p className="font-medium text-ink">전화</p>
                  <p className="text-ink-sub">02-1234-5678</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-lg">🚇</span>
                <div>
                  <p className="font-medium text-ink">대중교통</p>
                  <p className="text-ink-sub">홍대입구역 3번 출구 도보 5분</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-lg">🅿️</span>
                <div>
                  <p className="font-medium text-ink">주차</p>
                  <p className="text-ink-sub">건물 내 주차 가능 (1시간 무료)</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </section>

    </div>
  )
}
