import { getSchedules } from './scheduleRules'

const SPECIES_LABEL = { dog: '강아지', cat: '고양이' }

function calcAge(birthDate) {
  const today = new Date()
  const birth = new Date(birthDate)
  let years = today.getFullYear() - birth.getFullYear()
  let months = today.getMonth() - birth.getMonth()
  if (months < 0) { years -= 1; months += 12 }
  return years > 0 ? `${years}세 ${months}개월` : `${months}개월`
}

/**
 * @param {object} pet
 * @param {object[]} records  MedicalRecord[]
 * @returns {object} 리포트 섹션 데이터
 */
export function generateReport(pet, records) {
  const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date))

  // 항목별 최근 날짜
  const itemLatest = {}
  records.forEach((r) => {
    r.items?.forEach((item) => {
      if (!itemLatest[item] || r.date > itemLatest[item]) itemLatest[item] = r.date
    })
  })

  // 메모 모음 (있는 것만)
  const memos = sorted.filter((r) => r.memo).map((r) => ({ date: r.date, memo: r.memo }))

  // 재방문일 중 가장 가까운 미래
  const today = new Date().toISOString().split('T')[0]
  const nextVisit = sorted
    .map((r) => r.nextVisitDate)
    .filter((d) => d && d >= today)
    .sort()[0] ?? null

  const schedules = getSchedules(pet.species, records)

  return {
    generatedAt: today,
    pet: {
      name: pet.name,
      species: SPECIES_LABEL[pet.species] ?? pet.species,
      breed: pet.breed || null,
      birthDate: pet.birthDate,
      age: calcAge(pet.birthDate),
      gender: pet.gender === 'male' ? '수컷' : pet.gender === 'female' ? '암컷' : null,
      neutered: pet.neutered ?? null,
    },
    summary: buildSummary(pet, records, sorted, schedules),
    recentRecords: sorted.slice(0, 5),
    schedules,
    memos,
    nextVisit,
  }
}

function buildSummary(pet, records, sorted, schedules) {
  if (records.length === 0) return `${pet.name}의 진료 기록이 없습니다.`

  const first = sorted[sorted.length - 1].date
  const last = sorted[0].date
  const overdue = schedules.filter((s) => {
    const today = new Date().toISOString().split('T')[0]
    return s.nextDate <= today
  })

  let text = `${pet.name}은(는) ${first}부터 ${last}까지 총 ${records.length}건의 진료 기록이 있습니다.`
  if (overdue.length > 0) {
    text += ` 현재 ${overdue.map((s) => s.item).join(', ')} 접종이 지연되었거나 예정일이 도래했습니다.`
  } else if (schedules.length > 0) {
    text += ` 다음 접종 예정일은 ${schedules[0].nextDate}(${schedules[0].item})입니다.`
  }
  return text
}
