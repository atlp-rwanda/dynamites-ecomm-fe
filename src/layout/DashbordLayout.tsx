import { Outlet } from 'react-router-dom';
import DashboardSideNav from '@/components/dashBoard/DashboardSideNav';
import Navbar from '@/components/dashBoard/dashBoardNav';

function DashboardLayout() {
  return (
    <div className="bg-dashgrey flex flex-col  min-h-screen">
      {/* <ToastContainer /> */}
      <div className="fixed bg-white top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div>
        <div className="mt-16">
          <DashboardSideNav />
        </div>
        <div className="p-4 lg:ml-[200px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
