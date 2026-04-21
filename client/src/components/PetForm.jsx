import { useState } from 'react'

const EMPTY = { name: '', species: 'dog', birthDate: '' }

const INPUT_CLS = 'w-full border border-warm-border rounded-xl px-4 py-2.5 text-sm bg-white text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors'

export default function PetForm({ onSave, onCancel }) {
  const [form, setForm] = useState(EMPTY)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.birthDate) return
    onSave({
      id: crypto.randomUUID(),
      name: form.name.trim(),
      species: form.species,
      birthDate: form.birthDate,
      createdAt: new Date().toISOString(),
    })
    setForm(EMPTY)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <label className="block text-sm font-medium text-ink mb-1">이름 <span className="text-red-500">*</span></label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="예: 뭉치"
          required
          className={INPUT_CLS}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink mb-1">종</label>
        <select name="species" value={form.species} onChange={handleChange} className={INPUT_CLS}>
          <option value="dog">강아지</option>
          <option value="cat">고양이</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-ink mb-1">생년월일 <span className="text-red-500">*</span></label>
        <input
          name="birthDate"
          type="date"
          value={form.birthDate}
          onChange={handleChange}
          required
          className={INPUT_CLS}
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
