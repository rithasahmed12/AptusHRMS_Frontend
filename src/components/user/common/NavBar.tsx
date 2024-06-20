import { useState } from "react";
import BrownButton from "./BrownButton";
import { Link, NavLink} from "react-router-dom";



const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen); 

  return (
    <>
      <div className="flex justify-between h-14 items-center">
        {/* For Logo (Responsive Size) */}
        <div className="ms-16 cursor-pointer md:text-xl text-lg">
            <Link to='/'>
          <h1 className="text-brown-dark hover:text-brown-light transition duration-300 font-extrabold">
            APTUS
          </h1>
            </Link>
        </div>

        {/* Toggle Button for Sidebar*/}
        <button
          className="md:hidden text-brown-dark focus:outline-none absolute right-4 top-4"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Navigation Items (Hidden on Small Screens) */}
        <ul className="hidden md:flex items-center space-x-7">
          <li className="text-brown-dark cursor-pointer hover:border-b-2 hover:border-brown-light transition duration-500">Products</li>
          <NavLink to='/contact' className={({ isActive }) => (isActive ? 'border-b-2 border-brown-light' : '')}>
          <li className="text-brown-dark cursor-pointer hover:border-b-2 hover:border-brown-light transition duration-500">Contact Us</li>
          </NavLink>
          <NavLink to='/pricing' className={({ isActive }) => (isActive ? 'border-b-2 border-brown-light' : '')}>
          <li className="text-brown-dark cursor-pointer hover:border-b-2 hover:border-brown-light transition duration-500">Pricing</li>
          </NavLink>
          <li className="text-brown-dark cursor-pointer hover:border-b-2 hover:border-brown-light transition duration-500">About Us</li>
        </ul>

        {/* Trial Button (Responsive Size) */}
        <div className="me-16">
          <Link to='/purchase' >
          <BrownButton px={16} py={4} value="Get Free Trial" />
          </Link>
        </div>
      </div>

      {/* Sidebar (Visible on Small Screens) */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] overflow-auto bg-snow-dark px-6 py-4 transition duration-300 ease-in-out z-10 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <button className="absolute top-4 right-4 focus:outline-none" onClick={toggleSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <ul className="mt-6 space-y-2">
          <li className="text-brown-dark hover:text-brown-light cursor-pointer">Products</li>
          <NavLink to='/contact'>
          <li className="text-brown-dark hover:text-brown-light cursor-pointer">Contact Us</li>
          </NavLink>
          <NavLink to='/pricing'>
          <li className="text-brown-dark hover:text-brown-light cursor-pointer">Pricing</li>
          </NavLink>
          <li className="text-brown-dark hover:text-brown-light cursor-pointer">About Us</li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
