import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/useStore'

function Cart() {
  const navigate = useNavigate()
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()

  const formatPrice = (price) => price.toLocaleString('ko-KR')
  const total = getTotal()
  const deliveryFee = total >= 50000 ? 0 : 3000
  const finalTotal = total + deliveryFee

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <header className="sticky top-0 bg-white z-10 px-4 py-4 border-b flex items-center">
          <button onClick={() => navigate(-1)} className="mr-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">장바구니</h1>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p className="text-secondary">장바구니가 비어있어요</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg"
          >
            쇼핑하러 가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface pb-40">
      {/* Header */}
      <header className="sticky top-0 bg-white z-10 px-4 py-4 border-b flex items-center">
        <button onClick={() => navigate(-1)} className="mr-3">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold">장바구니 ({items.length})</h1>
      </header>

      {/* Cart Items */}
      <div className="bg-white mt-2">
        {items.map((item, index) => (
          <div key={index} className="p-4 border-b flex gap-3">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-20 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-secondary">{item.product.brand}</p>
                  <p className="text-sm line-clamp-1">{item.product.name}</p>
                  <p className="text-xs text-secondary mt-1">
                    {item.options.color} / {item.options.size}
                  </p>
                </div>
                <button onClick={() => removeItem(index)}>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center border rounded">
                  <button
                    onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))}
                    className="w-8 h-8 text-secondary"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(index, item.quantity + 1)}
                    className="w-8 h-8 text-secondary"
                  >
                    +
                  </button>
                </div>
                <p className="font-bold">
                  {formatPrice((item.product.salePrice || item.product.price) * item.quantity)}원
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coupon Section */}
      <div className="bg-white mt-2 p-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">쿠폰</span>
          <button className="text-sm text-secondary flex items-center gap-1">
            사용 가능한 쿠폰 0개
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white mt-2 p-4 space-y-3">
        <h3 className="font-bold">결제 예정 금액</h3>
        <div className="flex justify-between text-sm">
          <span className="text-secondary">상품 금액</span>
          <span>{formatPrice(total)}원</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-secondary">배송비</span>
          <span>{deliveryFee === 0 ? '무료' : `${formatPrice(deliveryFee)}원`}</span>
        </div>
        {deliveryFee > 0 && (
          <p className="text-xs text-accent">
            {formatPrice(50000 - total)}원 추가 시 무료배송
          </p>
        )}
        <div className="border-t pt-3 flex justify-between">
          <span className="font-medium">총 결제 금액</span>
          <span className="text-xl font-bold">{formatPrice(finalTotal)}원</span>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white border-t p-4 safe-area-bottom">
        <button className="btn-primary">
          {formatPrice(finalTotal)}원 결제하기
        </button>
      </div>
    </div>
  )
}

export default Cart
