import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute top-16 h-full left-0">
      <nav className="space-y-1">
        <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          Dashboard
        </a>
        <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          Requests
        </a>
        <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          Customers
        </a>
        <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          Plans
        </a>
        <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          Logout
        </a>
      </nav>
    </div>
  );
}

export default Sidebar;
