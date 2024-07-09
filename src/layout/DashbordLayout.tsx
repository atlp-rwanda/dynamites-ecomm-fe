import { Outlet } from 'react-router-dom';
import DashboardSideNav from '@/components/dashBoard/DashboardSideNav';
import Navbar from '@/components/dashBoard/dashBoardNav';

function DashboardLayout() {
  return (
    <div className="bg-[#F5F6F6] flex flex-col w-full min-h-screen">
      <div className="fixed bg-white top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div>
        <div className="mt-16">
          <DashboardSideNav />
        </div>
        <div className="p-4 lg:ml-[200px] min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
