import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const SERVICES = [
  {
    icon: '🩺',
    name: '건강검진',
    tag: '예방 · 정기',
    desc: '혈액검사, 소변검사, X-ray, 초음파를 종합한 정기 건강검진. 연령별 맞춤 검진 패키지를 제공합니다.',
    items: ['기본 신체검사', '혈액·소변 검사', '복부 초음파', 'X-ray 촬영', '검진 결과 상담'],
  },
  {
    icon: '💉',
    name: '예방접종',
    tag: '접종 · 예방',
    desc: '강아지·고양이 종합백신부터 광견병·켄넬코프까지. 다음 접종일을 자동으로 안내해 드립니다.',
    items: ['종합백신 (DHPPL / FVRCP)', '광견병 접종', '켄넬코프', '인플루엔자', '접종 이력 관리'],
  },
  {
    icon: '🫁',
    name: '내과 진료',
    tag: '내과',
    desc: '소화기, 호흡기, 순환기, 내분비 등 내과 전반을 다룹니다. 만성질환 장기 관리도 전담합니다.',
    items: ['소화기·구토·설사', '호흡기 질환', '심장·순환기', '당뇨·갑상선', '만성질환 관리'],
  },
  {
    icon: '🔪',
    name: '외과 수술',
    tag: '외과',
    desc: '중성화 수술부터 종양 제거, 골절 수술까지. 최소 침습 원칙으로 회복 기간을 단축합니다.',
    items: ['중성화 수술', '종양·낭종 제거', '골절 정형외과', '연부조직 수술', '수술 후 케어'],
  },
  {
    icon: '🦷',
    name: '치과 진료',
    tag: '치과',
    desc: '스케일링, 발치, 구강 내시경 검사까지. 마취 전 사전 검사를 필수로 진행해 안전을 확보합니다.',
    items: ['구강 검진', '초음파 스케일링', '발치', '구강 내시경', '마취 전 혈액검사'],
  },
  {
    icon: '🚨',
    name: '응급 진료',
    tag: '24시간',
    desc: '야간·주말 응급 상황에도 즉시 대응합니다. 방문 전 전화 주시면 대기 없이 처치를 준비합니다.',
    items: ['외상·골절 응급 처치', '호흡 곤란', '경련·의식 저하', '중독 대응', '24시간 전화 상담'],
  },
]

const STEPS = [
  { step: '01', title: '온라인 예약', desc: '예약 페이지에서 희망 날짜와 시간을 선택합니다.' },
  { step: '02', title: '접수 확인 연락', desc: '담당자가 예약 내용을 확인 후 1시간 이내 연락드립니다.' },
  { step: '03', title: '내원 및 접수', desc: '예약 시간에 맞춰 방문, 프런트에서 간단히 접수합니다.' },
  { step: '04', title: '진료 · 검사', desc: '수의사가 직접 진료하고 필요한 검사를 진행합니다.' },
  { step: '05', title: '결과 상담', desc: '진단 결과와 치료 방향을 보호자에게 충분히 설명합니다.' },
  { step: '06', title: '처방 · 처치', desc: '처방전 발행 또는 당일 처치 후 다음 방문 일정을 안내합니다.' },
]

const FAQS = [
  {
    q: '예약 없이 방문해도 되나요?',
    a: '당일 방문도 가능하지만, 대기 시간이 길어질 수 있습니다. 응급 상황이라면 방문 전 꼭 전화해 주세요. 대기 없이 바로 처치를 준비하겠습니다.',
  },
  {
    q: '첫 방문 시 준비물이 있나요?',
    a: '이전 진료·접종 기록이 있다면 가져오시면 도움이 됩니다. 없어도 괜찮습니다. 기본 신체검사부터 시작합니다.',
  },
  {
    q: '수술 전 검사가 꼭 필요한가요?',
    a: '마취가 필요한 모든 수술·처치 전에는 혈액검사를 필수로 진행합니다. 마취 위험도를 사전에 확인해 안전한 수술을 보장하기 위함입니다.',
  },
  {
    q: '진료비 견적을 미리 알 수 있나요?',
    a: '검사 항목과 진료 범위에 따라 달라지므로 진료 전 정확한 금액 안내는 어렵습니다. 진료 전 예상 범위를 먼저 안내드리고, 동의 후 진행합니다.',
  },
  {
    q: '고양이도 진료 가능한가요?',
    a: '네, 강아지와 고양이 모두 진료합니다. 고양이 전용 대기 공간을 별도 운영해 스트레스를 최소화합니다.',
  },
]

export default function Services() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="bg-ivory">

      {/* 히어로 */}
      <section className="bg-gradient-to-br from-brand-xlight to-ivory py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-brand-light text-brand-dark text-xs font-semibold px-3 py-1 rounded-full mb-4">
            내과 · 외과 · 치과 · 응급
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-ink leading-tight mb-4">
            어떤 진료든<br />
            <span className="text-accent-dark">한 곳에서</span> 해결합니다
          </h1>
          <p className="text-ink-sub text-lg leading-relaxed">
            예방부터 수술, 응급까지. 분야별 전문 수의사가 직접 진료합니다.
          </p>
        </div>
      </section>

      {/* 진료 항목 카드 */}
      <section className="py-16 px-4 bg-ivory">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-ink mb-10 text-center">진료 항목</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.name}
                className="bg-white rounded-2xl p-6 flex flex-col border border-warm-border hover:shadow-warm-md transition-shadow"
              >
                <div className="text-4xl mb-3">{s.icon}</div>
                <span className="text-xs text-accent-dark font-semibold mb-1">{s.tag}</span>
                <h3 className="text-base font-bold text-ink mb-2">{s.name}</h3>
                <p className="text-sm text-ink-sub leading-relaxed mb-4">{s.desc}</p>
                <ul className="mt-auto space-y-1">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-ink-sub">
                      <span className="w-1 h-1 rounded-full bg-brand flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 진료 절차 */}
      <section className="py-16 px-4 bg-beige">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-ink mb-2 text-center">진료 절차</h2>
          <p className="text-ink-sub text-center mb-10">처음 오시는 분도 편하게 이용하실 수 있습니다.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {STEPS.map((s) => (
              <div key={s.step} className="bg-white rounded-2xl p-5 shadow-warm-xs border border-warm-border flex gap-4">
                <span className="text-2xl font-bold text-warm-200 leading-none">{s.step}</span>
                <div>
                  <p className="text-sm font-semibold text-ink mb-1">{s.title}</p>
                  <p className="text-xs text-ink-sub leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-ivory">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-ink mb-2 text-center">자주 묻는 질문</h2>
          <p className="text-ink-sub text-center mb-10">궁금한 점이 있으시면 전화로도 문의해 주세요.</p>
          <ul className="space-y-3">
            {FAQS.map((faq, i) => (
              <li key={i} className="border border-warm-border rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center px-5 py-4 text-left bg-white hover:bg-beige transition-colors"
                >
                  <span className="text-sm font-medium text-ink">{faq.q}</span>
                  <span className="text-ink-muted text-lg leading-none ml-4">
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-ink-sub leading-relaxed border-t border-warm-border pt-3 bg-white">
                    {faq.a}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-ink mb-3">지금 바로 예약하세요</h2>
          <p className="text-ink-sub text-lg mb-8">
            온라인 예약으로 대기 없이 빠르게.<br />
            첫 방문 보호자에게 기본 검진을 무료로 제공합니다.
          </p>
          <button
            onClick={() => navigate('/reservation')}
            className="bg-white text-ink px-8 py-3 rounded-xl font-semibold hover:bg-ivory transition-colors shadow-warm-sm"
          >
            예약하기
          </button>
        </div>
      </section>

    </div>
  )
}
