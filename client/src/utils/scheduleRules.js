// 규칙 추가 시 여기에 species 키와 항목명 키워드를 추가
const RULES = {
  dog: {
    종합백신: 365,
    DHPPL: 365,
    코로나: 365,
    켄넬코프: 180,
    광견병: 365,
    심장사상충: 30,
    외부기생충: 30,
  },
  cat: {
    종합백신: 365,
    FVRCP: 365,
    광견병: 365,
    심장사상충: 30,
  },
}

function addDays(dateStr, days) {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

function findRule(species, itemName) {
  const speciesRules = RULES[species]
  if (!speciesRules) return null
  const key = Object.keys(speciesRules).find(
    (k) => itemName.includes(k) || k.includes(itemName)
  )
  return key ? speciesRules[key] : null
}

/**
 * @param {'dog'|'cat'} species
 * @param {string} itemName  진료/접종 항목명
 * @param {string} lastDate  마지막 접종일 (YYYY-MM-DD)
 * @returns {string|null}    다음 권장일 (YYYY-MM-DD) or null
 */
export function getNextVaccinationDate(species, itemName, lastDate) {
  const intervalDays = findRule(species, itemName)
  if (intervalDays === null) return null
  return addDays(lastDate, intervalDays)
}

/**
 * 기록 배열에서 항목별 최신 날짜를 찾아 다음 접종 스케줄 목록 반환
 * @param {'dog'|'cat'} species
 * @param {{ date: string, items: string[] }[]} records
 * @returns {{ item: string, lastDate: string, nextDate: string }[]}
 */
export function getSchedules(species, records) {
  const latestByItem = {}
  records.forEach((record) => {
    record.items.forEach((item) => {
      if (!latestByItem[item] || record.date > latestByItem[item]) {
        latestByItem[item] = record.date
      }
    })
  })

  return Object.entries(latestByItem)
    .map(([item, lastDate]) => ({
      item,
      lastDate,
      nextDate: getNextVaccinationDate(species, item, lastDate),
    }))
    .filter((s) => s.nextDate !== null)
    .sort((a, b) => a.nextDate.localeCompare(b.nextDate))
}
