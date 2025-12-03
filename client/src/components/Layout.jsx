import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'

function Layout() {
  return (
    <div className="min-h-screen pb-20">
      <Outlet />
      <BottomNav />
    </div>
  )
}

export default Layout
