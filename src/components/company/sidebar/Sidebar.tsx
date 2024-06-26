import {
  ArrowLeftEndOnRectangleIcon,
  BellAlertIcon,
  DocumentMagnifyingGlassIcon,
  InboxStackIcon,
  UserCircleIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../redux/slices/adminSlice/adminSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

interface SidebarProps {
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarExpanded, toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOrgOpen, setIsOrgOpen] = useState(false);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Question",
      text: "Are you sure you want to Logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      dispatch(logout());
      navigate("/admin");
      toast.success("Logout Successful!");
    }
  };

  return (
    <div className={`flex flex-col ${isSidebarExpanded ? 'w-64' : 'w-20'} transition-width duration-300 py-7 px-2 absolute top-16 h-full left-0 bg-white shadow-lg`}>
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

        <button
          onClick={handleLogout}
          className={`py-2.5 px-4 gap-3 w-full flex items-center rounded transition duration-300 cursor-pointer hover:bg-gray-100`}
        >
          <ArrowLeftEndOnRectangleIcon height={24} color="#3d3d3d" />
          {isSidebarExpanded && 'Logout'}
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
