import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import HomeLayout from '@/layout/HomeLayout';
import Home from '@/pages/Home';
import ErrorPage from '@/pages/ErrorPage';
=======
import Home from '@/pages/Home';
import SignUp from '@/pages/SignUp';
>>>>>>> a377684 (add signup page)

function AppRoutes() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route element={<HomeLayout />}>
          <Route index path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
=======
        <Route index element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
>>>>>>> a377684 (add signup page)
        {/* Add many routes as you want */}
      </Routes>
    </Router>
  );
}

<<<<<<< HEAD
export default AppRoutes;
=======
export default AppRoutes;
>>>>>>> a377684 (add signup page)
