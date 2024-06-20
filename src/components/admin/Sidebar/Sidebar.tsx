import { ArrowLeftEndOnRectangleIcon, BellAlertIcon, DocumentMagnifyingGlassIcon, InboxStackIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/slices/adminSlice/adminSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async()=>{
    const result = await Swal.fire({
      title: "Question",
      text: "Are you sure you want to Logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
    })
    if(result.isConfirmed){
      dispatch(logout());
      navigate('/admin')
      toast.success('Logout Successfull!')
    }
   
  }

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

        <button 
        onClick={handleLogout}
          className={
            `py-2.5 px-4 gap-3 w-full flex rounded transition duration-300 cursor-pointer hover:bg-gray-100`
          }
        >
          <ArrowLeftEndOnRectangleIcon height={24} color='#3d3d3d' />
          Logout
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;
