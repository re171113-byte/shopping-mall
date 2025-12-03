import { useState, useEffect } from 'react'

function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // 이미 설치되었거나 닫기를 눌렀는지 확인
    const dismissed = localStorage.getItem('pwa-banner-dismissed')
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches

    if (dismissed || isStandalone) {
      return
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowBanner(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // iOS Safari 체크 (beforeinstallprompt 미지원)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)

    if (isIOS && isSafari && !isStandalone) {
      // iOS에서는 3초 후 배너 표시
      setTimeout(() => setShowBanner(true), 3000)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setShowBanner(false)
      }
      setDeferredPrompt(null)
    } else {
      // iOS의 경우 안내 메시지
      alert('하단의 공유 버튼을 누른 후 "홈 화면에 추가"를 선택해주세요.')
    }
  }

  const handleDismiss = () => {
    setShowBanner(false)
    localStorage.setItem('pwa-banner-dismissed', 'true')
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-16 left-0 right-0 max-w-[480px] mx-auto z-40 px-4 animate-slide-up">
      <div className="bg-white border border-stone-200 rounded-xl shadow-lg p-4 flex items-center gap-3">
        {/* 앱 아이콘 */}
        <div className="w-12 h-12 bg-stone-800 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 48 48" className="w-8 h-8">
            {/* 쇼핑백 본체 */}
            <path d="M10 16L14 40H34L38 16H10Z" fill="#C9A96E"/>
            {/* 쇼핑백 손잡이 */}
            <path d="M18 16V12C18 8.68629 20.6863 6 24 6C27.3137 6 30 8.68629 30 12V16" stroke="#C9A96E" strokeWidth="3" fill="none"/>
            {/* S 로고 */}
            <text x="24" y="32" textAnchor="middle" fill="#3D3D3D" fontSize="14" fontWeight="bold" fontFamily="sans-serif">S</text>
          </svg>
        </div>

        {/* 텍스트 */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-800 text-sm">STYLISH 앱 설치</p>
          <p className="text-xs text-gray-500 truncate">홈 화면에서 빠르게 접속하세요!</p>
        </div>

        {/* 설치 버튼 */}
        <button
          onClick={handleInstall}
          className="px-4 py-2 bg-stone-800 text-white text-sm font-medium rounded-lg flex-shrink-0 active:scale-95 transition-transform"
        >
          설치
        </button>

        {/* 닫기 버튼 */}
        <button
          onClick={handleDismiss}
          className="w-8 h-8 flex items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default InstallBanner
