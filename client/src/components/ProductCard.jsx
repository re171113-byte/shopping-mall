import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useWishlistStore } from '../store/useStore'

// 기본 placeholder 이미지
const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1558171013-62dd0299d8e1?w=300&h=400&fit=crop'

function ProductCard({ product, compact = false }) {
  const [imgError, setImgError] = useState(false)
  const { isWishlisted, toggleWishlist } = useWishlistStore()
  const wishlisted = isWishlisted(product.id)

  const discountRate = product.salePrice
    ? Math.round((1 - product.salePrice / product.price) * 100)
    : 0

  const handleWishlistClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }

  const formatPrice = (price) => {
    return price.toLocaleString('ko-KR')
  }

  if (compact) {
    return (
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <img
            src={imgError ? PLACEHOLDER_IMAGE : product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
          {product.isQuickDelivery && (
            <span className="absolute top-2 left-2 bg-gold text-white text-[10px] px-1.5 py-0.5 rounded">
              빠른배송
            </span>
          )}
        </div>
        <div className="mt-2">
          <p className="text-xs text-blue-500">{product.brand}</p>
          <p className="text-sm text-gray-700 line-clamp-1 mt-0.5">{product.name}</p>
          <div className="flex items-center gap-1 mt-1">
            {discountRate > 0 && (
              <span className="text-red-500 text-sm font-bold">{discountRate}%</span>
            )}
            <span className="text-sm font-bold text-primary">
              {formatPrice(product.salePrice || product.price)}
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={imgError ? PLACEHOLDER_IMAGE : product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setImgError(true)}
        />
        <button
          onClick={handleWishlistClick}
          className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <svg
            className={`w-5 h-5 ${wishlisted ? 'text-rose fill-current' : 'text-secondary'}`}
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
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-navy text-white text-[10px] px-1.5 py-0.5 rounded">
            NEW
          </span>
        )}
        {product.isFreeShipping && (
          <span className="absolute bottom-2 left-2 bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded">
            무료배송
          </span>
        )}
      </div>
      <div className="mt-2">
        <div className="flex items-baseline gap-1.5">
          {discountRate > 0 && (
            <span className="text-red-500 text-sm font-bold">{discountRate}%</span>
          )}
          <span className="text-base font-bold text-primary">
            {formatPrice(product.salePrice || product.price)}
          </span>
        </div>
        <p className="text-xs text-blue-500 mt-1">{product.brand}</p>
        <p className="text-xs text-gray-600 line-clamp-2 mt-0.5 leading-snug">{product.name}</p>
        {/* 첫구매 혜택 배지 */}
        <div className="mt-2">
          <span className="inline-block bg-pink-100 text-pink-500 text-[10px] px-2 py-1 rounded">
            첫구매 혜택
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
