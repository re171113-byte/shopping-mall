import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const popularKeywords = [
  '코트', '니트', '원피스', '가디건', '자켓',
  '블라우스', '팬츠', '스커트', '가방', '슈즈'
]

const recentSearches = [
  '캐시미어 니트', '울 코트', '와이드 팬츠'
]

// 검색 결과 데이터 (Unsplash 무료 이미지)
const searchResults = [
  { id: 1, name: '오버핏 울 블렌드 코트', brand: 'MARNI', price: 289000, salePrice: 199000, image: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=300&h=400&fit=crop', isNew: true, isFreeShipping: true },
  { id: 2, name: '캐시미어 니트 가디건', brand: 'THEORY', price: 185000, salePrice: null, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=400&fit=crop', isNew: false, isFreeShipping: true },
  { id: 3, name: '하이웨이스트 와이드 팬츠', brand: 'COS', price: 129000, salePrice: 89000, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop', isNew: true, isFreeShipping: false },
  { id: 4, name: '실크 블라우스', brand: 'SANDRO', price: 245000, salePrice: 179000, image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=300&h=400&fit=crop', isNew: false, isFreeShipping: true },
]

function Search() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState([])

  const handleSearch = (searchQuery) => {
    const q = searchQuery || query
    if (!q.trim()) return

    setIsSearching(true)
    // TODO: 실제 API 호출
    setTimeout(() => {
      setResults(searchResults)
    }, 300)
  }

  const handleKeywordClick = (keyword) => {
    setQuery(keyword)
    handleSearch(keyword)
  }

  const clearSearch = () => {
    setQuery('')
    setIsSearching(false)
    setResults([])
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Search Header */}
      <header className="sticky top-0 bg-white z-10 px-4 py-3 border-b">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="상품명, 브랜드 검색"
              className="w-full pl-10 pr-10 py-2.5 bg-surface rounded-lg text-base focus:outline-none"
              autoFocus
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Search Results */}
      {isSearching && results.length > 0 ? (
        <div className="p-4">
          <p className="text-sm text-secondary mb-3">
            '{query}' 검색결과 {results.length}개
          </p>
          <div className="grid grid-cols-2 gap-3">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="px-4 py-4 border-b">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">최근 검색어</h3>
                <button className="text-sm text-secondary">전체 삭제</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((keyword, index) => (
                  <button
                    key={index}
                    onClick={() => handleKeywordClick(keyword)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-surface rounded-full text-sm"
                  >
                    {keyword}
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Keywords */}
          <div className="px-4 py-4">
            <h3 className="font-medium mb-3">인기 검색어</h3>
            <div className="flex flex-wrap gap-2">
              {popularKeywords.map((keyword, index) => (
                <button
                  key={index}
                  onClick={() => handleKeywordClick(keyword)}
                  className="px-3 py-1.5 border rounded-full text-sm"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="px-4 py-4 bg-surface">
            <h3 className="font-medium mb-3">AI 추천 검색어</h3>
            <div className="flex flex-wrap gap-2">
              {['캐시미어 니트', '모던 코트', '엘레강스 원피스'].map((keyword, index) => (
                <button
                  key={index}
                  onClick={() => handleKeywordClick(keyword)}
                  className="px-3 py-1.5 bg-white border border-accent text-accent rounded-full text-sm"
                >
                  ✨ {keyword}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Search
