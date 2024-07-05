import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";

const CompanyPages: React.FC = () => {
  const { companyInfo } = useSelector((state: any) => state.companyInfo);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

    const showSidebar = useMemo(() => {
      const noSidebarRoutes = [
        /^\/c\/profile\/[^*]+$/,
        '/c/settings'
      ];

      return !noSidebarRoutes.some(route => 
        typeof route === 'string' ? route === location.pathname : route.test(location.pathname)
      );
    }, [location.pathname]);

  return (
    <div className="flex h-screen">
      {showSidebar && (
        <Sidebar
          isSidebarExpanded={isSidebarExpanded}
          toggleSidebar={toggleSidebar}
          companyLogo={companyInfo.logo}
        />
      )}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          showSidebar ? (isSidebarExpanded ? 'ml-64' : 'ml-20') : 'ml-0'
        }`}
      >
        <Navbar />
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CompanyPages;
