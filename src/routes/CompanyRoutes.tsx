import { Route, Routes } from "react-router-dom";
import LoginPages from "../components/company/LoginPage/LoginPage.tsx";
import ProtectedPortal from "../components/company/protect/ProtectedPortal.tsx";
import Dashboard from "../components/company/Dashboard/Dashboard.tsx";
import LoginProtect from "../components/company/protect/LoginProtect.tsx";

const CompanyRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedPortal />}>
      <Route index element={<LoginPages />} />
        <Route path="/" element={<LoginProtect />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default CompanyRoutes;