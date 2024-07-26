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
import ContactPage from '@/pages/contact';
import Wishlist from '@/pages/Wishlist';
import Orders from '@/pages/Orders';
import AddProducts from '@/components/dashBoard/addProducts';
import ProductDetails from '@/pages/ProductDetails';
import ProtectedRoute from '@/components/ProtectedRoute';
import Cart from '@/components/Cart/Cart';
import Seller from '@/pages/Seller';
import CheckoutPage from '@/pages/Checkout';
import Aboutus from '@/components/home/Aboutus';
import AddCoupon from '@/pages/AddCoupon';
import Coupons from '@/pages/Coupons';
import EditCoupon from '@/pages/EditCoupon';
import TableUserRole from '@/components/dashBoard/UserRole';
import Customer from '@/pages/customer';
import Category from '@/components/dashBoard/Category';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route index path="/" element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="about" element={<Aboutus />} />
        <Route
          path="wishlist"
          element={
            <ProtectedRoute roles={['Buyer']}>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route path="product-details/:id" element={<ProductDetails />} />
        <Route
          path="cart"
          element={
            <ProtectedRoute roles={['Buyer']}>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <ProtectedRoute roles={['Buyer']}>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
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
        <Route path="/dashboard/seller" element={<Seller />} />
        <Route path="/dashboard/customers" element={<Customer />} />
        <Route path="/dashboard/category" element={<Category />} />
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
        <Route index path="/dashboard/coupons" element={<Coupons />} />
        <Route index path="/dashboard/addCoupons/" element={<AddCoupon />} />
        <Route path="/dashboard/editCoupon/:id" element={<EditCoupon />} />
        <Route index path="/dashboard/userRole/" element={<TableUserRole />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/forgot-password" element={<PasswordResetRequestForm />} />
      <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
    </Routes>
  );
}

export default AppRoutes;
