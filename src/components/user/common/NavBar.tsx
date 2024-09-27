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
        <div className="ms-4 sm:ms-16 cursor-pointer text-sm sm:text-lg md:text-xl">
            <Link to='/'>
          <h1 className="text-brown-dark hover:text-brown-light transition duration-300 font-extrabold">
            APTUS HRMS
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
          <NavLink to='/contact' className={({ isActive }) => (isActive ? 'border-b-2 border-brown-light' : '')}>
          <li className="text-brown-dark cursor-pointer hover:border-b-2 hover:border-brown-light transition duration-500">Contact Us</li>
          </NavLink>
          <NavLink to='/pricing' className={({ isActive }) => (isActive ? 'border-b-2 border-brown-light' : '')}>
          <li className="text-brown-dark cursor-pointer hover:border-b-2 hover:border-brown-light transition duration-500">Pricing</li>
          </NavLink>
          <NavLink to='/about' className={({ isActive }) => (isActive ? 'border-b-2 border-brown-light' : '')}>
          <li className="text-brown-dark cursor-pointer hover:border-b-2 hover:border-brown-light transition duration-500">About</li>
          </NavLink>
        </ul>

        {/* Trial Button (Responsive Size) */}
        <div className="me-7 sm:me-16">
          <Link to='/purchase'>
            <div className="transform scale-75 sm:scale-100">
              <BrownButton px={16} py={4} value="Get yours now" />
            </div>
          </Link>
        </div>
      </div>

    {/* Sidebar (Visible on Small Screens) */}
<div
  className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-snow-dark shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
    isOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  <div className="flex flex-col h-full">
    {/* Header */}
    <div className="flex justify-between items-center p-4 border-b border-brown-light">
      <Link to='/' onClick={toggleSidebar}>
        <h1 className="text-2xl font-bold text-brown-dark">APTUS HRMS</h1>
      </Link>
      <button
        className="text-brown-dark focus:outline-none"
        onClick={toggleSidebar}
      >
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
    </div>

    {/* Navigation Links */}
    <nav className="flex-grow py-6">
      <ul className="space-y-2">
        <NavLink 
          to='/contact' 
          className={({ isActive }) => 
            `block px-4 py-2 text-lg ${isActive 
              ? 'text-brown-dark font-semibold bg-snow' 
              : 'text-brown-light hover:text-brown-dark hover:bg-snow-light'
            }`
          }
          onClick={toggleSidebar}
        >
          <li>Contact Us</li>
        </NavLink>
        <NavLink 
          to='/pricing' 
          className={({ isActive }) => 
            `block px-4 py-2 text-lg ${isActive 
              ? 'text-brown-dark font-semibold bg-snow' 
              : 'text-brown-light hover:text-brown-dark hover:bg-snow-light'
            }`
          }
          onClick={toggleSidebar}
        >
          <li>Pricing</li>
        </NavLink>
        <NavLink 
          to='/about' 
          className={({ isActive }) => 
            `block px-4 py-2 text-lg ${isActive 
              ? 'text-brown-dark font-semibold bg-snow' 
              : 'text-brown-light hover:text-brown-dark hover:bg-snow-light'
            }`
          }
          onClick={toggleSidebar}
        >
          <li>About Us</li>
        </NavLink>
      </ul>
    </nav>

    {/* Call to Action */}
    <div className="p-4 border-t border-brown-light">
      <Link to='/purchase' onClick={toggleSidebar}>
        <BrownButton px={16} py={4} value="Get yours now" />
      </Link>
    </div>
  </div>
</div>
    </>
  );
};

export default NavBar;