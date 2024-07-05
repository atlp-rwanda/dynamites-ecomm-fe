import { Outlet } from 'react-router-dom';
import DashboardSideNav from '@/components/dashBoard/DashboardSideNav';
import Navbar from '@/components/Navbar';

function DashboardLayout() {
  return (
    <div className="bg-[#F5F6F6] flex-1 flex flex-col w-full min-h-screen">
      <div className="bg-white">
        <Navbar />
      </div>
      <div className="flex flex-1">
        <DashboardSideNav />
      </div>
      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
