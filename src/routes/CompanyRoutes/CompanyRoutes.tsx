import { Route, Routes } from "react-router-dom";
import LoginPages from "../../components/company/LoginPage/LoginPage.tsx";
import ProtectedPortal from "../../components/company/protect/ProtectedPortal.tsx";
import LoginProtect from "../../components/company/protect/LoginProtect.tsx";
import CompanyPages from "../../components/company/CompanyPages.tsx";
import Dashboard from "../../components/company/Dashboard/Dashboard.tsx";
import Announcements from "../../components/company/Announcements/Announcements.tsx";
import Department from "../../components/company/Organization/Department.tsx";
import DesignationPage from "../../components/company/Organization/Designation.tsx";
import EmployeeList from "../../components/company/Employees/EmployeesList.tsx";
import AddEmployee from "../../components/company/Employees/AddEmployee.tsx";
import EditEmployee from "../../components/company/Employees/EditEmployees.tsx";
import EmployeeView from "../../components/company/Employees/EmployeeView.tsx";
import ProjectList from "../../components/company/Projects/Projects.tsx";
import ChangePasswordPage from "../../components/company/LoginPage/ChangePassword.tsx";
import ProfilePage from "../../components/company/Profile/Profile.tsx";
import UserProfile from "../../components/company/Profile/UserProfile/UserProfile.tsx";
import EditUserProfile from "../../components/company/Profile/UserProfile/EditUserProfile.tsx";
import CompanyProfile from "../../components/company/Profile/CompanyProfile/CompanyProfile.tsx";
import EditCompanyProfile from "../../components/company/Profile/CompanyProfile/EditCompanyProfil.tsx";
import ListWorkshift from "../../components/company/Attendance/Workshift/ListWorkshift.tsx";
import EditWorkShift from "../../components/company/Attendance/Workshift/EditWorkShift.tsx";
import AddWorkShift from "../../components/company/Attendance/Workshift/AddWorkShift.tsx";
import HolidayList from "../../components/company/Leave/Holidays.tsx";
import LeaveTypeList from "../../components/company/Leave/Leaves.tsx";
import LeaveApplicationList from "../../components/company/Leave/LeaveApplication.tsx";
import AssetList from "../../components/company/Assets/AssetsList.tsx";
import AddAsset from "../../components/company/Assets/AddAsset.tsx";
import EditAsset from "../../components/company/Assets/EditAsset.tsx";
import AssetsApplication from "../../components/company/Assets/AssetsApplications.tsx";
import JobListing from "../../components/company/Recruitment/JobListPage.tsx";
import AppliedCandidates from "../../components/company/Recruitment/Applicants.tsx";
import ShortlistedCandidates from "../../components/company/Recruitment/ShortlistedApplicants.tsx";
import JobForm from "../../components/company/Recruitment/JobCreateForm.tsx";
import JobDetails from "../../components/company/Recruitment/JobApplication.tsx";
import AttendancePage from "../../components/company/Attendance/AttendanceList/AttendancePage.tsx"
import PayrollTable from "../../components/company/Payroll/Payroll.tsx";
import RoleBasedRoute from "./RoleBasedRoute.tsx";
import UnauthorizedPage from "../../components/company/ErrorPages/UnauthorizedPage.tsx";
import EditJobForm from "../../components/company/Recruitment/JobEditForm.tsx";




const CompanyRoutes = () => {
  return (
    <Routes>
      <Route path="jobs/:id" element={<JobDetails/>} />
      <Route path="unauthorized" element={<UnauthorizedPage/>} />
      <Route element={<ProtectedPortal />}>
        <Route index element={<LoginPages />} />
        <Route path="change-password" element={<ChangePasswordPage/>} />
        <Route path="/" element={<LoginProtect/>}>
          <Route path="/c" element={<CompanyPages/>}>
            <Route path="dashboard" element={<Dashboard/>} />
            <Route path="announcements" element={<Announcements/>} />

            {/* Employee Management Routes */}
              <Route path="employees" element={<EmployeeList/>} />
            <Route element={<RoleBasedRoute allowedRoles={['admin', 'hr']} />}>
              <Route path="employees/add" element={<AddEmployee/>} />
              <Route path="employees/edit/:id" element={<EditEmployee/>} />
              <Route path="/c/employees/view/:id" element={<EmployeeView />} />
              <Route path="user/edit" element={<EditUserProfile/>} />
              <Route path="assets/add" element={<AddAsset/>} />
              <Route path="assets/edit/:id" element={<EditAsset/>} />
              <Route path="recruitment/jobs" element={<JobListing/>} />
              <Route path="recruitment/jobs/add" element={<JobForm/>} />
              <Route path="recruitment/jobs/edit/:id" element={<EditJobForm/>} />
              <Route path="recruitment/applicants" element={<AppliedCandidates/>} />
              <Route path="recruitment/shortlisted" element={<ShortlistedCandidates/>} />
            </Route>

            <Route  element={<RoleBasedRoute allowedRoles={['admin']} />}> 
            <Route path="organization/department" element={<Department/>} />
            <Route path="organization/designation" element={<DesignationPage/>} />
            <Route path="workshift" element={<ListWorkshift/>} />
            < Route path="workshift/add" element={<AddWorkShift/>} />
            <Route path="workshift/edit/:id" element={<EditWorkShift/>} />
            </Route>

            <Route path="projects" element={<ProjectList/>} />
            <Route path="profile/:id" element={<ProfilePage/>} >
              <Route index path="user" element={<UserProfile/>} />
              <Route path="company" element={<CompanyProfile/>} />
              <Route element={<RoleBasedRoute allowedRoles={['admin', 'hr']} />}>
              <Route path="company/edit" element={<EditCompanyProfile/>} />
              </Route>
              <Route path="settings" element={<CompanyProfile/>} />
            </Route>
            <Route path="holidays" element={<HolidayList/>} />
            <Route path="leaves" element={<LeaveTypeList/>} />
            <Route path="leaveApplication" element={<LeaveApplicationList/>} />
            <Route path="assets" element={<AssetList/>} />
            <Route path="assetsApplication" element={<AssetsApplication/>} />
            <Route path="attendance" element={<AttendancePage/>} />
            <Route path="payroll" element={<PayrollTable/>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default CompanyRoutes;