import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeLayout from '@/layout/HomeLayout';
import Home from '@/pages/Home';
import ErrorPage from '@/pages/ErrorPage';
import SignUp from '@/pages/SignUp';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route index path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
