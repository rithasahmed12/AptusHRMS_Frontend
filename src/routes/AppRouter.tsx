import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import CompanyRoutes from "./CompanyRoutes/CompanyRoutes";

const AppRouter = () => {
  const [tenantName, setTenantName] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const hostname = url.hostname;

    let extractedTenantName: string | null;

    if (import.meta.env.PROD) {
      // Production: Check if the hostname has more than two parts (subdomain.domain.tld)
      const parts = hostname.split('.');
      extractedTenantName = parts.length > 2 ? parts[0] : null;
    } else {
      // Development: Check if there's any subdomain
      extractedTenantName = hostname.includes('.') ? hostname.split('.')[0] : null;
    }
    
    setTenantName(extractedTenantName);
    console.log('Tenant Name:', extractedTenantName);
  }, []);

  if (tenantName) {
    // Render CompanyRoutes component for subdomains
    return (
      <Routes>
        <Route path="/*" element={<CompanyRoutes />} />
      </Routes>
    );
  } else {
    // Render default routes for main domain
    return (
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    );
  }
};

export default AppRouter;