import React from 'react';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import EmployeeView from './UserProfile/UserProfile';
import { NavLink, Outlet, useParams } from 'react-router-dom';

interface ProfileContextType {
  id: string;
}

const ProfilePage = () => {
  const { id } = useParams<{id:string}>();
  return (
    <div className="bg-gray-100 min-h-screen">


      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-4">
            <NavLink to={`/c/profile/${id}/user`} className={({ isActive }) =>`py-4 px-2 border-b-2 ${isActive?'border-blue-500 text-blue-500':''} `}>My Profile</NavLink>
            <li className="py-4 px-2">Payroll History</li>
            <li className="py-4 px-2">Leaves</li>
            <NavLink to={`/c/profile/${id}/company`}  className={({ isActive }) =>`py-4 px-2 border-b-2 ${isActive?'border-blue-500 text-blue-500':''} `}>Company Profile</NavLink>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">

          <Outlet context={{id}}/>

      </div>
    </div>
  );
};

export default ProfilePage;