import { useNavigate } from 'react-router-dom'
import { useWishlistStore } from '../store/useStore'
import ProductCard from '../components/ProductCard'

function Wishlist() {
  const navigate = useNavigate()
  const items = useWishlistStore((state) => state.items)

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <header className="sticky top-0 bg-white z-10 px-4 py-4 border-b">
          <h1 className="text-xl font-bold">찜</h1>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <p className="text-secondary">찜한 상품이 없어요</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg"
          >
            상품 둘러보기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 bg-white z-10 px-4 py-4 border-b">
        <h1 className="text-xl font-bold">찜 ({items.length})</h1>
      </header>

      <div className="grid grid-cols-2 gap-3 p-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Wishlist
