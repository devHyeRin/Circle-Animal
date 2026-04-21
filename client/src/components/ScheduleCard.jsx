import { getSchedules } from '../utils/scheduleRules'

export default function ScheduleCard({ species, records }) {
  const schedules = getSchedules(species, records)

  if (schedules.length === 0) return null

  return (
    <div className="bg-white rounded-2xl px-6 py-5 shadow-warm-xs border border-warm-border">
      <h2 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">다음 접종 일정</h2>
      <ul className="space-y-2">
        {schedules.map((s) => (
          <li key={s.item} className="flex justify-between text-sm">
            <span className="font-medium text-ink">{s.item}</span>
            <span className="text-ink-sub">{s.nextDate}
              <span className="text-ink-muted ml-1">(마지막 {s.lastDate})</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
