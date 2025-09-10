interface HeaderProps {
  activeMenu: string;
}

const Header = ({ activeMenu }: HeaderProps) => {
  return (
    <header className="bg-white h-20 border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 capitalize">
            {activeMenu}
          </h1>
          <p className="text-sm text-gray-600">
            Quản lý bán hàng và thống kê kinh doanh {activeMenu} here
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
