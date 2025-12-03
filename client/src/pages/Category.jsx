import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// 카테고리 데이터 (서브카테고리 이미지 포함)
const categories = [
  {
    id: 'outer',
    name: '아우터',
    subcategories: [
      { name: '가디건', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=120&h=120&fit=crop' },
      { name: '자켓', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=120&h=120&fit=crop' },
      { name: '집업/점퍼', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=120&h=120&fit=crop' },
      { name: '바람막이', image: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=120&h=120&fit=crop' },
      { name: '코트', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=120&h=120&fit=crop' },
      { name: '플리스', image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=120&h=120&fit=crop' },
      { name: '야상', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=120&h=120&fit=crop' },
      { name: '패딩', image: 'https://images.unsplash.com/photo-1547624643-3bf761b09502?w=120&h=120&fit=crop' },
    ]
  },
  {
    id: 'top',
    name: '상의',
    subcategories: [
      { name: '후드', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=120&h=120&fit=crop' },
      { name: '맨투맨', image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=120&h=120&fit=crop' },
      { name: '니트', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=120&h=120&fit=crop' },
      { name: '셔츠', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=120&h=120&fit=crop' },
      { name: '긴소매티셔츠', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120&h=120&fit=crop' },
      { name: '블라우스', image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=120&h=120&fit=crop' },
      { name: '조끼', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=120&h=120&fit=crop' },
      { name: '반소매티셔츠', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=120&h=120&fit=crop' },
      { name: '민소매', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=120&h=120&fit=crop' },
    ]
  },
  {
    id: 'bottom',
    name: '팬츠',
    subcategories: [
      { name: '데님', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=120&h=120&fit=crop' },
      { name: '슬랙스', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=120&h=120&fit=crop' },
      { name: '와이드팬츠', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=120&h=120&fit=crop' },
      { name: '조거팬츠', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=120&h=120&fit=crop' },
      { name: '레깅스', image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=120&h=120&fit=crop' },
      { name: '숏팬츠', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=120&h=120&fit=crop' },
    ]
  },
  {
    id: 'dress',
    name: '원피스/세트',
    subcategories: [
      { name: '미니원피스', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=120&h=120&fit=crop' },
      { name: '미디원피스', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=120&h=120&fit=crop' },
      { name: '롱원피스', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=120&h=120&fit=crop' },
      { name: '투피스세트', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=120&h=120&fit=crop' },
      { name: '점프수트', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=120&h=120&fit=crop' },
    ]
  },
  {
    id: 'skirt',
    name: '스커트',
    subcategories: [
      { name: '미니스커트', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0uj4a?w=120&h=120&fit=crop' },
      { name: '미디스커트', image: 'https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=120&h=120&fit=crop' },
      { name: '롱스커트', image: 'https://images.unsplash.com/photo-1592301933927-35b597393c0a?w=120&h=120&fit=crop' },
    ]
  },
  {
    id: 'shoes',
    name: '신발',
    subcategories: [
      { name: '스니커즈', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop' },
      { name: '플랫슈즈', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=120&h=120&fit=crop' },
      { name: '힐/펌프스', image: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=120&h=120&fit=crop' },
      { name: '부츠', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=120&h=120&fit=crop' },
      { name: '샌들/슬리퍼', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=120&h=120&fit=crop' },
      { name: '로퍼', image: 'https://images.unsplash.com/photo-1582897085656-c636d006a246?w=120&h=120&fit=crop' },
    ]
  },
  {
    id: 'bag',
    name: '가방',
    subcategories: [
      { name: '숄더백', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=120&h=120&fit=crop' },
      { name: '토트백', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=120&h=120&fit=crop' },
      { name: '크로스백', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=120&h=120&fit=crop' },
      { name: '백팩', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=120&h=120&fit=crop' },
      { name: '클러치', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=120&h=120&fit=crop' },
    ]
  },
  {
    id: 'jewelry',
    name: '주얼리',
    subcategories: [
      { name: '귀걸이', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=120&h=120&fit=crop' },
      { name: '목걸이', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=120&h=120&fit=crop' },
      { name: '반지', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=120&h=120&fit=crop' },
      { name: '팔찌', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=120&h=120&fit=crop' },
    ]
  },
  {
    id: 'acc',
    name: '패션소품',
    subcategories: [
      { name: '모자', image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=120&h=120&fit=crop' },
      { name: '스카프/머플러', image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=120&h=120&fit=crop' },
      { name: '벨트', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a15?w=120&h=120&fit=crop' },
      { name: '선글라스', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=120&h=120&fit=crop' },
      { name: '시계', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=120&h=120&fit=crop' },
    ]
  },
  {
    id: 'beauty',
    name: '뷰티',
    subcategories: [
      { name: '스킨케어', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=120&h=120&fit=crop' },
      { name: '메이크업', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=120&h=120&fit=crop' },
      { name: '향수', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=120&h=120&fit=crop' },
      { name: '헤어케어', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=120&h=120&fit=crop' },
      { name: '바디케어', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=120&h=120&fit=crop' },
    ]
  },
]

function Category() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState(categories[0].id)
  const contentRef = useRef(null)
  const sectionRefs = useRef({})

  // 사이드바 카테고리 클릭 시 해당 섹션으로 스크롤
  const scrollToCategory = (categoryId) => {
    setActiveCategory(categoryId)
    const section = sectionRefs.current[categoryId]
    if (section && contentRef.current) {
      contentRef.current.scrollTo({
        top: section.offsetTop - 60,
        behavior: 'smooth'
      })
    }
  }

  // 스크롤 시 현재 보이는 카테고리 감지
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return

      const scrollTop = contentRef.current.scrollTop + 100

      for (const category of categories) {
        const section = sectionRefs.current[category.id]
        if (section) {
          const { offsetTop, offsetHeight } = section
          if (scrollTop >= offsetTop && scrollTop < offsetTop + offsetHeight) {
            setActiveCategory(category.id)
            break
          }
        }
      }
    }

    const content = contentRef.current
    if (content) {
      content.addEventListener('scroll', handleScroll)
      return () => content.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-white z-20 px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="w-10" />
          <h1 className="text-lg font-bold">전체보기</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/search')} className="p-1">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button onClick={() => navigate('/cart')} className="p-1">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Category List */}
        <aside className="w-24 bg-surface border-r border-stone-200 overflow-y-auto flex-shrink-0">
          <nav className="py-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={`w-full px-3 py-3 text-left text-sm transition-colors ${
                  activeCategory === category.id
                    ? 'bg-cream text-gold font-bold border-l-2 border-gold'
                    : 'text-secondary hover:bg-stone-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Right Content - Subcategories */}
        <main ref={contentRef} className="flex-1 overflow-y-auto bg-white">
          {categories.map((category) => (
            <section
              key={category.id}
              ref={(el) => (sectionRefs.current[category.id] = el)}
              className="py-4"
            >
              {/* Category Title */}
              <div className="flex items-center justify-between px-4 mb-4">
                <h2 className="text-base font-bold">{category.name}</h2>
                <Link
                  to={`/category/${category.id}`}
                  className="text-gray-400"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Subcategory Grid */}
              <div className="grid grid-cols-3 gap-x-2 gap-y-4 px-4">
                {category.subcategories.map((sub) => (
                  <Link
                    key={sub.name}
                    to={`/category/${category.id}?sub=${encodeURIComponent(sub.name)}`}
                    className="flex flex-col items-center"
                  >
                    <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2">
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-gray-700 text-center">{sub.name}</span>
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="h-2 bg-gray-50 mt-4" />
            </section>
          ))}
        </main>
      </div>
    </div>
  )
}

export default Category
