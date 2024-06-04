import AdminRoutes from "./AdminRoutes"
import UserRoutes from "./UserRoutes"
import { Routes,Route } from "react-router-dom"


const AppRouter = () => {
  return (
    <Routes>
        <Route path='/*' element={<UserRoutes/>} />
        <Route path='/admin/*' element={<AdminRoutes/>} />
    </Routes>
  )
}

export default AppRouter