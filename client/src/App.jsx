import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Category from './pages/Category'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import MyPage from './pages/MyPage'
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'
import Search from './pages/Search'
import InstallBanner from './components/InstallBanner'

function App() {
  return (
    <BrowserRouter>
      <InstallBanner />
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="category" element={<Category />} />
          <Route path="category/:categoryId" element={<ProductList />} />
          <Route path="product/:productId" element={<ProductDetail />} />
          <Route path="search" element={<Search />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
