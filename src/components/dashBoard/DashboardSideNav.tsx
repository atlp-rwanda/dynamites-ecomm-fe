import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { RiCoupon2Line } from 'react-icons/ri';
import { MdDashboard } from 'react-icons/md';
import {
  ShoppingCart,
  Users,
  Box,
  ChevronDown,
  ChevronRight,
  Store,
  User,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';

const sideBarItems = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: <MdDashboard className="icon" />,
    role: ['Admin', 'Vendor'],
  },
  {
    path: '/dashboard/orders',
    name: 'Orders',
    icon: <ShoppingCart className="icon" />,
    subItems: [
      {
        path: '/dashboard/orders',
        name: 'All orders',
        role: ['Admin', 'Vendor'],
      },
    ],
    role: ['Admin', 'Vendor'],
  },
  {
    path: '/dashboard/customers',
    name: 'Customers',
    icon: <Users className="icon" />,
    subItems: [
      {
        name: 'All customers',
        path: '/dashboard/customers',
        role: ['Admin'],
      },
    ],
    role: ['Admin'],
  },
  {
    name: 'seller',
    path: '/dashboard/seller',
    role: ['Admin'],
    icon: <Store className="icon" />,
  },
  {
    name: 'Products',
    icon: <Box className="icon" />,
    subItems: [
      {
        path: '/dashboard/product',
        name: 'All Products',
        role: ['Admin', 'Vendor'],
      },
      {
        path: '/dashboard/addProduct',
        name: 'Add New',
        role: ['Vendor'],
      },
      {
        path: '/dashboard/category',
        name: 'Categories',
        role: ['Admin'],
      },
    ],
    role: ['Admin', 'Vendor'],
  },
  {
    path: '/dashboard/coupons',
    name: 'Coupons',
    icon: <RiCoupon2Line className="icon" size={24} />,
    subItems: [
      {
        path: '/dashboard/coupons',
        name: 'All coupons',
        role: ['Admin', 'Vendor'],
      },
      {
        path: '/dashboard/addCoupons',
        name: 'Add New',
        role: ['Vendor'],
      },
    ],
    role: ['Admin', 'Vendor'],
  },
  {
    name: 'user Role',
    icon: <User className="icon" />,
    subItems: [
      {
        name: 'Add & All Roles',
        path: '/dashboard/userRole',
        role: ['Admin'],
      },
    ],
    role: ['Admin'],
  },
];

interface SideBarItemProps {
  item: {
    path?: string;
    name: string;
    icon: React.ReactNode;
    subItems?: { path: string; name: string; role: string[] }[];
  };
  activeItem: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
  Role: string;
}

function SideBarItem({
  item,
  activeItem,
  setActiveItem,
  Role,
}: SideBarItemProps) {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <li
      className={`p-3 ${activeItem === item.name ? 'bg-primary-lightblue' : ''}`}
    >
      <div
        className="flex items-center justify-between cursor-pointer hover:bg-primary text-black hover:text-white p-2 rounded-md transition-all duration-300 ease-in-out"
        onClick={() => {
          if (item.subItems) {
            handleExpand();
          } else {
            setActiveItem(item.name);
          }
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            if (item.subItems) {
              handleExpand();
            } else {
              setActiveItem(item.name);
            }
          }
        }}
      >
        <div className="flex items-center gap-3 text-lg ">
          {item.icon}
          <Link to={item.path!}>
            <span>{item.name}</span>
          </Link>
        </div>
        {item.subItems &&
          (expanded ? (
            <ChevronDown className="ml-6" />
          ) : (
            <ChevronRight className="ml-6" />
          ))}
      </div>
      {expanded && item.subItems && (
        <ul className="p-2 bg-grayLight rounded-b-md">
          {item.subItems.map((subItem) => {
            if (subItem.role.includes(Role!)) {
              return (
                <li
                  key={subItem.name}
                  className="px-2 py-1 font-light text-black hover:text-white hover:bg-primary w-full rounded-sm transition-all duration-300 ease-in-out"
                >
                  <Link
                    to={subItem.path}
                    className="flex items-center gap-3 text-lg  "
                    onClick={() => setActiveItem(subItem.name)}
                  >
                    <span>{subItem.name}</span>
                  </Link>
                </li>
              );
            }

            return null;
          })}
        </ul>
      )}
    </li>
  );
}

function DashboardSideNav() {
  const Role = useAppSelector((state) => state.signIn.user?.userType.name);

  const [isVisible, setIsVisible] = useState(false);
  const [activeItem, setActiveItem] = useState<string>('Dashboard');

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-3 z-50 p-1"
        onClick={toggleSidebar}
        type="button"
        aria-label="Toggle Menu"
      >
        <AiOutlineMenu className="text-2xl" />
      </button>
      <aside
        className={`h-screen bg-white fixed left-0 z-40 ${isVisible ? 'block' : 'hidden'} lg:block`}
      >
        <nav className="h-full flex flex-col justify-between shadow-sm">
          <ul className="flex-1 mt-6">
            <li className="lg:hidden flex justify-end p-3">
              <button
                onClick={toggleSidebar}
                type="button"
                aria-label="Close Menu"
              >
                <AiOutlineClose className="text-2xl cursor-pointer" />
              </button>
            </li>
            {sideBarItems.map((item) => {
              if (item.role.includes(Role!)) {
                return (
                  <SideBarItem
                    Role={Role!}
                    key={item.name}
                    item={item}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                  />
                );
              }
              return null;
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default DashboardSideNav;
