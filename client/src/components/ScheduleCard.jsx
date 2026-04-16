import { getSchedules } from '../utils/scheduleRules'

export default function ScheduleCard({ species, records }) {
  const schedules = getSchedules(species, records)

  if (schedules.length === 0) return null

  return (
    <div>
      <h2>다음 접종 일정</h2>
      <ul>
        {schedules.map((s) => (
          <li key={s.item}>
            {s.item} — {s.nextDate}
            <span style={{ color: '#888', fontSize: '0.85em' }}> (마지막: {s.lastDate})</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
