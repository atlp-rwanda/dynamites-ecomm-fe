import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { LuShoppingCart } from 'react-icons/lu';
import { FiHeart } from 'react-icons/fi';
import { FaAngleDown } from 'react-icons/fa6';
import { RxHamburgerMenu } from 'react-icons/rx';

function Navbar() {
  const location = useLocation();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleProfileMenu, setToggleProfileMenu] = useState(false);
  return (
    <div className="relative flex items-center justify-between w-full h-16 shadow-sm">
      <RxHamburgerMenu
        title="hamburger"
        size="20"
        color="#424856"
        className="lg:hidden ml-8"
        onClick={() => setToggleMenu(!toggleMenu)}
      />
      <div className="flex items-center gap-2 md:ml-8">
        <img src="/logo.png" alt="logo" />
        <h2 className="text-textBlack font-bold">Dynamites</h2>
      </div>
      <nav className="xs:hidden lg:flex items-center h-full">
        <Link
          to="/"
          className={`${location.pathname === '/' ? 'border-b-[2px] border-primary text-primary' : 'text-grey'} h-full flex items-center justify-center pl-4 pr-8`}
        >
          Home
        </Link>
        <Link
          to="/shop"
          className={`${location.pathname === '/shop' ? 'border-b-[2px] border-primary text-primary' : 'text-grey'} h-full flex items-center justify-center pl-4 pr-8`}
        >
          Shop
        </Link>
        <Link
          to="/about"
          className={`${location.pathname === '/about' ? 'border-b-[2px] border-primary text-primary' : 'text-grey'} h-full flex items-center justify-center pl-4 pr-8`}
        >
          About Us
        </Link>
        <div
          className={`${location.pathname === '/contact' ? 'border-b-[2px] border-primary text-primary' : 'text-grey'} flex items-center gap-2 h-full pl-4 pr-8`}
        >
          <Link
            to="/contact"
            className="h-full flex items-center justify-center"
          >
            Contact
          </Link>
          <FaAngleDown size="15" color="#424856" title="contact" />
        </div>
      </nav>
      <div className="flex items-center gap-8 mr-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <LuShoppingCart size="20" color="#424856" title="cart" />
            <div className="flex items-center justify-center w-4 h-4 rounded-full bg-red-700 text-white absolute right-[-0.3rem] top-[-0.2rem] text-sm">
              5
            </div>
          </div>
          <FiHeart color="#424856" size="20" title="wishlist" />
        </div>
        <div className="xs:hidden lg:flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src="/avatar.jpg"
              className="w-full h-full object-cover"
              alt="profile"
            />
          </div>
          <h2 className="text-textBlack">Amanda Green</h2>
          <FaAngleDown
            size="15"
            color="#424856"
            title="toggleProfile"
            onClick={() => setToggleProfileMenu(!toggleProfileMenu)}
          />
        </div>
      </div>
      {toggleMenu && (
        <div className="bg-white absolute z-20 top-16 flex flex-col items-start p-4 w-full gap-4 text-grey shadow-md border-b border-lightGrey">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="contact">Contact</Link>
          <div className="flex flex-col w-full gap-2 border-b-[1.5px] border-lightGrey py-2">
            <div className="flex gap-2 w-full items-center">
              <img src="/edit.png" width="20" height="20" alt="edit" />
              <h2>Edit profile</h2>
            </div>
            <div className="flex gap-2 w-full items-center">
              <img src="/settings.png" width="20" height="20" alt="settings" />
              <h2>Preferences</h2>
            </div>
          </div>
          <div className="flex items-center w-full justify-between pr-2 py-2 border-b-[1.5px] border-lightGrey">
            <div className="flex gap-2 items-center">
              <img src="/moon.png" width="20" height="20" alt="moon" />
              <h2>Night mode</h2>
            </div>
            <div className="rounded-xl w-9 h-5 bg-custom-purple flex items-center justify-end px-1">
              <div className="bg-white rounded-full w-3 h-3" />
            </div>
          </div>
          <div className="flex gap-2 w-full items-center pt-1">
            <img src="/help.png" width="20" height="20" alt="help" />
            <h2>Help center</h2>
          </div>
          <div className="flex gap-2 w-full items-center border-t-[1.5px] border-lightGrey pt-1 mt-8">
            <img src="/signout.png" width="20" height="20" alt="signout" />
            <h2>Sign out</h2>
          </div>
        </div>
      )}
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
          <div className="flex gap-2 w-full items-center px-2 border-t-[1.5px] border-lightGrey pt-1 mt-8">
            <img src="/signout.png" width="20" height="20" alt="signout" />
            <h2>Sign out</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
