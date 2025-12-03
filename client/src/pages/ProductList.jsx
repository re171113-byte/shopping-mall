import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

// 상품 데이터 (Unsplash 무료 이미지)
const products = [
  { id: 1, name: '오버핏 울 블렌드 코트', brand: 'MARNI', price: 289000, salePrice: 199000, image: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=300&h=400&fit=crop', isNew: true, isFreeShipping: true },
  { id: 2, name: '캐시미어 니트 가디건', brand: 'THEORY', price: 185000, salePrice: null, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=400&fit=crop', isNew: false, isFreeShipping: true },
  { id: 3, name: '하이웨이스트 와이드 팬츠', brand: 'COS', price: 129000, salePrice: 89000, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop', isNew: true, isFreeShipping: false },
  { id: 4, name: '실크 블라우스', brand: 'SANDRO', price: 245000, salePrice: 179000, image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=300&h=400&fit=crop', isNew: false, isFreeShipping: true },
  { id: 5, name: '램스킨 숄더백', brand: 'MAJE', price: 398000, salePrice: null, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=300&h=400&fit=crop', isNew: true, isFreeShipping: true },
  { id: 6, name: '미니멀 롱 원피스', brand: 'MAX MARA', price: 520000, salePrice: 390000, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=400&fit=crop', isNew: false, isFreeShipping: true },
  { id: 7, name: '데일리 코튼 티셔츠', brand: 'ZARA', price: 39000, salePrice: 29000, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop', isNew: false, isFreeShipping: false },
  { id: 8, name: '슬림핏 스트레이트 진', brand: 'MANGO', price: 79000, salePrice: 59000, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop', isNew: true, isFreeShipping: true },
]

const sortOptions = [
  { id: 'recommend', label: '추천순' },
  { id: 'popular', label: '인기순' },
  { id: 'new', label: '최신순' },
  { id: 'priceAsc', label: '가격 낮은순' },
  { id: 'priceDesc', label: '가격 높은순' },
]

function ProductList() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const [sortBy, setSortBy] = useState('recommend')
  const [showFilter, setShowFilter] = useState(false)
  const [showSort, setShowSort] = useState(false)

  const categoryNames = {
    outer: '아우터',
    top: '상의',
    bottom: '하의',
    dress: '원피스',
    shoes: '슈즈',
    bag: '가방',
    acc: '악세서리',
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white z-20 border-b">
        <div className="flex items-center px-4 py-3">
          <button onClick={() => navigate(-1)} className="mr-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold flex-1">
            {categoryNames[categoryId] || categoryId}
          </h1>
          <button className="p-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t bg-surface">
          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-1 text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            필터
          </button>
          <button
            onClick={() => setShowSort(true)}
            className="flex items-center gap-1 text-sm"
          >
            {sortOptions.find(opt => opt.id === sortBy)?.label}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </header>

      {/* Product Count */}
      <div className="px-4 py-3 text-sm text-secondary">
        총 {products.length}개
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3 px-4 pb-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Sort Modal */}
      {showSort && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowSort(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white rounded-t-2xl">
            <div className="p-4 border-b">
              <h3 className="font-bold text-center">정렬</h3>
            </div>
            <div className="py-2">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSortBy(option.id)
                    setShowSort(false)
                  }}
                  className={`w-full px-4 py-3 text-left ${
                    sortBy === option.id ? 'text-primary font-medium' : 'text-secondary'
                  }`}
                >
                  {option.label}
                  {sortBy === option.id && (
                    <svg className="w-5 h-5 float-right text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            <div className="p-4 safe-area-bottom">
              <button
                onClick={() => setShowSort(false)}
                className="btn-secondary"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal (Placeholder) */}
      {showFilter && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowFilter(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h3 className="font-bold">필터</h3>
              <button onClick={() => setShowFilter(false)} className="text-secondary">
                닫기
              </button>
            </div>
            <div className="p-4 space-y-6">
              {/* 가격 필터 */}
              <div>
                <h4 className="font-medium mb-3">가격</h4>
                <div className="flex flex-wrap gap-2">
                  {['5만원 이하', '5~10만원', '10~20만원', '20만원 이상'].map((price) => (
                    <button key={price} className="px-4 py-2 border rounded-full text-sm">
                      {price}
                    </button>
                  ))}
                </div>
              </div>

              {/* 색상 필터 */}
              <div>
                <h4 className="font-medium mb-3">색상</h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: '블랙', color: '#000' },
                    { name: '화이트', color: '#fff' },
                    { name: '그레이', color: '#9ca3af' },
                    { name: '베이지', color: '#d4b896' },
                    { name: '브라운', color: '#8b5a2b' },
                    { name: '네이비', color: '#1e3a5f' },
                  ].map((c) => (
                    <button key={c.name} className="flex flex-col items-center gap-1">
                      <div
                        className="w-8 h-8 rounded-full border"
                        style={{ backgroundColor: c.color }}
                      />
                      <span className="text-xs">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 배송 필터 */}
              <div>
                <h4 className="font-medium mb-3">배송</h4>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border rounded-full text-sm">무료배송</button>
                  <button className="px-4 py-2 border rounded-full text-sm">빠른배송</button>
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white p-4 border-t flex gap-3 safe-area-bottom">
              <button className="flex-1 btn-secondary">초기화</button>
              <button className="flex-1 btn-primary">적용하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductList
