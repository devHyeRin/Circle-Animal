import { useState, useCallback } from 'react'

export function useStorage(key) {
  const [items, setItems] = useState(() => {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  })

  const save = useCallback((item) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === item.id)
      const next =
        idx >= 0
          ? prev.map((i, j) => (j === idx ? item : i))
          : [...prev, item]
      localStorage.setItem(key, JSON.stringify(next))
      return next
    })
  }, [key])

  const remove = useCallback((id) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id)
      localStorage.setItem(key, JSON.stringify(next))
      return next
    })
  }, [key])

  return { items, save, remove }
}
