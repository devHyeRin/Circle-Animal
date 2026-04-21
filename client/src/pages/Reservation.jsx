import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SPECIES_LABEL = { dog: '강아지', cat: '고양이', other: '기타' }

const NEXT_STEPS = [
  { step: '01', text: '담당자가 예약 내용을 확인합니다.' },
  { step: '02', text: '1시간 이내로 등록하신 번호로 연락드립니다.' },
  { step: '03', text: '확정된 날짜·시간에 내원해 주세요.' },
]

const INPUT_CLS = 'w-full border border-warm-border rounded-xl px-4 py-2.5 text-sm bg-white text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors'

function ConfirmScreen({ form, onReset, navigate }) {
  const speciesLabel = SPECIES_LABEL[form.species] || form.species

  return (
    <div className="min-h-screen bg-beige py-12 px-4">
      <div className="max-w-lg mx-auto space-y-4">

        {/* 완료 헤더 */}
        <div className="bg-white rounded-2xl shadow-warm-sm border border-warm-border p-8 text-center">
          <div className="w-14 h-14 bg-brand-light rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            🐾
          </div>
          <h2 className="text-2xl font-bold text-ink mb-2">예약이 접수되었습니다</h2>
          <p className="text-ink-sub text-sm leading-relaxed">
            담당자 확인 후 <span className="font-medium text-ink">{form.phone}</span>으로<br />
            1시간 이내 연락드립니다.
          </p>
        </div>

        {/* 예약 정보 요약 */}
        <div className="bg-white rounded-2xl shadow-warm-xs border border-warm-border px-6 py-5">
          <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-4">예약 정보 확인</h3>
          <ul className="space-y-3">
            <li className="flex justify-between text-sm">
              <span className="text-ink-muted">보호자</span>
              <span className="font-medium text-ink">{form.name}</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-ink-muted">연락처</span>
              <span className="font-medium text-ink">{form.phone}</span>
            </li>
            {form.petName && (
              <li className="flex justify-between text-sm">
                <span className="text-ink-muted">반려동물</span>
                <span className="font-medium text-ink">{form.petName} ({speciesLabel})</span>
              </li>
            )}
            <li className="flex justify-between text-sm">
              <span className="text-ink-muted">희망 날짜</span>
              <span className="font-medium text-ink">{form.date}{form.time ? ` ${form.time}` : ''}</span>
            </li>
            {form.reason && (
              <li className="flex justify-between text-sm">
                <span className="text-ink-muted">방문 사유</span>
                <span className="font-medium text-ink text-right max-w-[60%]">{form.reason}</span>
              </li>
            )}
          </ul>
        </div>

        {/* 다음 단계 */}
        <div className="bg-brand-xlight rounded-2xl px-6 py-5 border border-brand-light">
          <h3 className="text-xs font-semibold text-brand-dark uppercase tracking-wide mb-4">다음 단계</h3>
          <ul className="space-y-3">
            {NEXT_STEPS.map((s) => (
              <li key={s.step} className="flex gap-3 items-start">
                <span className="text-xs font-bold text-warm-300 mt-0.5 w-5 flex-shrink-0">{s.step}</span>
                <p className="text-sm text-ink-sub">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* 연락처 */}
        <div className="bg-white rounded-2xl shadow-warm-xs border border-warm-border px-6 py-5">
          <p className="text-xs text-ink-muted mb-3">문의가 있으시면 직접 연락주세요.</p>
          <div className="flex gap-3">
            <a
              href="tel:0212345678"
              className="flex-1 flex items-center justify-center gap-2 border border-warm-border rounded-xl py-2.5 text-sm font-medium text-ink hover:bg-beige transition-colors"
            >
              📞 02-1234-5678
            </a>
            <a
              href="tel:01098765432"
              className="flex-1 flex items-center justify-center gap-2 bg-red-50 border border-red-100 rounded-xl py-2.5 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
            >
              🚨 응급 연락
            </a>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={onReset}
            className="flex-1 border border-warm-border text-ink-sub py-3 rounded-xl font-semibold hover:bg-beige transition-colors text-sm"
          >
            추가 예약하기
          </button>
          <button
            onClick={() => navigate('/my')}
            className="flex-1 border border-warm-border-strong text-ink py-3 rounded-xl font-semibold hover:bg-warm-100 transition-colors text-sm"
          >
            내 반려동물 보기
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-brand text-ink py-3 rounded-xl font-semibold hover:bg-brand-dark transition-colors text-sm"
          >
            홈으로
          </button>
        </div>

      </div>
    </div>
  )
}

export default function Reservation() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    phone: '',
    petName: '',
    species: 'dog',
    date: '',
    time: '',
    reason: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  function handleReset() {
    setForm({ name: '', phone: '', petName: '', species: 'dog', date: '', time: '', reason: '' })
    setSubmitted(false)
  }

  if (submitted) {
    return <ConfirmScreen form={form} onReset={handleReset} navigate={navigate} />
  }

  return (
    <div className="min-h-screen bg-beige py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ink">진료 예약</h1>
          <p className="text-ink-sub mt-1">아래 정보를 입력하시면 담당자가 확인 후 연락드립니다.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-warm-sm border border-warm-border p-6 space-y-5">

          <div>
            <label className="block text-sm font-medium text-ink mb-1">보호자 이름 <span className="text-red-500">*</span></label>
            <input name="name" value={form.name} onChange={handleChange} required placeholder="홍길동" className={INPUT_CLS} />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">연락처 <span className="text-red-500">*</span></label>
            <input name="phone" value={form.phone} onChange={handleChange} required placeholder="010-0000-0000" className={INPUT_CLS} />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-ink mb-1">반려동물 이름</label>
              <input name="petName" value={form.petName} onChange={handleChange} placeholder="뭉치" className={INPUT_CLS} />
            </div>
            <div className="w-28">
              <label className="block text-sm font-medium text-ink mb-1">종</label>
              <select name="species" value={form.species} onChange={handleChange} className={INPUT_CLS}>
                <option value="dog">강아지</option>
                <option value="cat">고양이</option>
                <option value="other">기타</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-ink mb-1">희망 날짜 <span className="text-red-500">*</span></label>
              <input type="date" name="date" value={form.date} onChange={handleChange} required className={INPUT_CLS} />
            </div>
            <div className="w-32">
              <label className="block text-sm font-medium text-ink mb-1">희망 시간</label>
              <select name="time" value={form.time} onChange={handleChange} className={INPUT_CLS}>
                <option value="">선택</option>
                {['09:00','10:00','11:00','13:00','14:00','15:00','16:00','17:00'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">방문 사유</label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              rows={3}
              placeholder="예: 정기 검진, 예방접종, 피부 트러블 등"
              className={`${INPUT_CLS} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand text-ink py-3 rounded-xl font-semibold hover:bg-brand-dark transition-colors shadow-warm-xs"
          >
            예약 신청
          </button>
        </form>
      </div>
    </div>
  )
}
