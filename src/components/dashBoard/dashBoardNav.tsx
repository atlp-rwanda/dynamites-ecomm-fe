import { useState } from 'react';
import { FaBell, FaAngleDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import HSButton from '@/components/form/HSButton';
import { logout } from '@/features/Auth/SignInSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

function DashNavbar() {
  const dispatch = useAppDispatch();
  const [toggleProfileMenu, setToggleProfileMenu] = useState(false);
  const user = useAppSelector((state) => state.signIn.user);
  const navigate = useNavigate();

  const handleProfileMenuToggle = () => {
    setToggleProfileMenu(!toggleProfileMenu);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleProfileMenuToggle();
    }
  };

  return (
    <div className="relative flex items-center justify-between w-full h-16 shadow-sm">
      <div className="lg:hidden ml-8"></div>
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="logo" className="w-8 h-8" />
        <h2 className="text-textBlack font-bold">Dynamites</h2>
        <h2 className="text-textBlack font-extrabold hidden lg:block ml-20">
          Dashboard
        </h2>
      </div>
      <div className="flex items-center gap-1 sm:gap-8 mr-4 ">
        <div className="relative">
          <FaBell size="20" color="#424856" title="notifications" />
          <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-700 text-white flex items-center justify-center text-xs">
            1
          </div>
        </div>
        {user ? (
          <div
            className="flex items-center gap-1 sm:gap-2 cursor-pointer"
            onClick={handleProfileMenuToggle}
            onKeyPress={handleKeyPress}
            role="button"
            tabIndex={0}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src={user.picture}
                className="w-full h-full object-cover"
                alt="profile"
              />
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-textBlack text-sm hidden lg:block">{`${user.firstName} ${user.lastName}`}</h2>
              {/* <span className="text-grey text-xs">{user.role}</span> */}
            </div>
            <FaAngleDown size="15" color="#424856" title="toggleProfile" />
          </div>
        ) : (
          <HSButton path="/signIn" title="Login" styles="hidden lg:flex" />
        )}
      </div>
      {toggleProfileMenu && (
        <div className="bg-white absolute z-20 top-16 right-0 flex flex-col items-center w-52 shadow-sm py-2 text-grey rounded-b-md border-l border-b border-lightGrey">
          <div className="flex flex-col w-full gap-2 border-b-[1.5px] border-lightGrey py-2">
            <div className="flex gap-2 w-full items-center px-2">
              <img src="/edit.png" width="20" height="20" alt="edit" />
              <h2>Edit profile</h2>
            </div>
            <div className="flex gap-2 w-full items-center px-2">
              <img src="/settings.png" width="20" height="20" alt="settings" />
              <h2>Preferences</h2>
            </div>
          </div>
          <div className="flex items-center w-full justify-between pr-2 py-2 border-b-[1.5px] border-lightGrey">
            <div className="flex gap-2 items-center px-2">
              <img src="/moon.png" width="20" height="20" alt="moon" />
              <h2>Night mode</h2>
            </div>
            <div className="rounded-xl w-9 h-5 bg-custom-purple flex items-center justify-end px-1">
              <div className="bg-white rounded-full w-3 h-3" />
            </div>
          </div>
          <div className="flex gap-2 w-full items-center px-2 pt-1">
            <img src="/help.png" width="20" height="20" alt="help" />
            <h2>Help center</h2>
          </div>
          <button
            type="button"
            className="border-none outline-none bg-transparent flex gap-2 w-full items-center px-2 border-t-[1.5px] border-lightGrey pt-1 mt-8 cursor-pointer"
            onClick={() => {
              setToggleProfileMenu(false);
              dispatch(logout());
              navigate('/');
            }}
          >
            <img src="/signout.png" width="20" height="20" alt="signout" />
            <h2>Sign out</h2>
          </button>
        </div>
      )}
    </div>
  );
}

export default DashNavbar;
