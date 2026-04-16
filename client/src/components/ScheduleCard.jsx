import { getSchedules } from '../utils/scheduleRules'

export default function ScheduleCard({ species, records }) {
  const schedules = getSchedules(species, records)

  if (schedules.length === 0) return null

  return (
    <div className="bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100">
      <h2 className="text-base font-semibold text-gray-500 uppercase tracking-wide mb-3">다음 접종 일정</h2>
      <ul className="space-y-2">
        {schedules.map((s) => (
          <li key={s.item} className="flex justify-between text-sm">
            <span className="font-medium text-gray-800">{s.item}</span>
            <span className="text-gray-500">{s.nextDate}
              <span className="text-gray-300 ml-1">(마지막 {s.lastDate})</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
