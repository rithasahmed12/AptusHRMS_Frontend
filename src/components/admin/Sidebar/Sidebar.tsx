import { ArrowLeftEndOnRectangleIcon, BellAlertIcon, DocumentMagnifyingGlassIcon, InboxStackIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 space-y-6 py-7 px-2 absolute top-16 h-full left-0">
      <nav className="space-y-1">
        <NavLink 
          to='/admin/v1/dashboard' 
          className={({ isActive }) =>
            `py-2.5 px-4 gap-3 flex rounded transition duration-300 cursor-pointer hover:bg-gray-100 ${
              isActive ? 'bg-gray-200 font-semibold' : ''
            }`
          }
        >
          <InboxStackIcon height={24} color='#3d3d3d' />
          Dashboard
        </NavLink>

        <NavLink 
          to='/admin/v1/requests' 
          className={({ isActive }) =>
            `py-2.5 px-4 gap-3 flex rounded transition duration-300 cursor-pointer hover:bg-gray-100 ${
              isActive ? 'bg-gray-200 font-semibold' : ''
            }`
          }
        >
          <BellAlertIcon height={24} color='#3d3d3d' />
          Requests
        </NavLink>

        <NavLink 
          to='/admin/v1/customers' 
          className={({ isActive }) =>
            `py-2.5 px-4 gap-3 flex rounded transition duration-300 cursor-pointer hover:bg-gray-100 ${
              isActive ? 'bg-gray-200 font-semibold' : ''
            }`
          }
        >
          <UserCircleIcon height={24} color='#3d3d3d' />
          Customers
        </NavLink>

        <NavLink 
          to='/admin/v1/plans' 
          className={({ isActive }) =>
            `py-2.5 px-4 gap-3 flex rounded transition duration-300 cursor-pointer hover:bg-gray-100 ${
              isActive ? 'bg-gray-200 font-semibold' : ''
            }`
          }
        >
          <DocumentMagnifyingGlassIcon height={24} color='#3d3d3d' />
          Plans
        </NavLink>

        <NavLink 
          to='/admin/v1/logout'
          className={({ isActive }) =>
            `py-2.5 px-4 gap-3 flex rounded transition duration-300 cursor-pointer hover:bg-gray-100 ${
              isActive ? 'bg-gray-200 font-semibold' : ''
            }`
          }
        >
          <ArrowLeftEndOnRectangleIcon height={24} color='#3d3d3d' />
          Logout
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
