import { useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useStorage } from '../hooks/useStorage'
import { generateReport } from '../utils/reportGenerator'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl px-6 py-5 shadow-warm-xs border border-warm-border">
      <h2 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">{title}</h2>
      {children}
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm py-1">
      <span className="text-ink-muted">{label}</span>
      <span className="text-ink font-medium">{value}</span>
    </div>
  )
}

export default function Report() {
  const { petId } = useParams()
  const navigate = useNavigate()
  const { items: pets } = useStorage('pets')
  const { items: allRecords } = useStorage('records')
  const reportRef = useRef(null)

  const pet = pets.find((p) => p.id === petId)
  const records = allRecords.filter((r) => r.petId === petId)

  if (!pet) return (
    <div className="min-h-screen bg-beige flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-10 text-center border border-warm-border shadow-warm-sm max-w-sm w-full">
        <p className="text-ink-sub mb-4">반려동물을 찾을 수 없습니다.</p>
        <button
          onClick={() => navigate('/my')}
          className="bg-brand text-ink px-6 py-2 rounded-xl font-semibold hover:bg-brand-dark transition-colors"
        >
          목록으로
        </button>
      </div>
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
    <div className="min-h-screen bg-beige py-6 px-4">
      <div className="max-w-2xl mx-auto">

        {/* 상단 액션 바 */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(`/my/pets/${petId}`)}
            className="text-sm text-ink-sub hover:text-ink transition-colors"
          >
            ← 뒤로
          </button>
          <button
            onClick={handleDownloadPdf}
            className="bg-brand text-ink text-sm font-semibold px-4 py-2 rounded-xl hover:bg-brand-dark transition-colors shadow-warm-xs"
          >
            PDF 다운로드
          </button>
        </div>

        <div ref={reportRef} className="space-y-4 bg-beige pb-4">

          {/* 헤더 */}
          <div className="bg-white rounded-2xl px-6 py-5 shadow-warm-xs border border-warm-border">
            <h1 className="text-2xl font-bold text-ink">{report.pet.name} 건강 리포트</h1>
            <p className="text-sm text-ink-muted mt-1">생성일: {report.generatedAt}</p>
          </div>

          {/* 기본 정보 */}
          <Card title="반려동물 정보">
            <Row label="종" value={`${report.pet.species}${report.pet.breed ? ` · ${report.pet.breed}` : ''}`} />
            <Row label="생년월일" value={`${report.pet.birthDate} (${report.pet.age})`} />
            {report.pet.gender && (
              <Row label="성별" value={`${report.pet.gender}${report.pet.neutered ? ' · 중성화' : ''}`} />
            )}
          </Card>

          {/* 건강 이력 요약 */}
          <Card title="건강 이력 요약">
            <p className="text-ink-sub leading-relaxed">{report.summary}</p>
            {report.nextVisit && (
              <p className="mt-2 text-sm text-accent-dark font-medium">다음 예약일: {report.nextVisit}</p>
            )}
          </Card>

          {/* 접종 현황 */}
          {report.schedules.length > 0 && (
            <Card title="접종 현황">
              <ul className="space-y-2">
                {report.schedules.map((s) => (
                  <li key={s.item} className="flex justify-between text-sm">
                    <span className="font-medium text-ink">{s.item}</span>
                    <span className="text-ink-sub">마지막 {s.lastDate} → 다음 {s.nextDate}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* 최근 진료 기록 */}
          {report.recentRecords.length > 0 && (
            <Card title="최근 진료 기록">
              <ul className="space-y-3">
                {report.recentRecords.map((r) => (
                  <li key={r.id} className="border-b border-warm-border pb-3 last:border-0 last:pb-0">
                    <p className="text-sm font-medium text-ink">{r.date}</p>
                    <p className="text-sm text-ink-sub">{r.items.join(', ')}</p>
                    {(r.hospital || r.cost) && (
                      <p className="text-xs text-ink-muted mt-0.5">
                        {[r.hospital, r.cost && `${r.cost.toLocaleString()}원`].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* 특이사항 */}
          {report.memos.length > 0 && (
            <Card title="특이사항 및 메모">
              <ul className="space-y-2">
                {report.memos.map((m, i) => (
                  <li key={i} className="text-sm">
                    <span className="text-ink-muted mr-2">{m.date}</span>
                    <span className="text-ink-sub">{m.memo}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

        </div>
      </div>
    </div>
  )
}
