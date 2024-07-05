import {
  ArrowLeftEndOnRectangleIcon,
  InboxStackIcon,
  UserCircleIcon,
  ChevronRightIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Modal,message } from "antd"; 
import { companyLogout } from "../../../redux/slices/companySlice/companySlice";

interface SidebarProps {
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
  companyLogo?: string; 
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarExpanded, toggleSidebar,companyLogo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOrgOpen, setIsOrgOpen] = useState(false);
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
<div className={`flex flex-col ${isSidebarExpanded ? 'w-64' : 'w-20'} transition-width duration-300 py-7 px-2 absolute top-1 h-full left-0 bg-white shadow-lg`}>
      {/* Logo placeholder */}
      <div className={`mb-6 ${isSidebarExpanded ? 'px-4' : 'px-2'} flex justify-center items-center`}>
        {companyLogo ? (
          <img 
            src={companyLogo} 
            alt="Company Logo" 
            className={`${isSidebarExpanded ? 'w-20 h-20' : 'w-16 h-16'} object-contain`}
          />
        ) : (
          <div className={`${isSidebarExpanded ? 'w-20 h-20' : 'w-16 h-16'} bg-gray-200 flex items-center justify-center rounded-full`}>
            <UserCircleIcon className="w-3/4 h-3/4 text-gray-400" />
          </div>
        )}
      </div>

      <button
        onClick={toggleSidebar}
        className="mb-4 px-4 py-2 flex items-center justify-center bg-gray-200 rounded transition duration-300 cursor-pointer"
      >
        <Bars3Icon height={24} color="#3d3d3d" />
      </button>
      <nav className="space-y-1">
        <NavLink
          to="/c/dashboard"
          className={({ isActive }) =>
            `py-2.5 px-4 gap-3 flex items-center rounded transition duration-300 cursor-pointer ${
              isActive
                ? "bg-black font-semibold text-white"
                : "hover:bg-gray-200"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <InboxStackIcon
                height={24}
                color={isActive ? "white" : "#3d3d3d"}
              />
              {isSidebarExpanded && 'Dashboard'}
            </>
          )}
        </NavLink>

        <NavLink
          to="/c/announcements"
          className={({ isActive }) =>
            `py-2.5 px-4 gap-3 flex items-center rounded transition duration-300 cursor-pointer ${
              isActive
                ? "bg-black font-semibold text-white"
                : "hover:bg-gray-200"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <InboxStackIcon
                height={24}
                color={isActive ? "white" : "#3d3d3d"}
              />
              {isSidebarExpanded && 'Announcements'}
            </>
          )}
        </NavLink>

        <NavLink
          to="/c/employees"
          className={({ isActive }) =>
            `py-2.5 px-4 gap-3 flex items-center rounded transition duration-300 cursor-pointer ${
              isActive
                ? "bg-black font-semibold text-white"
                : "hover:bg-gray-200"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <UserCircleIcon
                height={24}
                color={isActive ? "white" : "#3d3d3d"}
              />
              {isSidebarExpanded && 'Employees'}
            </>
          )}
        </NavLink>

        <NavLink
          to="/c/projects"
          className={({ isActive }) =>
            `py-2.5 px-4 gap-3 flex items-center rounded transition duration-300 cursor-pointer ${
              isActive
                ? "bg-black font-semibold text-white"
                : "hover:bg-gray-200"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <UserCircleIcon
                height={24}
                color={isActive ? "white" : "#3d3d3d"}
              />
              {isSidebarExpanded && 'Projects'}
            </>
          )}
        </NavLink>

        <div>
          <button
            onClick={() => setIsOrgOpen(!isOrgOpen)}
            className={`py-2.5 px-4 gap-3 w-full flex justify-between items-center rounded transition duration-300 cursor-pointer ${
              isOrgOpen ? "bg-gray-200" : "hover:bg-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <UserCircleIcon height={24} color="#3d3d3d" />
              {isSidebarExpanded && 'Organization'}
            </div>
            <div
              className={`transition-transform ${
                isOrgOpen ? "rotate-90" : "rotate-0"
              }`}
            >
              <ChevronRightIcon height={24} color="#3d3d3d" />
            </div>
          </button>
          {isOrgOpen && isSidebarExpanded && (
            <div className="pl-8 space-y-1">
              <NavLink
                to="/c/organization/department"
                className={({ isActive }) =>
                  `py-2.5 px-4 gap-3 flex rounded transition duration-300 cursor-pointer ${
                    isActive
                      ? "bg-black font-semibold text-white"
                      : "hover:bg-gray-200"
                  }`
                }
              >
                • Department
              </NavLink>
              <NavLink
                to="/c/organization/designation"
                className={({ isActive }) =>
                  `py-2.5 px-4 gap-3 flex rounded transition duration-300 cursor-pointer ${
                    isActive
                      ? "bg-black font-semibold text-white"
                      : "hover:bg-gray-200"
                  }`
                }
              >
                • Designation
              </NavLink>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => setIsOrgOpen(!isOrgOpen)}
            className={`py-2.5 px-4 gap-3 w-full flex justify-between items-center rounded transition duration-300 cursor-pointer ${
              isOrgOpen ? "bg-gray-200" : "hover:bg-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <UserCircleIcon height={24} color="#3d3d3d" />
              {isSidebarExpanded && 'Leave'}
            </div>
            <div
              className={`transition-transform ${
                isOrgOpen ? "rotate-90" : "rotate-0"
              }`}
            >
              <ChevronRightIcon height={24} color="#3d3d3d" />
            </div>
          </button>
          {isOrgOpen && isSidebarExpanded && (
            <div className="pl-8 space-y-1">
              <NavLink
                to="/c/workshift"
                className={({ isActive }) =>
                  `py-2.5 px-4 gap-3 flex rounded transition duration-300 cursor-pointer ${
                    isActive
                      ? "bg-black font-semibold text-white"
                      : "hover:bg-gray-200"
                  }`
                }
              >
                • Workshift
              </NavLink>
           
            </div>
          )}
        </div>

        <button
          onClick={showModal}
          className={`py-2.5 px-4 gap-3 w-full flex items-center rounded transition duration-300 cursor-pointer hover:bg-gray-100`}
        >
          <ArrowLeftEndOnRectangleIcon height={24} color="#3d3d3d" />
          {isSidebarExpanded && 'Logout'}
        </button>
      </nav>

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
    </div>
  );
};

export default Sidebar;
