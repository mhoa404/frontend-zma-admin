import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import CustomerPage from './pages/CustomerPage';
import ShipperPage from './pages/ShipperPage';
import OrderPage from './pages/OrderPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RedirectIfAuth from './components/RedirectIfAuth.tsx';
import RequireAuth from './components/RequireAuth';
import RegisterPage from './pages/RegisterPage.tsx';


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<RedirectIfAuth />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/shippers" element={<ShipperPage />} />
          <Route path="/orders" element={<OrderPage />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
