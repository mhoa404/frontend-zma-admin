// src/layouts/Layout.tsx
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

const Layout = () => {
  return (
    <div className="w-screen min-h-screen flex bg-gray-50 relative">
      <Sidebar resetSelectedItem={() => {}} />
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
