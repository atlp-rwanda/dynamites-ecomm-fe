import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeLayout from '@/layout/HomeLayout';
import Home from '@/pages/Home';
import ErrorPage from '@/pages/ErrorPage';
import Shop from '@/pages/Shop';
import About from '@/pages/About';
import Contact from '@/pages/Contact';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
        {/* Add many routes as you want */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
