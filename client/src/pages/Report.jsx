import { useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useStorage } from '../hooks/useStorage'
import { generateReport } from '../utils/reportGenerator'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default function Report() {
  const { petId } = useParams()
  const navigate = useNavigate()
  const { items: pets } = useStorage('pets')
  const { items: allRecords } = useStorage('records')
  const reportRef = useRef(null)

  const pet = pets.find((p) => p.id === petId)
  const records = allRecords.filter((r) => r.petId === petId)

  if (!pet) return (
    <div>
      <p>반려동물을 찾을 수 없습니다.</p>
      <button onClick={() => navigate('/')}>홈으로</button>
    </div>
  )

  const report = generateReport(pet, records)

  async function handleDownloadPdf() {
    const el = reportRef.current
    if (!el) return
    const canvas = await html2canvas(el, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ unit: 'px', format: [canvas.width / 2, canvas.height / 2] })
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2)
    pdf.save(`${pet.name}_health_report_${report.generatedAt}.pdf`)
  }

  return (
    <div>
      <button onClick={() => navigate(`/pets/${petId}`)}>← 뒤로</button>
      <button onClick={handleDownloadPdf} style={{ marginLeft: 8 }}>PDF 다운로드</button>

      <div ref={reportRef} style={{ padding: 16 }}>
        <h1>{report.pet.name} 건강 리포트</h1>
        <p style={{ color: '#888' }}>생성일: {report.generatedAt}</p>

        {/* 기본 정보 */}
        <section>
          <h2>반려동물 정보</h2>
          <p>종: {report.pet.species}{report.pet.breed ? ` · ${report.pet.breed}` : ''}</p>
          <p>생년월일: {report.pet.birthDate} ({report.pet.age})</p>
          {report.pet.gender && <p>성별: {report.pet.gender}{report.pet.neutered ? ' · 중성화' : ''}</p>}
        </section>

        {/* 전체 요약 */}
        <section>
          <h2>건강 이력 요약</h2>
          <p>{report.summary}</p>
          {report.nextVisit && <p>다음 예약일: {report.nextVisit}</p>}
        </section>

        {/* 접종 일정 */}
        {report.schedules.length > 0 && (
          <section>
            <h2>접종 현황</h2>
            <ul>
              {report.schedules.map((s) => (
                <li key={s.item}>{s.item} — 마지막 {s.lastDate} / 다음 {s.nextDate}</li>
              ))}
            </ul>
          </section>
        )}

        {/* 최근 진료 기록 */}
        {report.recentRecords.length > 0 && (
          <section>
            <h2>최근 진료 기록</h2>
            <ul>
              {report.recentRecords.map((r) => (
                <li key={r.id}>
                  {r.date} · {r.items.join(', ')}
                  {r.hospital && ` · ${r.hospital}`}
                  {r.cost && ` · ${r.cost.toLocaleString()}원`}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 특이사항 */}
        {report.memos.length > 0 && (
          <section>
            <h2>특이사항 및 메모</h2>
            <ul>
              {report.memos.map((m, i) => (
                <li key={i}>{m.date} — {m.memo}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
