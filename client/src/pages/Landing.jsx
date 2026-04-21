import { useNavigate } from 'react-router-dom'
import HeroSection from '../components/landing/HeroSection'
import FeatureSection from '../components/landing/FeatureSection'
import TestimonialSection from '../components/landing/TestimonialSection'
import InfoSection from '../components/landing/InfoSection'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <TestimonialSection />
      <InfoSection />

      {/* CTA 배너 */}
      <section className="bg-brand py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-ink mb-3">
            지금 바로 예약하세요
          </h2>
          <p className="text-ink-sub text-lg mb-8">
            온라인 예약으로 대기 없이 빠르게.<br />
            첫 방문 보호자에게 기본 검진을 무료로 제공합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/reservation')}
              className="bg-white text-ink px-8 py-3 rounded-xl font-semibold hover:bg-ivory transition-colors shadow-warm-sm"
            >
              예약하기
            </button>
            <button
              onClick={() => navigate('/my')}
              className="border border-warm-border-strong text-ink px-8 py-3 rounded-xl font-semibold hover:bg-brand-dark transition-colors"
            >
              진료 기록 관리
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
