import express from 'express'

const router = express.Router()

// 임시 주문 저장소
const orders = []

// 주문 생성
router.post('/', (req, res) => {
  const { userId, items, shippingAddress, paymentMethod, totalAmount } = req.body

  const order = {
    id: orders.length + 1,
    userId,
    items,
    shippingAddress,
    paymentMethod,
    totalAmount,
    status: 'pending',
    createdAt: new Date()
  }

  orders.push(order)

  res.status(201).json(order)
})

// 주문 목록 조회
router.get('/user/:userId', (req, res) => {
  const userOrders = orders.filter(o => o.userId === parseInt(req.params.userId))
  res.json(userOrders)
})

// 주문 상세 조회
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id))

  if (!order) {
    return res.status(404).json({ error: 'Order not found' })
  }

  res.json(order)
})

// 주문 상태 업데이트
router.patch('/:id/status', (req, res) => {
  const { status } = req.body
  const order = orders.find(o => o.id === parseInt(req.params.id))

  if (!order) {
    return res.status(404).json({ error: 'Order not found' })
  }

  order.status = status
  res.json(order)
})

// 주문 취소
router.delete('/:id', (req, res) => {
  const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id))

  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' })
  }

  orders[orderIndex].status = 'cancelled'
  res.json({ message: 'Order cancelled' })
})

export default router
