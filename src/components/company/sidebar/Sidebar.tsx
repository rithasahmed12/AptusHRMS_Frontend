import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Modal, message } from "antd";
import { companyLogout } from "../../../redux/slices/companySlice/companySlice";
import {
  DashboardOutlined,
  NotificationOutlined,
  UserOutlined,
  ProjectOutlined,
  BankOutlined,
  ApartmentOutlined,
  TagOutlined,
  ClockCircleOutlined,
  ContactsOutlined,
  FieldTimeOutlined,
  CalendarOutlined,
  ScheduleOutlined,
  LogoutOutlined,
  MenuOutlined,
  RightOutlined,
  AppstoreOutlined,
  LaptopOutlined,
  FormOutlined,
} from "@ant-design/icons";

interface SidebarProps {
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
  companyLogo?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarExpanded,
  toggleSidebar,
  companyLogo,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOrgOpen, setIsOrgOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isAssetsOpen, setIsAssetsOpen] = useState(false);
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
    <div
      className={`flex flex-col ${
        isSidebarExpanded ? "w-64" : "w-20"
      } transition-width duration-300 py-7 px-2 text-sm absolute top-1 h-full left-0 bg-white shadow-lg`}
    >
      <div
        className={`mb-6 ${
          isSidebarExpanded ? "px-4" : "px-2"
        } flex justify-center items-center`}
      >
        {companyLogo ? (
          <img
            src={companyLogo}
            alt="Company Logo"
            className={`${
              isSidebarExpanded ? "w-20 h-20" : "w-16 h-16"
            } object-contain`}
          />
        ) : (
          <div
            className={`${
              isSidebarExpanded ? "w-20 h-20" : "w-16 h-16"
            } bg-gray-200 flex items-center justify-center rounded-full`}
          >
            <UserOutlined style={{ fontSize: "32px", color: "#3d3d3d" }} />
          </div>
        )}
      </div>

      <button
        onClick={toggleSidebar}
        className="mb-4 px-4 py-2 flex items-center justify-center bg-gray-200 rounded transition duration-300 cursor-pointer"
      >
        <MenuOutlined style={{ fontSize: "24px", color: "#3d3d3d" }} />
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
              <DashboardOutlined
                style={{
                  fontSize: "24px",
                  color: isActive ? "white" : "#3d3d3d",
                }}
              />
              {isSidebarExpanded && "Dashboard"}
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
              <NotificationOutlined
                style={{
                  fontSize: "24px",
                  color: isActive ? "white" : "#3d3d3d",
                }}
              />
              {isSidebarExpanded && "Announcements"}
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
              <UserOutlined
                style={{
                  fontSize: "24px",
                  color: isActive ? "white" : "#3d3d3d",
                }}
              />
              {isSidebarExpanded && "Employees"}
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
              <ProjectOutlined
                style={{
                  fontSize: "24px",
                  color: isActive ? "white" : "#3d3d3d",
                }}
              />
              {isSidebarExpanded && "Projects"}
            </>
          )}
        </NavLink>

        <div>
          <button
            onClick={() => setIsOrgOpen(!isOrgOpen)}
            className={`py-2.5 px-4 gap-3 w-full flex justify-between mb-1 items-center rounded transition duration-300 cursor-pointer ${
              isOrgOpen ? "bg-gray-200" : "hover:bg-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <BankOutlined style={{ fontSize: "24px", color: "#3d3d3d" }} />
              {isSidebarExpanded && "Organization"}
            </div>
            <div
              className={`transition-transform ${
                isOrgOpen ? "rotate-90" : "rotate-0"
              }`}
            >
              {isSidebarExpanded && (
                <RightOutlined style={{ fontSize: "18px", color: "#3d3d3d" }} />
              )}
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
                <ApartmentOutlined style={{ fontSize: "16px" }} /> Department
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
                <TagOutlined style={{ fontSize: "16px" }} /> Designation
              </NavLink>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => setIsLeaveOpen(!isLeaveOpen)}
            className={`py-2.5 px-4 gap-3 w-full flex justify-between mb-1 items-center rounded transition duration-300 cursor-pointer ${
              isLeaveOpen ? "bg-gray-200" : "hover:bg-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <ClockCircleOutlined
                style={{ fontSize: "24px", color: "#3d3d3d" }}
              />
              {isSidebarExpanded && "Attendance"}
            </div>
            <div
              className={`transition-transform ${
                isLeaveOpen ? "rotate-90" : "rotate-0"
              }`}
            >
              {isSidebarExpanded && (
                <RightOutlined style={{ fontSize: "18px", color: "#3d3d3d" }} />
              )}
            </div>
          </button>
          {isLeaveOpen && isSidebarExpanded && (
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
                <FieldTimeOutlined style={{ fontSize: "16px" }} /> Workshift
              </NavLink>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => setIsAttendanceOpen(!isAttendanceOpen)}
            className={`py-2.5 px-4 gap-3 w-full flex justify-between mb-1 items-center rounded transition duration-300 cursor-pointer ${
              isAttendanceOpen ? "bg-gray-200" : "hover:bg-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <CalendarOutlined
                style={{ fontSize: "24px", color: "#3d3d3d" }}
              />
              {isSidebarExpanded && "Leave"}
            </div>
            <div
              className={`transition-transform ${
                isAttendanceOpen ? "rotate-90" : "rotate-0"
              }`}
            >
              {isSidebarExpanded && (
                <RightOutlined style={{ fontSize: "18px", color: "#3d3d3d" }} />
              )}
            </div>
          </button>
          {isAttendanceOpen && isSidebarExpanded && (
            <div className="pl-8 space-y-1">
              <NavLink
                to="/c/holidays"
                className={({ isActive }) =>
                  `py-2.5 px-4 gap-3 flex rounded transition duration-300 cursor-pointer ${
                    isActive
                      ? "bg-black font-semibold text-white"
                      : "hover:bg-gray-200"
                  }`
                }
              >
                <CalendarOutlined style={{ fontSize: "16px" }} /> Holidays
              </NavLink>
              <NavLink
                to="/c/leaves"
                className={({ isActive }) =>
                  `py-2.5 px-4 gap-3 flex rounded transition duration-300 cursor-pointer ${
                    isActive
                      ? "bg-black font-semibold text-white"
                      : "hover:bg-gray-200"
                  }`
                }
              >
                <ScheduleOutlined style={{ fontSize: "16px" }} /> Leaves
              </NavLink>
              <NavLink
                to="/c/leaveApplication"
                className={({ isActive }) =>
                  `py-2.5 px-4 gap-3 flex rounded transition duration-300 cursor-pointer ${
                    isActive
                      ? "bg-black font-semibold text-white"
                      : "hover:bg-gray-200"
                  }`
                }
              >
                <ContactsOutlined style={{ fontSize: "16px" }} /> Leave
                Application
              </NavLink>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => setIsAssetsOpen(!isAssetsOpen)}
            className={`py-2.5 px-4 gap-3 w-full flex justify-between mb-1 items-center rounded transition duration-300 cursor-pointer ${
              isAssetsOpen ? "bg-gray-200" : "hover:bg-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <AppstoreOutlined
                style={{ fontSize: "24px", color: "#3d3d3d" }}
              />
              {isSidebarExpanded && "Assets"}
            </div>
            <div
              className={`transition-transform ${
                isAssetsOpen ? "rotate-90" : "rotate-0"
              }`}
            >
              {isSidebarExpanded && (
                <RightOutlined style={{ fontSize: "18px", color: "#3d3d3d" }} />
              )}
            </div>
          </button>
          {isAssetsOpen && isSidebarExpanded && (
            <div className="pl-8 space-y-1">
              <NavLink
                to="/c/assets"
                className={({ isActive }) =>
                  `py-2.5 px-4 gap-3 flex rounded transition duration-300 cursor-pointer ${
                    isActive
                      ? "bg-black font-semibold text-white"
                      : "hover:bg-gray-200"
                  }`
                }
              >
                <LaptopOutlined style={{ fontSize: "16px" }} /> Assets List
              </NavLink>
              <NavLink
                to="/c/assetsApplication"
                className={({ isActive }) =>
                  `py-2.5 px-4 gap-3 flex rounded transition duration-300 cursor-pointer ${
                    isActive
                      ? "bg-black font-semibold text-white"
                      : "hover:bg-gray-200"
                  }`
                }
              >
                <FormOutlined style={{ fontSize: "16px" }} /> Assets Application
              </NavLink>
            </div>
          )}
        </div>

        <button
          onClick={showModal}
          className={`py-2.5 px-4 gap-3 w-full flex items-center rounded transition duration-300 cursor-pointer hover:bg-gray-100`}
        >
          <LogoutOutlined style={{ fontSize: "24px", color: "#3d3d3d" }} />
          {isSidebarExpanded && "Logout"}
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
