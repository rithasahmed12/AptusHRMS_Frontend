import { Route, Routes } from "react-router-dom"
import LoginPage from "../components/company/LoginPage/LoginPage.tsx"

const CompanyRoutes = ()=>{

    
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>} />
        </Routes>
    )
}

export default CompanyRoutes