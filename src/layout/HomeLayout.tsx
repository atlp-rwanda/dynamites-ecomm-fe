import { Outlet } from 'react-router-dom';

function HomeLayout() {
  return (
    <div>
      <div>Nav</div>
      <div>
        <Outlet />
      </div>
      <div>Fotter</div>
    </div>
  );
}

export default HomeLayout;
