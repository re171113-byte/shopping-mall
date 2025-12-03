/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 30-40대 여성 선호 컬러 팔레트
        primary: '#3D3D3D',        // 웜 차콜 (부드러운 블랙)
        secondary: '#8B8178',      // 웜 그레이/토프
        accent: '#B8860B',         // 골드/앤티크 골드
        background: '#FDFBF7',     // 웜 화이트/크림
        surface: '#F5F2ED',        // 라이트 베이지

        // 추가 컬러
        rose: '#C4A4A4',           // 더스티 로즈
        burgundy: '#8B4557',       // 버건디
        sage: '#A8B5A0',           // 세이지 그린
        taupe: '#B8A99A',          // 토프
        navy: '#3D4F5F',           // 네이비
        cream: '#F9F6F0',          // 크림
        gold: '#C9A96E',           // 골드
        blush: '#E8D5D5',          // 블러쉬 핑크
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'base': ['16px', '1.6'],
        'lg': ['18px', '1.6'],
      }
    },
  },
  plugins: [],
}
