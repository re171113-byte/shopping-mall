import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const handleSocialLogin = (provider) => {
    // TODO: 실제 소셜 로그인 구현
    console.log(`Login with ${provider}`)
    navigate('/onboarding')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Logo Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <h1 className="text-4xl font-bold text-primary mb-2">STYLISH</h1>
        <p className="text-secondary text-center">
          30~40대 여성을 위한<br />프리미엄 패션 큐레이션
        </p>
      </div>

      {/* Login Buttons */}
      <div className="p-6 space-y-3">
        <button
          onClick={() => handleSocialLogin('kakao')}
          className="w-full py-4 bg-[#FEE500] text-[#191919] rounded-xl font-medium flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.48 3 2 6.58 2 11c0 2.8 1.86 5.25 4.65 6.65-.2.75-.73 2.72-.84 3.15-.13.52.19.51.4.37.17-.11 2.67-1.81 3.75-2.55.66.09 1.34.14 2.04.14 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
          </svg>
          카카오로 시작하기
        </button>

        <button
          onClick={() => handleSocialLogin('naver')}
          className="w-full py-4 bg-[#03C75A] text-white rounded-xl font-medium flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.273 12.845 7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z"/>
          </svg>
          네이버로 시작하기
        </button>

        <button
          onClick={() => handleSocialLogin('apple')}
          className="w-full py-4 bg-black text-white rounded-xl font-medium flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
          Apple로 시작하기
        </button>

        <button
          onClick={() => navigate('/onboarding')}
          className="w-full py-4 text-secondary text-sm"
        >
          둘러보기
        </button>
      </div>
    </div>
  )
}

export default Login
