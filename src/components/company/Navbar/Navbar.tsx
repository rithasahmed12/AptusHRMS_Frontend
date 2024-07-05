import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { companyLogout } from "../../../redux/slices/companySlice/companySlice";
import { Modal, message, Dropdown, MenuProps } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const userInfo = useSelector((store: any) => store.companyInfo.companyInfo);
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

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      showModal();
    } else if (e.key === "profile") {
      navigate(`/c/profile/${userInfo.id}/user`);
    }
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      className: "w-[130px]",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
    },
  ];

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to='/' className="font-bold text-xl text-black">{userInfo.companyName}</Link>
            </div>
          </div>
          <div className="flex items-center">
            {/* <span className="text-gray-700 mr-4">Welcome Back, Admin</span> */}
            <Dropdown
              menu={{ items: menuItems, onClick: handleMenuClick }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <button className="bg-gray-200 p-2 rounded-full focus:outline-none flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center mr-1">
                  {userInfo && userInfo.profilePic ? (
                    <img
                      src={userInfo.profilePic}
                      alt="User profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserOutlined style={{ fontSize: "20px" }} />
                  )}
                </div>
                <svg
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </Dropdown> 
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
