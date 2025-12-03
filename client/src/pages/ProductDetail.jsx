import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useCartStore, useWishlistStore } from '../store/useStore'

// 상품 상세 데이터 (Unsplash 무료 이미지)
const productData = {
  id: 1,
  name: '오버핏 울 블렌드 코트',
  brand: 'MARNI',
  price: 289000,
  salePrice: 199000,
  images: [
    'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=480&h=640&fit=crop',
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=480&h=640&fit=crop',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=480&h=640&fit=crop',
    'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=480&h=640&fit=crop',
  ],
  colors: ['블랙', '베이지', '네이비'],
  sizes: ['S', 'M', 'L', 'XL'],
  description: '프리미엄 울 블렌드 소재로 제작된 오버핏 코트입니다. 세련된 디자인과 따뜻한 보온성을 겸비했습니다.',
  deliveryInfo: '무료배송 | 오늘 출발',
  isQuickDelivery: true,
  reviews: {
    count: 128,
    rating: 4.7,
  },
}

// 리뷰 데이터 (Unsplash 무료 이미지)
const reviews = [
  { id: 1, user: '김**', rating: 5, date: '2024.12.01', content: '색감도 좋고 핏도 예뻐요! 재구매 의사 있습니다.', height: 165, weight: 52, size: 'M', images: ['https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=100&h=100&fit=crop'] },
  { id: 2, user: '이**', rating: 4, date: '2024.11.28', content: '따뜻하고 좋아요. 어깨가 좀 넓게 나와서 한 사이즈 작게 추천드려요.', height: 160, weight: 50, size: 'S', images: [] },
  { id: 3, user: '박**', rating: 5, date: '2024.11.25', content: '가격 대비 최고입니다. 배송도 빠르고 포장도 꼼꼼해요.', height: 168, weight: 55, size: 'M', images: ['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=100&h=100&fit=crop', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100&h=100&fit=crop'] },
]

function ProductDetail() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const addToCart = useCartStore((state) => state.addItem)
  const { isWishlisted, toggleWishlist } = useWishlistStore()

  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [showOptions, setShowOptions] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const product = productData // TODO: API에서 가져오기
  const wishlisted = isWishlisted(product.id)

  const discountRate = product.salePrice
    ? Math.round((1 - product.salePrice / product.price) * 100)
    : 0

  const formatPrice = (price) => price.toLocaleString('ko-KR')

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      setShowOptions(true)
      return
    }
    addToCart(product, quantity, { color: selectedColor, size: selectedSize })
    alert('장바구니에 추가되었습니다.')
    setShowOptions(false)
  }

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      setShowOptions(true)
      return
    }
    addToCart(product, quantity, { color: selectedColor, size: selectedSize })
    navigate('/cart')
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 max-w-[480px] mx-auto z-20 flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur">
        <button onClick={() => navigate(-1)}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/cart')}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Image Gallery */}
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        className="aspect-[3/4]"
      >
        {product.images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`${product.name} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Product Info */}
      <div className="px-4 py-4">
        <p className="text-secondary text-sm">{product.brand}</p>
        <h1 className="text-lg font-medium mt-1">{product.name}</h1>

        {/* Price */}
        <div className="mt-3">
          {discountRate > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-accent text-xl font-bold">{discountRate}%</span>
              <span className="text-secondary line-through">
                {formatPrice(product.price)}원
              </span>
            </div>
          )}
          <p className="text-2xl font-bold">
            {formatPrice(product.salePrice || product.price)}원
          </p>
        </div>

        {/* Delivery Info */}
        <div className="mt-4 p-3 bg-surface rounded-lg">
          <div className="flex items-center gap-2">
            {product.isQuickDelivery && (
              <span className="text-accent font-bold">⚡</span>
            )}
            <span className="text-sm">{product.deliveryInfo}</span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-secondary text-sm leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Reviews Section */}
      <div className="border-t-8 border-surface">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">리뷰 ({product.reviews.count})</h2>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="font-medium">{product.reviews.rating}</span>
            </div>
          </div>

          {/* Review List */}
          <div className="mt-4 space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.user}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'} fill-current`}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-secondary">{review.date}</span>
                </div>
                <p className="text-xs text-secondary mt-1">
                  {review.height}cm · {review.weight}kg · {review.size} 구매
                </p>
                <p className="mt-2 text-sm">{review.content}</p>
                {review.images.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {review.images.map((img, i) => (
                      <img key={i} src={img} alt="" className="w-16 h-16 rounded object-cover" />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button className="w-full py-3 text-center text-sm text-secondary border rounded-lg mt-4">
            리뷰 더보기
          </button>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white border-t px-4 py-3 flex gap-3 safe-area-bottom">
        <button
          onClick={() => toggleWishlist(product)}
          className="w-12 h-12 border rounded-lg flex items-center justify-center"
        >
          <svg
            className={`w-6 h-6 ${wishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`}
            fill={wishlisted ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        <button
          onClick={() => setShowOptions(true)}
          className="flex-1 btn-primary"
        >
          구매하기
        </button>
      </div>

      {/* Options Modal */}
      {showOptions && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowOptions(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white rounded-t-2xl">
            <div className="p-4 border-b">
              <h3 className="font-bold text-center">옵션 선택</h3>
            </div>
            <div className="p-4 space-y-4">
              {/* Color */}
              <div>
                <p className="text-sm font-medium mb-2">색상</p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg text-sm ${
                        selectedColor === color
                          ? 'border-primary bg-gray-50'
                          : 'border-gray-200'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <p className="text-sm font-medium mb-2">사이즈</p>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border rounded-lg text-sm ${
                        selectedSize === size
                          ? 'border-primary bg-gray-50'
                          : 'border-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-sm font-medium mb-2">수량</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border rounded-lg"
                  >
                    -
                  </button>
                  <span className="w-10 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Selected Summary */}
              {selectedColor && selectedSize && (
                <div className="p-3 bg-surface rounded-lg flex justify-between items-center">
                  <span className="text-sm">
                    {selectedColor} / {selectedSize} / {quantity}개
                  </span>
                  <span className="font-bold">
                    {formatPrice((product.salePrice || product.price) * quantity)}원
                  </span>
                </div>
              )}
            </div>
            <div className="p-4 flex gap-3 safe-area-bottom">
              <button onClick={handleAddToCart} className="flex-1 btn-secondary">
                장바구니
              </button>
              <button onClick={handleBuyNow} className="flex-1 btn-primary">
                바로구매
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
