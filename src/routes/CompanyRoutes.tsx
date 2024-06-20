import { Route, Routes } from "react-router-dom";
import LoginPages from "../components/company/LoginPage/LoginPage.tsx";
import ProtectedPortal from "../components/company/protect/ProtectedPortal.tsx";
import Dashboard from "../components/company/Dashboard/Dashboard.tsx";



const CompanyRoutes = () => {
  return (
    <Routes>
      <Route path="/"element={ <ProtectedPortal> <LoginPages /> </ProtectedPortal> } />
      <Route path="/dashboard" element={ <ProtectedPortal> <Dashboard /> </ProtectedPortal> } />
    </Routes>
  );
};

export default CompanyRoutes;
