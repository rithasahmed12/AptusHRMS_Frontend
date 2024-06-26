import { Route, Routes } from "react-router-dom";
import LoginPages from "../components/company/LoginPage/LoginPage.tsx";
import ProtectedPortal from "../components/company/protect/ProtectedPortal.tsx";
import LoginProtect from "../components/company/protect/LoginProtect.tsx";
import CompanyPages from "../components/company/CompanyPages.tsx";
import Dashboard from "../components/company/Dashboard/Dashboard.tsx";
import Announcements from "../components/company/Announcements/Announcements.tsx";
import Department from "../components/company/Organization/Department.tsx";
import DesignationPage from "../components/company/Organization/Designation.tsx";
import EmployeeList from "../components/company/Employees/EmployeesList.tsx";
import AddEmployee from "../components/company/Employees/AddEmployee.tsx";
import EditEmployee from "../components/company/Employees/EditEmployees.tsx";
import EmployeeView from "../components/company/Employees/EmployeeView.tsx";
import ProjectList from "../components/company/Projects/Projects.tsx";


const CompanyRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedPortal />}>
        <Route index element={<LoginPages />} />
        <Route path="/" element={<LoginProtect/>}>
          <Route path="/c" element={<CompanyPages/>}>
            <Route path="dashboard" element={<Dashboard/>} />
            <Route path="announcements" element={<Announcements/>} />
            <Route path="employees" element={<EmployeeList/>} />
            <Route path="employees/add" element={<AddEmployee/>} />
            <Route path="employees/edit/:id" element={<EditEmployee/>} /> 
            <Route path="/c/employees/view/:id" element={<EmployeeView />} />
            <Route path="organization/department" element={<Department/>} />
            <Route path="organization/designation" element={<DesignationPage/>} />
            <Route path="projects" element={<ProjectList/>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default CompanyRoutes;