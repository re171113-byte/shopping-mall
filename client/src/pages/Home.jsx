import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import ProductCard from '../components/ProductCard'

// 프로모션 배너 데이터 (30-40대 여성 선호 무드)
const banners = [
  {
    id: 1,
    link: '/category/sale',
    bgGradient: 'linear-gradient(135deg, #3D3D3D 0%, #5A5A5A 50%, #4A4A4A 100%)',
    title: '시즌 오프 컬렉션',
    subtitle: 'WINTER FINAL SALE',
    highlight: 'UP TO 70%',
    highlightSub: 'OFF',
    badge: 'SALE',
    cardGradient: 'linear-gradient(135deg, #C9A96E 0%, #B8860B 100%)'
  },
  {
    id: 2,
    link: '/category/new',
    bgGradient: 'linear-gradient(135deg, #8B4557 0%, #6B3344 100%)',
    title: '신규 회원 웰컴 기프트',
    subtitle: '첫 구매 특별 혜택',
    highlight: '15%',
    highlightSub: 'WELCOME',
    badge: 'NEW',
    cardGradient: 'linear-gradient(135deg, #E8D5D5 0%, #C4A4A4 100%)'
  },
  {
    id: 3,
    link: '/category/outer',
    bgGradient: 'linear-gradient(135deg, #B8A99A 0%, #8B7355 100%)',
    title: '프리미엄 아우터',
    subtitle: '캐시미어 & 울 코트',
    highlight: 'OUTER',
    highlightSub: 'COLLECTION',
    badge: 'PREMIUM',
    cardGradient: 'linear-gradient(135deg, #D4C4B0 0%, #A89680 100%)'
  },
  {
    id: 4,
    link: '/category/brand',
    bgGradient: 'linear-gradient(135deg, #3D4F5F 0%, #2D3E4E 100%)',
    title: '디자이너 브랜드 위크',
    subtitle: 'THEORY · COS · SANDRO',
    highlight: '20%',
    highlightSub: 'EXTRA',
    badge: 'BRAND',
    cardGradient: 'linear-gradient(135deg, #A8B5A0 0%, #8A9B82 100%)'
  },
  {
    id: 5,
    link: '/category/quick',
    bgGradient: 'linear-gradient(135deg, #C4A4A4 0%, #A08080 100%)',
    title: '오늘 출발 상품',
    subtitle: '빠른 배송 서비스',
    highlight: '오늘출발',
    highlightSub: 'EXPRESS',
    badge: 'QUICK',
    cardGradient: 'linear-gradient(135deg, #F5F2ED 0%, #E8E2D9 100%)'
  },
]

// 카테고리 아이콘 컴포넌트 (30-40대 여성 취향 - 세련된 미니멀 스타일)
const CategoryIcons = {
  outer: () => (
    <svg viewBox="0 0 48 48" className="w-11 h-11">
      {/* 트렌치코트 - 카멜/베이지 톤 */}
      <path d="M14 14l-2 2v20l4 2h16l4-2V16l-2-2" fill="#D4C4B0" stroke="#A89680" strokeWidth="1.5"/>
      <path d="M14 14l10 4 10-4" fill="none" stroke="#A89680" strokeWidth="1.5"/>
      <path d="M24 18v20" stroke="#A89680" strokeWidth="1.5"/>
      <circle cx="21" cy="24" r="1.2" fill="#8B7355"/>
      <circle cx="21" cy="30" r="1.2" fill="#8B7355"/>
      <path d="M14 14v-4h6l4 4 4-4h6v4" fill="#D4C4B0" stroke="#A89680" strokeWidth="1.5"/>
    </svg>
  ),
  top: () => (
    <svg viewBox="0 0 48 48" className="w-11 h-11">
      {/* 블라우스 - 아이보리/크림 톤 */}
      <path d="M16 12l-6 6v18h28V18l-6-6" fill="#F5F0E8" stroke="#C9B99A" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M16 12c0 0 2 4 8 4s8-4 8-4" fill="none" stroke="#C9B99A" strokeWidth="1.5"/>
      <path d="M20 20v6M28 20v6" stroke="#C9B99A" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="24" cy="18" r="1" fill="#C9B99A"/>
    </svg>
  ),
  pants: () => (
    <svg viewBox="0 0 48 48" className="w-11 h-11">
      {/* 슬랙스 - 네이비/차콜 톤 */}
      <path d="M15 10h18v4H15z" fill="#4A5568" stroke="#2D3748" strokeWidth="1.5"/>
      <path d="M15 14l3 26h5l1-20 1 20h5l3-26H15z" fill="#4A5568" stroke="#2D3748" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M18 14v4M30 14v4" stroke="#2D3748" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  ),
  dress: () => (
    <svg viewBox="0 0 48 48" className="w-11 h-11">
      {/* 원피스 - 버건디/와인 톤 */}
      <path d="M20 8h8v4l4 4-4 2v20H20V18l-4-2 4-4V8z" fill="#8B4557" stroke="#6B3344" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20 18h8" stroke="#6B3344" strokeWidth="1"/>
      <ellipse cx="24" cy="12" rx="3" ry="2" fill="none" stroke="#6B3344" strokeWidth="1"/>
    </svg>
  ),
  skirt: () => (
    <svg viewBox="0 0 48 48" className="w-11 h-11">
      {/* 스커트 - 더스티 로즈 톤 */}
      <path d="M16 12h16v4l4 22H12l4-22v-4z" fill="#D4A5A5" stroke="#B38B8B" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M16 16h16" stroke="#B38B8B" strokeWidth="1.5"/>
      <path d="M20 20v16M24 18v18M28 20v16" stroke="#B38B8B" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  ),
  shoes: () => (
    <svg viewBox="0 0 48 48" className="w-11 h-11">
      {/* 힐 - 블랙/골드 톤 */}
      <path d="M8 28l6-8h12l8 4v4l-2 8H12l-4-8z" fill="#2D2D2D" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M32 28v10" stroke="#1A1A1A" strokeWidth="3"/>
      <path d="M12 32h16" stroke="#C9A96E" strokeWidth="1.5"/>
    </svg>
  ),
  bag: () => (
    <svg viewBox="0 0 48 48" className="w-11 h-11">
      {/* 숄더백 - 탄/브라운 톤 */}
      <rect x="12" y="18" width="24" height="18" rx="2" fill="#C4A484" stroke="#8B7355" strokeWidth="1.5"/>
      <path d="M16 18v-4c0-2.2 3.6-4 8-4s8 1.8 8 4v4" fill="none" stroke="#8B7355" strokeWidth="2" strokeLinecap="round"/>
      <rect x="20" y="24" width="8" height="2" rx="1" fill="#8B7355"/>
      <circle cx="24" cy="30" r="2" fill="none" stroke="#8B7355" strokeWidth="1.5"/>
    </svg>
  ),
  jewelry: () => (
    <svg viewBox="0 0 48 48" className="w-11 h-11">
      {/* 주얼리 - 골드 톤 */}
      <circle cx="24" cy="28" r="8" fill="none" stroke="#C9A96E" strokeWidth="2"/>
      <circle cx="24" cy="28" r="4" fill="#E8D5A3" stroke="#C9A96E" strokeWidth="1"/>
      <path d="M24 8v12" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="24" cy="8" r="3" fill="#E8D5A3" stroke="#C9A96E" strokeWidth="1.5"/>
    </svg>
  ),
  acc: () => (
    <svg viewBox="0 0 48 48" className="w-11 h-11">
      {/* 스카프 - 실크 블루/그레이 톤 */}
      <path d="M12 16c4 0 8-4 12-4s8 4 12 4c0 8-4 20-12 20S12 24 12 16z" fill="#B8C5D6" stroke="#8A9BB3" strokeWidth="1.5"/>
      <path d="M16 18c2 0 4-2 8-2s6 2 8 2" fill="none" stroke="#8A9BB3" strokeWidth="1"/>
      <path d="M18 24c2 0 3-1 6-1s4 1 6 1" fill="none" stroke="#8A9BB3" strokeWidth="1"/>
    </svg>
  ),
  beauty: () => (
    <svg viewBox="0 0 48 48" className="w-11 h-11">
      {/* 립스틱 - 로즈/핑크 톤 */}
      <rect x="18" y="22" width="12" height="16" rx="2" fill="#2D2D2D" stroke="#1A1A1A" strokeWidth="1.5"/>
      <path d="M20 22v-6l4-6 4 6v6" fill="#C45C6A" stroke="#A34455" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="20" y="26" width="8" height="10" rx="1" fill="#3D3D3D"/>
      <path d="M22 10l2-2 2 2" fill="none" stroke="#A34455" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
}

const categories = [
  { id: 'outer', label: '아우터' },
  { id: 'top', label: '상의' },
  { id: 'pants', label: '팬츠' },
  { id: 'dress', label: '원피스' },
  { id: 'skirt', label: '스커트' },
  { id: 'shoes', label: '신발' },
  { id: 'bag', label: '가방' },
  { id: 'jewelry', label: '주얼리' },
  { id: 'acc', label: '패션소품' },
  { id: 'beauty', label: '뷰티' },
]

// 추천 상품 데이터 (Unsplash 무료 이미지)
const recommendedProducts = [
  { id: 1, name: '오버핏 울 블렌드 코트', brand: 'MARNI', price: 289000, salePrice: 199000, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=300&h=400&fit=crop', isNew: true, isFreeShipping: true },
  { id: 2, name: '캐시미어 니트 가디건', brand: 'THEORY', price: 185000, salePrice: null, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=400&fit=crop', isNew: false, isFreeShipping: true },
  { id: 3, name: '하이웨이스트 와이드 팬츠', brand: 'COS', price: 129000, salePrice: 89000, image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=300&h=400&fit=crop', isNew: true, isFreeShipping: false },
  { id: 4, name: '실크 블라우스', brand: 'SANDRO', price: 245000, salePrice: 179000, image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=300&h=400&fit=crop', isNew: false, isFreeShipping: true },
  { id: 5, name: '램스킨 숄더백', brand: 'MAJE', price: 398000, salePrice: null, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=400&fit=crop', isNew: true, isFreeShipping: true },
  { id: 6, name: '미니멀 롱 원피스', brand: 'MAX MARA', price: 520000, salePrice: 390000, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop', isNew: false, isFreeShipping: true },
]

// 빠른배송 상품 데이터 (Unsplash 무료 이미지)
const quickDeliveryProducts = [
  { id: 7, name: '데일리 코튼 티셔츠', brand: 'ZARA', price: 39000, salePrice: 29000, image: 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=300&h=400&fit=crop', isQuickDelivery: true },
  { id: 8, name: '슬림핏 스트레이트 진', brand: 'MANGO', price: 79000, salePrice: 59000, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop', isQuickDelivery: true },
  { id: 9, name: '린넨 블렌드 재킷', brand: 'MASSIMO DUTTI', price: 189000, salePrice: null, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop', isQuickDelivery: true },
  { id: 10, name: '레더 플랫 슈즈', brand: 'COLE HAAN', price: 198000, salePrice: 149000, image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&h=400&fit=crop', isQuickDelivery: true },
]

// 인기 브랜드 데이터 (텍스트 로고 사용)
const topBrands = [
  { id: 1, name: 'THEORY', logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop' },
  { id: 2, name: 'COS', logo: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=80&h=80&fit=crop' },
  { id: 3, name: 'SANDRO', logo: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=80&h=80&fit=crop' },
  { id: 4, name: 'MAJE', logo: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=80&h=80&fit=crop' },
  { id: 5, name: 'MAX MARA', logo: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=80&h=80&fit=crop' },
]

// 전체 상품 데이터
const allProducts = [
  { id: 11, name: '트위드 크롭 재킷', brand: 'SANDRO', price: 358000, salePrice: 268000, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=400&fit=crop', isNew: true, isFreeShipping: true },
  { id: 12, name: '플리츠 미디 스커트', brand: 'COS', price: 129000, salePrice: null, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop', isNew: false, isFreeShipping: true },
  { id: 13, name: '캐시미어 머플러', brand: 'THEORY', price: 198000, salePrice: 158000, image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=300&h=400&fit=crop', isNew: false, isFreeShipping: true },
  { id: 14, name: '앵클부츠', brand: 'STUART WEITZMAN', price: 498000, salePrice: 398000, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=300&h=400&fit=crop', isNew: true, isFreeShipping: true },
  { id: 15, name: '퀼팅 체인백', brand: 'MAJE', price: 328000, salePrice: null, image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=300&h=400&fit=crop', isNew: false, isFreeShipping: false },
  { id: 16, name: '울 블렌드 베스트', brand: 'MAX MARA', price: 278000, salePrice: 218000, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=400&fit=crop', isNew: true, isFreeShipping: true },
  { id: 17, name: '새틴 블라우스', brand: 'EQUIPMENT', price: 245000, salePrice: 195000, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&h=400&fit=crop', isNew: false, isFreeShipping: true },
  { id: 18, name: '와이드 데님 팬츠', brand: 'AGOLDE', price: 298000, salePrice: null, image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=300&h=400&fit=crop', isNew: true, isFreeShipping: true },
]

function Home() {
  const navigate = useNavigate()
  const [currentSet, setCurrentSet] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // 6개 상품을 3개씩 2세트로 나눔
  const recommendSets = [
    recommendedProducts.slice(0, 3),
    recommendedProducts.slice(3, 6),
  ]

  // 3초마다 페이드 인/아웃으로 세트 전환
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentSet((prev) => (prev + 1) % 2)
        setIsVisible(true)
      }, 300)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-surface min-h-screen">
      {/* Header */}
      <header className="sticky top-0 bg-cream z-20 px-4 py-3 border-b border-stone-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary tracking-wide">STYLISH</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/search')} className="p-2 text-primary">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button onClick={() => navigate('/cart')} className="p-2 text-primary relative">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Banner Carousel */}
      <section className="bg-white relative group">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className}" style="background: white;"></span>`
            }
          }}
          navigation={{
            prevEl: '.banner-prev',
            nextEl: '.banner-next',
          }}
          loop
          className="aspect-[4/3] sm:aspect-[16/9]"
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={banner.id}>
              <Link
                to={banner.link}
                className="block w-full h-full relative overflow-hidden"
                style={{ background: banner.bgGradient }}
              >
                {/* 배경 장식 */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/5 rounded-full" />
                  <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-white/5 rounded-full" />
                  <div className="absolute top-1/3 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl" />
                </div>

                {/* 컨텐츠 */}
                <div className="relative h-full flex items-center justify-between px-8 py-10">
                  <div className="flex-1 z-10">
                    {/* 뱃지 */}
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full mb-3">
                      {banner.badge}
                    </span>
                    {/* 타이틀 */}
                    <h2 className="text-white text-2xl sm:text-3xl font-bold mb-2 leading-tight">
                      {banner.title}
                    </h2>
                    <p className="text-white/80 text-base">
                      {banner.subtitle}
                    </p>
                    {/* CTA 버튼 */}
                    <button className="mt-4 px-5 py-2 bg-white text-gray-900 text-sm font-bold rounded-full hover:bg-gray-100 transition-colors">
                      자세히 보기 →
                    </button>
                  </div>

                  {/* 할인 카드 */}
                  <div className="relative z-10">
                    <div
                      className="w-28 h-36 sm:w-32 sm:h-40 rounded-2xl shadow-2xl flex flex-col items-center justify-center transform rotate-6 hover:rotate-0 transition-all duration-300 hover:scale-105"
                      style={{ background: banner.cardGradient }}
                    >
                      <div className="relative text-center">
                        <span className="block text-white/90 text-xs font-medium mb-1 drop-shadow">{banner.badge}</span>
                        <span className="block text-white text-3xl sm:text-4xl font-black leading-none drop-shadow-lg">{banner.highlight}</span>
                        <span className="block text-white text-sm font-bold mt-1 drop-shadow">{banner.highlightSub}</span>
                      </div>
                    </div>
                    {/* 빛 효과 */}
                    <div className="absolute -inset-6 bg-white/20 rounded-full blur-3xl -z-10" />
                    <div className="absolute -inset-2 bg-amber-200/30 rounded-full blur-xl -z-10" />
                  </div>
                </div>

                {/* 페이지 인디케이터 */}
                <div className="absolute bottom-4 right-4 bg-black/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                  {index + 1} / {banners.length}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 커스텀 네비게이션 버튼 */}
        <button className="banner-prev absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
          <svg className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="banner-next absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
          <svg className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* Categories */}
      <section className="bg-cream mt-2 px-2 py-4">
        <div className="grid grid-cols-5 gap-y-3">
          {categories.map((cat) => {
            const IconComponent = CategoryIcons[cat.id]
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="flex flex-col items-center gap-1 transition-transform active:scale-95"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-surface shadow-sm">
                  {IconComponent && <IconComponent />}
                </div>
                <span className="text-[11px] text-primary font-medium">{cat.label}</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* AI Recommended Products - 3개씩 페이드 인/아웃 */}
      <section className="bg-cream mt-2 py-4">
        <div className="px-4 mb-3 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-primary">회원님을 위한 추천</h2>
            <p className="text-xs text-secondary mt-1">
              AI가 취향을 분석해 추천해드려요
            </p>
          </div>
          <div className="flex gap-1">
            {[0, 1].map((idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSet === idx ? 'bg-gold' : 'bg-stone-300'
                }`}
              />
            ))}
          </div>
        </div>
        <div
          className={`grid grid-cols-3 gap-2 px-4 transition-opacity duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {recommendSets[currentSet].map((product) => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
      </section>

      {/* Brand Ranking */}
      <section className="bg-cream mt-2 py-4">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="font-bold text-primary">인기 브랜드</h2>
          <Link to="/category/brand" className="text-sm text-gold">
            전체보기
          </Link>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 px-4">
            {topBrands.map((brand, index) => (
              <Link
                key={brand.id}
                to={`/category/brand/${brand.id}`}
                className="flex-shrink-0 flex flex-col items-center gap-2"
              >
                <div className="relative">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-stone-200"
                  />
                  <span className="absolute -top-1 -left-1 w-5 h-5 bg-gold text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {index + 1}
                  </span>
                </div>
                <span className="text-xs text-primary">{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Delivery Section */}
      <section className="bg-cream mt-2 py-4">
        <div className="flex items-center justify-between px-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-gold font-bold">EXPRESS</span>
            <h2 className="font-bold text-primary">빠른배송</h2>
            <span className="text-xs text-secondary">오늘 출발</span>
          </div>
          <Link to="/category/quick" className="text-sm text-gold">
            더보기
          </Link>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 px-4">
            {quickDeliveryProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-36">
                <ProductCard product={product} compact />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="bg-cream mt-2 py-4">
        <div className="px-4 mb-3">
          <h2 className="font-bold text-primary">추천 상품</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 px-4">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Load More (Infinite Scroll placeholder) */}
      <div className="py-8 text-center text-secondary text-sm">
        스크롤하여 더 많은 상품 보기
      </div>
    </div>
  )
}

export default Home
