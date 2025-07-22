import { LuBike, LuCircleHelp, LuTrendingUp } from 'react-icons/lu';
import { RiHome9Line } from 'react-icons/ri';
import { AiOutlineProduct } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { FaRegBell } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import { FiLogOut } from 'react-icons/fi';

import { useNavigate, useLocation } from 'react-router-dom';
import type { Sidebar as SidebarData } from '../../common/interfaces/Sidebar.interface';

const sidebarItems: SidebarData[] = [
  { label: 'Dashboard', icon: <RiHome9Line />, to: '/home' },
  { label: 'Products', icon: <AiOutlineProduct />, to: '/products' },
  { label: 'Categories', icon: <BiCategory />, to: '/categories' },
  { label: 'Customers', icon: <MdOutlinePeopleAlt />, to: '/customers' },
  { label: 'Shippers', icon: <LuBike />, to: '/shippers' },
  { label: 'Orders', icon: <LuTrendingUp />, to: '/orders' },
  { label: 'Notification', icon: <FaRegBell />, to: '/notification' },
  { label: 'Help', icon: <LuCircleHelp />, to: '/help' },
  { label: 'Settings', icon: <IoSettingsOutline />, to: '/settings' },
  { label: 'Logout', icon: <FiLogOut />, to: '/logout' },
];

export const Sidebar = ({ resetSelectedItem }: { resetSelectedItem: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-64 bg-slate-800 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <LuTrendingUp className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold">ProfitPulse</span>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.to;

            return (
              <li key={item.to}>
                <button
                  onClick={() => {
                    resetSelectedItem();
                    if (item.label === 'Logout') {
                      localStorage.removeItem('access_token');
                      navigate('/');
                    } else {
                      navigate(item.to);
                    }
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors focus:outline-none ${
                    isActive
                      ? 'bg-white text-slate-800'
                      : 'bg-transparent text-slate-400  hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
