import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { MdDashboard } from 'react-icons/md';
import {
  ShoppingCart,
  Users,
  Box,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

const sideBarItems = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: <MdDashboard className="icon" />,
  },
  {
    path: '/orders',
    name: 'Orders',
    icon: <ShoppingCart className="icon" />,
  },
  {
    path: '/customers',
    name: 'Customers',
    icon: <Users className="icon" />,
  },
  {
    name: 'Products',
    icon: <Box className="icon" />,
    subItems: [
      {
        path: '/dashboard/product',
        name: 'All Products',
      },
      {
        path: '/dashboard/addProduct',
        name: 'Add New',
      },
      {
        path: '/products/categories',
        name: 'Categories',
      },
      {
        path: '/products/tags',
        name: 'Tags',
      },
    ],
  },
];

interface SideBarItemProps {
  item: {
    path?: string;
    name: string;
    icon: React.ReactNode;
    subItems?: { path: string; name: string }[];
  };
  activeItem: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
}

function SideBarItem({ item, activeItem, setActiveItem }: SideBarItemProps) {
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
          <span>{item.name}</span>
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
          {item.subItems.map((subItem) => (
            <li
              key={subItem.name}
              className="px-2 py-1 text-black hover:text-white hover:bg-primary w-full rounded-sm transition-all duration-300 ease-in-out"
            >
              <a
                href={subItem.path}
                className="flex items-center gap-3 text-lg  "
                onClick={() => setActiveItem(subItem.name)}
              >
                <span>{subItem.name}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function DashboardSideNav() {
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
            {sideBarItems.map((item) => (
              <SideBarItem
                key={item.name}
                item={item}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default DashboardSideNav;
