import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SPECIES_LABEL = { dog: '강아지', cat: '고양이', other: '기타' }

const NEXT_STEPS = [
  { step: '01', text: '담당자가 예약 내용을 확인합니다.' },
  { step: '02', text: '1시간 이내로 등록하신 번호로 연락드립니다.' },
  { step: '03', text: '확정된 날짜·시간에 내원해 주세요.' },
]

function ConfirmScreen({ form, onReset, navigate }) {
  const speciesLabel = SPECIES_LABEL[form.species] || form.species

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto space-y-4">

        {/* 완료 헤더 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            🐾
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">예약이 접수되었습니다</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            담당자 확인 후 <span className="font-medium text-gray-700">{form.phone}</span>으로<br />
            1시간 이내 연락드립니다.
          </p>
        </div>

        {/* 예약 정보 요약 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">예약 정보 확인</h3>
          <ul className="space-y-3">
            <li className="flex justify-between text-sm">
              <span className="text-gray-400">보호자</span>
              <span className="font-medium text-gray-800">{form.name}</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-gray-400">연락처</span>
              <span className="font-medium text-gray-800">{form.phone}</span>
            </li>
            {form.petName && (
              <li className="flex justify-between text-sm">
                <span className="text-gray-400">반려동물</span>
                <span className="font-medium text-gray-800">{form.petName} ({speciesLabel})</span>
              </li>
            )}
            <li className="flex justify-between text-sm">
              <span className="text-gray-400">희망 날짜</span>
              <span className="font-medium text-gray-800">{form.date}{form.time ? ` ${form.time}` : ''}</span>
            </li>
            {form.reason && (
              <li className="flex justify-between text-sm">
                <span className="text-gray-400">방문 사유</span>
                <span className="font-medium text-gray-800 text-right max-w-[60%]">{form.reason}</span>
              </li>
            )}
          </ul>
        </div>

        {/* 다음 단계 */}
        <div className="bg-blue-50 rounded-2xl px-6 py-5">
          <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-4">다음 단계</h3>
          <ul className="space-y-3">
            {NEXT_STEPS.map((s) => (
              <li key={s.step} className="flex gap-3 items-start">
                <span className="text-xs font-bold text-blue-300 mt-0.5 w-5 flex-shrink-0">{s.step}</span>
                <p className="text-sm text-blue-700">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* 연락처 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5">
          <p className="text-xs text-gray-400 mb-3">문의가 있으시면 직접 연락주세요.</p>
          <div className="flex gap-3">
            <a
              href="tel:0212345678"
              className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
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
            className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-sm"
          >
            추가 예약하기
          </button>
          <button
            onClick={() => navigate('/my')}
            className="flex-1 border border-blue-200 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors text-sm"
          >
            내 반려동물 보기
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm"
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
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">진료 예약</h1>
          <p className="text-gray-500 mt-1">아래 정보를 입력하시면 담당자가 확인 후 연락드립니다.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">보호자 이름 <span className="text-red-500">*</span></label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="홍길동"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">연락처 <span className="text-red-500">*</span></label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="010-0000-0000"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">반려동물 이름</label>
              <input
                name="petName"
                value={form.petName}
                onChange={handleChange}
                placeholder="뭉치"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-28">
              <label className="block text-sm font-medium text-gray-700 mb-1">종</label>
              <select
                name="species"
                value={form.species}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="dog">강아지</option>
                <option value="cat">고양이</option>
                <option value="other">기타</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">희망 날짜 <span className="text-red-500">*</span></label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-32">
              <label className="block text-sm font-medium text-gray-700 mb-1">희망 시간</label>
              <select
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">선택</option>
                {['09:00','10:00','11:00','13:00','14:00','15:00','16:00','17:00'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">방문 사유</label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              rows={3}
              placeholder="예: 정기 검진, 예방접종, 피부 트러블 등"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            예약 신청
          </button>
        </form>
      </div>
    </div>
  )
}
