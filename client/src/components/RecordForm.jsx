import { useState } from 'react'

const EMPTY = { date: '', items: '', hospital: '', cost: '', nextVisitDate: '', memo: '' }

const INPUT_CLS = 'w-full border border-warm-border rounded-xl px-4 py-2.5 text-sm bg-white text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors'

export default function RecordForm({ petId, onSave, onCancel }) {
  const [form, setForm] = useState(EMPTY)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const items = form.items.split(',').map((s) => s.trim()).filter(Boolean)
    if (!form.date || items.length === 0) return
    onSave({
      id: crypto.randomUUID(),
      petId,
      date: form.date,
      items,
      hospital: form.hospital.trim() || null,
      cost: form.cost ? Number(form.cost) : null,
      nextVisitDate: form.nextVisitDate || null,
      memo: form.memo.trim() || null,
      createdAt: new Date().toISOString(),
    })
    setForm(EMPTY)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <label className="block text-sm font-medium text-ink mb-1">날짜 <span className="text-red-500">*</span></label>
        <input name="date" type="date" value={form.date} onChange={handleChange} required className={INPUT_CLS} />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink mb-1">진료·접종 항목 <span className="text-red-500">*</span></label>
        <input
          name="items"
          value={form.items}
          onChange={handleChange}
          placeholder="쉼표로 구분 (예: 종합백신, 심장사상충)"
          required
          className={INPUT_CLS}
        />
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-ink mb-1">병원명</label>
          <input name="hospital" value={form.hospital} onChange={handleChange} placeholder="예: 서울동물병원" className={INPUT_CLS} />
        </div>
        <div className="w-32">
          <label className="block text-sm font-medium text-ink mb-1">비용 (원)</label>
          <input name="cost" type="number" value={form.cost} onChange={handleChange} placeholder="0" min="0" className={INPUT_CLS} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-ink mb-1">재방문 예정일</label>
        <input name="nextVisitDate" type="date" value={form.nextVisitDate} onChange={handleChange} className={INPUT_CLS} />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink mb-1">메모</label>
        <textarea
          name="memo"
          value={form.memo}
          onChange={handleChange}
          placeholder="특이사항, 처방 내용 등"
          rows={3}
          className={`${INPUT_CLS} resize-none`}
        />
      </div>
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="flex-1 bg-brand text-ink text-sm font-semibold py-2.5 rounded-xl hover:bg-brand-dark transition-colors"
        >
          저장
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border border-warm-border text-ink-sub text-sm font-medium py-2.5 rounded-xl hover:bg-beige transition-colors"
        >
          취소
        </button>
      </div>
    </form>
  )
}
