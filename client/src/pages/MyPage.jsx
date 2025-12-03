import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/useStore'

function MyPage() {
  const navigate = useNavigate()
  const { user, isLoggedIn, logout } = useUserStore()

  const menuItems = [
    {
      title: '주문/배송',
      items: [
        { label: '주문내역', path: '/orders', icon: '📦' },
        { label: '배송조회', path: '/delivery', icon: '🚚' },
        { label: '취소/반품/교환', path: '/returns', icon: '↩️' },
      ]
    },
    {
      title: '혜택',
      items: [
        { label: '쿠폰', path: '/coupons', badge: '0', icon: '🎟️' },
        { label: '적립금', path: '/points', badge: '0원', icon: '💰' },
      ]
    },
    {
      title: '설정',
      items: [
        { label: '취향 설정', path: '/onboarding', icon: '❤️' },
        { label: '배송지 관리', path: '/addresses', icon: '📍' },
        { label: '알림 설정', path: '/notifications', icon: '🔔' },
        { label: '고객센터', path: '/support', icon: '💬' },
      ]
    },
  ]

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-white px-4 py-4 border-b">
        <h1 className="text-xl font-bold">마이페이지</h1>
      </header>

      {/* Profile Section */}
      <div className="bg-white p-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg">{user?.name || '회원'}</p>
              <p className="text-sm text-secondary">{user?.email || ''}</p>
            </div>
            <button className="px-3 py-1.5 border rounded-lg text-sm">
              프로필 수정
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-lg">로그인이 필요해요</p>
              <p className="text-sm text-secondary mt-1">
                로그인하고 다양한 혜택을 받아보세요
              </p>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm"
            >
              로그인
            </button>
          </div>
        )}
      </div>

      {/* Order Status */}
      <div className="bg-white mt-2 p-4">
        <h3 className="font-bold mb-4">주문/배송 현황</h3>
        <div className="flex justify-around text-center">
          <div className="flex-1">
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-secondary mt-1">결제완료</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="flex-1">
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-secondary mt-1">배송중</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="flex-1">
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-secondary mt-1">배송완료</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="flex-1">
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-secondary mt-1">리뷰작성</p>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      {menuItems.map((section, sectionIndex) => (
        <div key={sectionIndex} className="bg-white mt-2">
          <h3 className="font-bold px-4 pt-4 pb-2">{section.title}</h3>
          {section.items.map((item, itemIndex) => (
            <Link
              key={itemIndex}
              to={item.path}
              className="flex items-center justify-between px-4 py-3 active:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
              <div className="flex items-center gap-2 text-secondary">
                {item.badge && (
                  <span className="text-sm">{item.badge}</span>
                )}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      ))}

      {/* Logout Button */}
      {isLoggedIn && (
        <div className="bg-white mt-2 p-4">
          <button
            onClick={() => {
              logout()
              navigate('/')
            }}
            className="w-full py-3 text-secondary border rounded-lg"
          >
            로그아웃
          </button>
        </div>
      )}

      {/* App Info */}
      <div className="p-4 text-center text-xs text-secondary">
        <p>STYLISH v1.0.0</p>
        <p className="mt-1">30~40대 여성을 위한 프리미엄 패션 큐레이션</p>
      </div>
    </div>
  )
}

export default MyPage
