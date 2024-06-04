import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/admin/LoginPage/LoginPage";
import Dashboard from "../components/admin/Dashboard/Dashboard";
import AdminPages from "../components/admin/AdminPages";

const AdminRoutes = ()=>{
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/v1" element={<AdminPages/>} >
                <Route path="dashboard" element={<Dashboard/>} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes;