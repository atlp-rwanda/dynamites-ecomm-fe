import { Route, Routes } from 'react-router-dom';
import HomeLayout from '@/layout/HomeLayout';
import Home from '@/pages/Home';
import ErrorPage from '@/pages/ErrorPage';
import SignUp from '@/pages/SignUp';
import SignIn from '@/pages/SignIn';
import TwoFactorAuthForm from '@/pages/TwoFactorAuthForm';
import DashboardLayout from '@/layout/DashbordLayout';
import DesplayProductPage from '@/pages/DesplayProductPage';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route index path="/" element={<Home />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/verify-2fa/:id/:email" element={<TwoFactorAuthForm />} />
      <Route path="/adminDashboard" element={<DashboardLayout />}>
        <Route
          index
          path="/adminDashboard/products"
          element={<DesplayProductPage />}
        />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
export default AppRoutes;
