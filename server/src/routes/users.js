import express from 'express'

const router = express.Router()

// 임시 사용자 저장소
const users = []

// 회원가입
router.post('/register', (req, res) => {
  const { email, password, name } = req.body

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email already exists' })
  }

  const user = {
    id: users.length + 1,
    email,
    password, // TODO: 해시 처리
    name,
    preferences: {},
    createdAt: new Date()
  }

  users.push(user)

  res.status(201).json({
    id: user.id,
    email: user.email,
    name: user.name
  })
})

// 로그인
router.post('/login', (req, res) => {
  const { email, password } = req.body

  const user = users.find(u => u.email === email && u.password === password)

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  // TODO: JWT 토큰 생성
  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    token: 'mock-jwt-token'
  })
})

// 소셜 로그인
router.post('/social-login', (req, res) => {
  const { provider, token } = req.body

  // TODO: 실제 소셜 로그인 검증
  res.json({
    id: 1,
    email: `user@${provider}.com`,
    name: `${provider} 사용자`,
    token: 'mock-jwt-token'
  })
})

// 취향 설정 저장
router.post('/preferences', (req, res) => {
  const { userId, styles, priceRange, favoriteBrands } = req.body

  const user = users.find(u => u.id === userId)
  if (user) {
    user.preferences = { styles, priceRange, favoriteBrands }
  }

  res.json({ message: 'Preferences saved' })
})

// 프로필 조회
router.get('/profile/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id))

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    preferences: user.preferences
  })
})

export default router
