import React from 'react';
import NavBar from "../common/NavBar";
import useWindowWidth from "../../../customHooks/useWindowWidth";
import Details from "./utils/Details";
import { Outlet } from "react-router-dom";

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = () => {
  const isMobile = useWindowWidth();

  return (
    <>
      <NavBar  />
      <div
        className={`${
          isMobile ? "flex-col h-[1070px]" : "h-[800px] justify-between items-center flex"
        } bg-gradient-brown  `}
      >
        {isMobile ? (
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="mt-5">
              <Details />
            </div>
            <div className="w-[300px] max-w-md bg-white rounded-lg shadow-md px-8 py-10">
              <Outlet />
            </div>
          </div>
        ) : (
          <div className="flex pe-[220px] items-center w-full">
            <div className="flex-1 ps-[220px]">
              <Details />
            </div>
            <div className="w-[400px] max-w-md bg-white rounded-lg shadow-md px-8 py-10">
              <Outlet />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RegisterPage;
