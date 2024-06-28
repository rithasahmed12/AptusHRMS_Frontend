import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { companyLogout } from '../../../redux/slices/companySlice/companySlice';
import { Modal, message } from 'antd';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false); 

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    dispatch(companyLogout());
    navigate("/");
    message.success("Logout Successful!");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

 

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="font-bold text-xl text-black">YOUR COMPANY</span>
            </div>
          </div>
          <div className='flex items-center'>
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
                <div className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                  <button
                    onClick={showModal}
                    className="block px-4 py-2 text-sm text-gray-700 w-full text-left">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Confirm Logout"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Logout"
        cancelText="Cancel"
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </nav>
  );
};

export default Navbar;
