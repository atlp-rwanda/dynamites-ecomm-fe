import { Outlet } from 'react-router-dom';
import DashboardSideNav from '@/components/dashBoard/DashboardSideNav';
import Navbar from '@/components/Navbar';

function DashboardLayout() {
  return (
    <div className="bg-[#F5F6F6] flex-1 flex flex-col w-full min-h-screen">
      <div className="bg-white w-full">
        <Navbar />
      </div>
      <div className="flex flex-1 w-full">
        <div className=" w-[195px] h-full">
          <DashboardSideNav />
        </div>
        <div className="flex-1 p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
