import { Route, Routes } from 'react-router-dom';
import HomeLayout from '@/layout/HomeLayout';
import Home from '@/pages/Home';
import ErrorPage from '@/pages/ErrorPage';
import SignUp from '@/pages/SignUp';
import SignIn from '@/pages/SignIn';
import TwoFactorAuthForm from '@/pages/TwoFactorAuthForm';
import DashboardLayout from '@/layout/DashbordLayout';
import PasswordResetRequestForm from '@/components/password/PasswordResetRequestForm';
import ResetPasswordForm from '@/components/password/PasswordResetForm';
import AdminRoutes from '@/pages/AdminRoutes';
import Admin from '@/pages/Admin';
import DesplayProductPage from '@/pages/DesplayProductPage';
import EditProductPage from '@/pages/EditPage';
import Shop from '@/pages/Shop';
import Wishlist from '@/pages/Wishlist';
import { Orders } from '@/components/Orders/Orders';
import AddProducts from '@/components/dashBoard/addProducts';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route index path="/" element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="wishlist" element={<Wishlist />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/verify-2fa/:id/:email" element={<TwoFactorAuthForm />} />
      <Route path="/forgot-password" element={<PasswordResetRequestForm />} />
      <Route path="/reset-password/:token" element={<ResetPasswordForm />} />

      <Route
        path="/dashboard"
        element={
          <AdminRoutes>
            <DashboardLayout />
          </AdminRoutes>
        }
      >
        <Route index element={<Admin />} />
        <Route path="/dashboard/orders" element={<Orders />} />
        <Route
          index
          path="/dashboard/product"
          element={<DesplayProductPage />}
        />
        <Route
          index
          path="/dashboard/product/:id"
          element={<EditProductPage />}
        />
        <Route index path="/dashboard/addProduct/" element={<AddProducts />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/forgot-password" element={<PasswordResetRequestForm />} />
      <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
    </Routes>
  );
}

export default AppRoutes;
