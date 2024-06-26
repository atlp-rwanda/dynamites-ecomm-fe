import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';

function HomeLayout() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
      <div>Footer</div>
    </div>
  );
}

export default HomeLayout;
