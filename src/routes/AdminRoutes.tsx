import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/admin/LoginPage/LoginPage";
import Dashboard from "../components/admin/Dashboard/Dashboard";
import AdminPages from "../components/admin/AdminPages";
import Requests from "../components/admin/Requests/Requests";
import Customers from "../components/admin/Customers/Customers";
import Plans from "../components/admin/Plans/Plans";

const AdminRoutes = ()=>{
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/v1" element={<AdminPages/>} >
                <Route path="dashboard" element={<Dashboard/>} />
                <Route path="requests" element={<Requests/>} />
                <Route path="customers" element={<Customers/>} />
                <Route path="plans" element={<Plans/>} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes;