import { Route, Routes } from "react-router-dom";
import LoginPages from "../components/company/LoginPage/LoginPage.tsx";
import ProtectedPortal from "../components/company/protect/ProtectedPortal.tsx";
import LoginProtect from "../components/company/protect/LoginProtect.tsx";
import CompanyPages from "../components/company/CompanyPages.tsx";
import Dashboard from "../components/company/Dashboard/Dashboard.tsx";
import Announcements from "../components/company/Announcements/Announcements.tsx";

const CompanyRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedPortal />}>
      <Route index element={<LoginPages />} />
        <Route path="/" element={<LoginProtect/>}>
          <Route path="/c" element={<CompanyPages/>}>
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="announcements" element={<Announcements/>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default CompanyRoutes;