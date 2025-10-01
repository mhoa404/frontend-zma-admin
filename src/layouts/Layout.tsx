// src/layouts/Layout.tsx
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

const Layout = () => {
  const location = useLocation()

  const getActiveMenu = () => {
    const segments = location.pathname.split('/')
    return segments[1]?.charAt(0).toUpperCase() + segments[1]?.slice(1) || 'Dashboard'
  }

  return (
    <div className="w-screen min-h-screen flex bg-gray-50 relative">
      <Sidebar resetSelectedItem={() => {}} />
      <div className="flex-1 flex flex-col">
        <Header activeMenu={getActiveMenu()} />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
