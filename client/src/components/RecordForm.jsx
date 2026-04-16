import { useState } from 'react'

const EMPTY = { date: '', items: '', hospital: '', cost: '', nextVisitDate: '', memo: '' }

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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <input name="date" type="date" value={form.date} onChange={handleChange} required />
      <input
        name="items"
        value={form.items}
        onChange={handleChange}
        placeholder="진료·접종 항목 (쉼표로 구분) *"
        required
      />
      <input name="hospital" value={form.hospital} onChange={handleChange} placeholder="병원명" />
      <input name="cost" type="number" value={form.cost} onChange={handleChange} placeholder="비용 (원)" min="0" />
      <input name="nextVisitDate" type="date" value={form.nextVisitDate} onChange={handleChange} />
      <textarea name="memo" value={form.memo} onChange={handleChange} placeholder="메모" rows={3} />
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit">저장</button>
        <button type="button" onClick={onCancel}>취소</button>
      </div>
    </form>
  )
}
