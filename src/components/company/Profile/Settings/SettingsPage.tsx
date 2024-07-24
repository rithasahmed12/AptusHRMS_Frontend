import { useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { SettingOutlined, LockOutlined, MenuOutlined } from '@ant-design/icons';

const Settings = () => {
  const { id } = useParams<{id:string}>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (

    <div className="flex justify-center w-full">
      <div className="w-full max-w-7xl bg-white shadow-md rounded-lg p-4">
        <button 
          className="md:hidden mb-4 p-2 bg-blue-500 text-white rounded flex items-center"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <MenuOutlined className="mr-2" />
          {isSidebarOpen ? 'Menu' : 'Menu'}
        </button>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar */}
          <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-1/4 bg-gray-50 rounded-lg p-4`}>
            <ul className="space-y-2">
              <li>
                <NavLink 
                  to={`/c/profile/${id}/settings/general`} 
                  className={({ isActive }) => `flex items-center p-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                >
                  <SettingOutlined className="mr-2" />
                  General Settings
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to={`/c/profile/${id}/settings/password`} 
                  className={({ isActive }) => `flex items-center p-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                >
                  <LockOutlined className="mr-2" />
                  Change Password
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Content */}
          <div className="w-full md:w-3/4 bg-white rounded-lg p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;