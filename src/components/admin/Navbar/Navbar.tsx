import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { logout } from '../../../redux/slices/adminSlice/adminSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
            <span className="font-bold text-xl text-admin-orange xl:ml-[-70%] lg:ml-0"> AptusHR <span className="text-black">Admin</span>
            </span>
            </div>
          </div>
          <div className='flex items-center xl:mr-[-10%] lg:mr-0'>
            <span className="text-gray-700 mr-4">Welcome Back, Admin</span>
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)} 
                className="bg-gray-200 p-2 rounded-full focus:outline-none">
                <span className="sr-only">Open user menu</span>
                <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 w-full text-left">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
