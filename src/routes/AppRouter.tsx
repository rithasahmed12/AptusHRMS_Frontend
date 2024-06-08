import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import CompanyRoutes from "./CompanyRoutes";

const AppRouter = () => {
  const [tenantName, setTenantName] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const hostname = url.hostname;
    const tenantName = hostname.includes('.') ? hostname.split('.')[0] : null;
    setTenantName(tenantName);
    console.log('Tenant Name:', tenantName);
  }, []);

  if (tenantName) {
    // Render CompanyRoutes component
    return (
      <Routes>
        <Route path="/*" element={<CompanyRoutes />} />
      </Routes>
    );
  } else {
    // Render default routes
    return (
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    );
  }
};

export default AppRouter;
