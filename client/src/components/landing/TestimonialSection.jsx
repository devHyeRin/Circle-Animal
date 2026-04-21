const REVIEWS = [
  {
    name: '박소연 님',
    pet: '말티즈 · 뭉치 (7세)',
    rating: 5,
    text: '처음 방문했는데 원장님이 진단 결과를 정말 꼼꼼하게 설명해 주셨어요. 과잉 진료 없이 꼭 필요한 것만 진행해 주셔서 신뢰가 갔습니다. 이제 단골이 됐어요.',
  },
  {
    name: '이준혁 님',
    pet: '코리안숏헤어 · 나비 (3세)',
    rating: 5,
    text: '고양이 전용 대기 공간이 있어서 스트레스를 덜 받더라고요. 야간에 갑자기 호흡이 이상해서 전화했는데 바로 와도 된다고 해서 정말 다행이었습니다.',
  },
  {
    name: '김지현 님',
    pet: '포메라니안 · 솜이 (2세)',
    rating: 5,
    text: '예방접종 시기마다 알림을 보내줘서 한 번도 놓친 적이 없어요. 온라인 예약도 빠르고 간편하고, 대기 없이 진료받을 수 있어서 너무 좋아요.',
  },
  {
    name: '정하윤 님',
    pet: '믹스견 · 콩이 (5세)',
    rating: 5,
    text: '슬개골 수술이 걱정됐는데 수의사 선생님이 수술 전후 과정을 사진까지 보여주시며 설명해 주셨어요. 회복도 빠르고 지금은 씩씩하게 잘 뛰어다녀요.',
  },
  {
    name: '최민준 님',
    pet: '러시안블루 · 달이 (4세)',
    rating: 5,
    text: '진료비가 투명하게 공개되고, 진행 전에 꼭 동의를 구해주셔서 믿음이 갑니다. 다른 병원에서 해결 못 한 피부 문제를 여기서 드디어 해결했어요.',
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-yellow-400 text-sm">★</span>
      ))}
    </div>
  )
}

export default function TestimonialSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">보호자 후기</h2>
          <p className="text-gray-500 text-lg">직접 다녀오신 보호자분들의 이야기입니다.</p>
        </div>

        {/* 카드 스크롤 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col"
            >
              <Stars count={r.rating} />
              <p className="text-sm text-gray-700 leading-relaxed mt-3 flex-1">"{r.text}"</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-900">{r.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{r.pet}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 총합 지표 */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-600">4.9</p>
            <p className="text-sm text-gray-400 mt-1">평균 평점</p>
          </div>
          <div className="hidden sm:block w-px h-10 bg-gray-200" />
          <div>
            <p className="text-3xl font-bold text-blue-600">1,200+</p>
            <p className="text-sm text-gray-400 mt-1">누적 후기</p>
          </div>
          <div className="hidden sm:block w-px h-10 bg-gray-200" />
          <div>
            <p className="text-3xl font-bold text-blue-600">92%</p>
            <p className="text-sm text-gray-400 mt-1">재방문율</p>
          </div>
        </div>
      </div>
    </section>
  )
}
