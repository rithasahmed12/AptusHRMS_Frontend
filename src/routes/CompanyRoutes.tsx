import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/company/LoginPage/LoginPage.tsx";
import ProtectedPortal from "../components/company/protect/ProtectedPortal.tsx";


const CompanyRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedPortal>
            <LoginPage />
          </ProtectedPortal>
        }
      />
      {/* Add other routes here, wrapped in ProtectedRoute */}
    </Routes>
  );
};

export default CompanyRoutes;
