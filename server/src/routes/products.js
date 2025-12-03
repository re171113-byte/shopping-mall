import express from 'express'

const router = express.Router()

// 상품 데이터 (Unsplash 무료 이미지 - 상업용 무료)
const products = [
  { id: 1, name: '오버핏 울 블렌드 코트', brand: 'MARNI', category: 'outer', price: 289000, salePrice: 199000, image: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=300&h=400&fit=crop', isNew: true, isFreeShipping: true, isQuickDelivery: true },
  { id: 2, name: '캐시미어 니트 가디건', brand: 'THEORY', category: 'top', price: 185000, salePrice: null, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=400&fit=crop', isNew: false, isFreeShipping: true, isQuickDelivery: false },
  { id: 3, name: '하이웨이스트 와이드 팬츠', brand: 'COS', category: 'bottom', price: 129000, salePrice: 89000, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop', isNew: true, isFreeShipping: false, isQuickDelivery: true },
  { id: 4, name: '실크 블라우스', brand: 'SANDRO', category: 'top', price: 245000, salePrice: 179000, image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=300&h=400&fit=crop', isNew: false, isFreeShipping: true, isQuickDelivery: false },
  { id: 5, name: '램스킨 숄더백', brand: 'MAJE', category: 'bag', price: 398000, salePrice: null, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=300&h=400&fit=crop', isNew: true, isFreeShipping: true, isQuickDelivery: true },
  { id: 6, name: '미니멀 롱 원피스', brand: 'MAX MARA', category: 'dress', price: 520000, salePrice: 390000, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=400&fit=crop', isNew: false, isFreeShipping: true, isQuickDelivery: false },
  { id: 7, name: '데일리 코튼 티셔츠', brand: 'ZARA', category: 'top', price: 39000, salePrice: 29000, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop', isNew: false, isFreeShipping: false, isQuickDelivery: true },
  { id: 8, name: '슬림핏 스트레이트 진', brand: 'MANGO', category: 'bottom', price: 79000, salePrice: 59000, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop', isNew: true, isFreeShipping: true, isQuickDelivery: true },
]

// 전체 상품 조회
router.get('/', (req, res) => {
  const { category, sort, minPrice, maxPrice, quickDelivery, page = 1, limit = 20 } = req.query

  let filtered = [...products]

  // 카테고리 필터
  if (category) {
    filtered = filtered.filter(p => p.category === category)
  }

  // 가격 필터
  if (minPrice) {
    filtered = filtered.filter(p => (p.salePrice || p.price) >= parseInt(minPrice))
  }
  if (maxPrice) {
    filtered = filtered.filter(p => (p.salePrice || p.price) <= parseInt(maxPrice))
  }

  // 빠른배송 필터
  if (quickDelivery === 'true') {
    filtered = filtered.filter(p => p.isQuickDelivery)
  }

  // 정렬
  if (sort === 'priceAsc') {
    filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
  } else if (sort === 'priceDesc') {
    filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
  } else if (sort === 'new') {
    filtered.sort((a, b) => b.isNew - a.isNew)
  }

  // 페이지네이션
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + parseInt(limit)
  const paginated = filtered.slice(startIndex, endIndex)

  res.json({
    products: paginated,
    total: filtered.length,
    page: parseInt(page),
    totalPages: Math.ceil(filtered.length / limit)
  })
})

// 상품 상세 조회
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id))

  if (!product) {
    return res.status(404).json({ error: 'Product not found' })
  }

  // 상세 정보 추가
  const detailed = {
    ...product,
    images: [
      `https://picsum.photos/seed/pd${product.id}-1/480/640`,
      `https://picsum.photos/seed/pd${product.id}-2/480/640`,
      `https://picsum.photos/seed/pd${product.id}-3/480/640`,
    ],
    colors: ['블랙', '베이지', '네이비'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '프리미엄 소재로 제작된 고급스러운 아이템입니다.',
    deliveryInfo: product.isFreeShipping ? '무료배송' : '배송비 3,000원',
    reviews: {
      count: Math.floor(Math.random() * 200) + 10,
      rating: (Math.random() * 1 + 4).toFixed(1)
    }
  }

  res.json(detailed)
})

// AI 추천 상품
router.get('/recommend/ai', (req, res) => {
  // TODO: 실제 AI 추천 로직 구현
  const shuffled = [...products].sort(() => Math.random() - 0.5)
  res.json(shuffled.slice(0, 6))
})

// 빠른배송 상품
router.get('/quick-delivery', (req, res) => {
  const quickProducts = products.filter(p => p.isQuickDelivery)
  res.json(quickProducts)
})

// 검색
router.get('/search', (req, res) => {
  const { q } = req.query

  if (!q) {
    return res.json([])
  }

  const query = q.toLowerCase()
  const results = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.brand.toLowerCase().includes(query)
  )

  res.json(results)
})

export default router
