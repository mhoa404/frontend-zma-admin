import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import CustomerPage from './pages/CustomerPage';
import ShipperPage from './pages/ShipperPage';
import OrderPage from './pages/OrderPage';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthPage />} />
      {/* Các route khác dùng chung Layout */}
      <Route element={<Layout />}>
        <Route path="home"       element={<HomePage />} />
        <Route path="products"   element={<ProductPage />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="customers"  element={<CustomerPage />} />
        <Route path="shippers"   element={<ShipperPage />} />
        <Route path="orders"     element={<OrderPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
