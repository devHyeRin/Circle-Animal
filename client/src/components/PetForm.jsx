import { useState } from 'react'

const EMPTY = { name: '', species: 'dog', birthDate: '' }

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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="이름 *"
        required
      />
      <select name="species" value={form.species} onChange={handleChange}>
        <option value="dog">강아지</option>
        <option value="cat">고양이</option>
      </select>
      <input
        name="birthDate"
        type="date"
        value={form.birthDate}
        onChange={handleChange}
        required
      />
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit">저장</button>
        <button type="button" onClick={onCancel}>취소</button>
      </div>
    </form>
  )
}
