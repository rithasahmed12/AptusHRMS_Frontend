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

    let extractedTenantName: string | null = null;

    if (import.meta.env.PROD) {
      // Production: Handle www and other subdomains
      const parts = hostname.split('.');
      if (parts.length > 2) {
        extractedTenantName = parts[0] === 'www' ? null : parts[0];
      }
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
