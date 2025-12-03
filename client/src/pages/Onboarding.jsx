import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/useStore'

const styleOptions = [
  { id: 'minimal', label: '미니멀', image: 'https://picsum.photos/seed/minimal/200' },
  { id: 'casual', label: '캐주얼', image: 'https://picsum.photos/seed/casual/200' },
  { id: 'elegant', label: '엘레강스', image: 'https://picsum.photos/seed/elegant/200' },
  { id: 'modern', label: '모던', image: 'https://picsum.photos/seed/modern/200' },
  { id: 'classic', label: '클래식', image: 'https://picsum.photos/seed/classic/200' },
  { id: 'natural', label: '내추럴', image: 'https://picsum.photos/seed/natural/200' },
  { id: 'romantic', label: '로맨틱', image: 'https://picsum.photos/seed/romantic/200' },
  { id: 'contemporary', label: '컨템포러리', image: 'https://picsum.photos/seed/contemporary/200' },
  { id: 'luxury', label: '럭셔리', image: 'https://picsum.photos/seed/luxury/200' },
  { id: 'trendy', label: '트렌디', image: 'https://picsum.photos/seed/trendy/200' },
]

function Onboarding() {
  const navigate = useNavigate()
  const setPreferences = useUserStore((state) => state.setPreferences)
  const [step, setStep] = useState(1)
  const [selectedStyles, setSelectedStyles] = useState([])
  const [priceRange, setPriceRange] = useState(null)

  const priceRanges = [
    { id: 'budget', label: '5만원 이하', min: 0, max: 50000 },
    { id: 'mid', label: '5~10만원', min: 50000, max: 100000 },
    { id: 'premium', label: '10~20만원', min: 100000, max: 200000 },
    { id: 'luxury', label: '20만원 이상', min: 200000, max: null },
  ]

  const toggleStyle = (styleId) => {
    if (selectedStyles.includes(styleId)) {
      setSelectedStyles(selectedStyles.filter((id) => id !== styleId))
    } else if (selectedStyles.length < 10) {
      setSelectedStyles([...selectedStyles, styleId])
    }
  }

  const handleNext = () => {
    if (step === 1 && selectedStyles.length >= 3) {
      setStep(2)
    } else if (step === 2 && priceRange) {
      setPreferences({ styles: selectedStyles, priceRange })
      navigate('/')
    }
  }

  const handleSkip = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 border-b">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">취향 설정</h1>
          <button onClick={handleSkip} className="text-secondary text-sm">
            건너뛰기
          </button>
        </div>
        <div className="flex gap-2 mt-3">
          <div className={`h-1 flex-1 rounded ${step >= 1 ? 'bg-primary' : 'bg-gray-200'}`} />
          <div className={`h-1 flex-1 rounded ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />
        </div>
      </div>

      {/* Step 1: Style Selection */}
      {step === 1 && (
        <div className="p-4">
          <h2 className="text-lg font-medium mb-2">선호하는 스타일을 선택해주세요</h2>
          <p className="text-secondary text-sm mb-6">
            3개 이상 선택하시면 맞춤 상품을 추천해드려요
          </p>

          <div className="grid grid-cols-2 gap-3">
            {styleOptions.map((style) => (
              <button
                key={style.id}
                onClick={() => toggleStyle(style.id)}
                className={`relative rounded-xl overflow-hidden aspect-square ${
                  selectedStyles.includes(style.id)
                    ? 'ring-2 ring-primary ring-offset-2'
                    : ''
                }`}
              >
                <img
                  src={style.image}
                  alt={style.label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                  <span className="text-white font-medium">{style.label}</span>
                </div>
                {selectedStyles.includes(style.id) && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Price Range */}
      {step === 2 && (
        <div className="p-4">
          <h2 className="text-lg font-medium mb-2">선호하는 가격대를 선택해주세요</h2>
          <p className="text-secondary text-sm mb-6">
            맞춤 상품 추천에 활용됩니다
          </p>

          <div className="space-y-3">
            {priceRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setPriceRange(range)}
                className={`w-full p-4 rounded-xl border text-left transition-colors ${
                  priceRange?.id === range.id
                    ? 'border-primary bg-gray-50'
                    : 'border-gray-200'
                }`}
              >
                <span className="text-base font-medium">{range.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto p-4 bg-white border-t">
        <button
          onClick={handleNext}
          disabled={
            (step === 1 && selectedStyles.length < 3) ||
            (step === 2 && !priceRange)
          }
          className={`btn-primary ${
            ((step === 1 && selectedStyles.length < 3) ||
            (step === 2 && !priceRange))
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
        >
          {step === 1
            ? `다음 (${selectedStyles.length}/3)`
            : '시작하기'}
        </button>
      </div>
    </div>
  )
}

export default Onboarding
