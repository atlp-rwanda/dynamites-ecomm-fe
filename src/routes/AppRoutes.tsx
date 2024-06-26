import { Route, Routes } from 'react-router-dom';
import HomeLayout from '@/layout/HomeLayout';
import Home from '@/pages/Home';
import ErrorPage from '@/pages/ErrorPage';
import SignUp from '@/pages/SignUp';
import SignIn from '@/pages/SignIn';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route index path="/" element={<Home />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
export default AppRoutes;
