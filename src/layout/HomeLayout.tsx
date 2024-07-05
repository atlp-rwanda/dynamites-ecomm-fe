import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer/Footer';

function HomeLayout() {
  return (
    <div>
      <ToastContainer />
      <div>
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default HomeLayout;
