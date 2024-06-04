import { Route, Routes } from "react-router-dom";
import UserHomePage from "../components/user/HomePage/UserHomePage";
import PricingPage from "../components/user/PricingPage/PricingPage";
import ContactPage from "../components/user/ContactPage/ContactPage";
import RegisterPage from "../components/user/RegisterPage/RegisterPage";
import OTPForm from "../components/user/RegisterPage/utils/OTPForm";
import SuccessCard from "../components/user/RegisterPage/utils/SuccessCard";
import RegsiterForm from "../components/user/RegisterPage/utils/RegsiterForm";
import PlanSelectionForm from "../components/user/RegisterPage/utils/PlanSelectionForm";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserHomePage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/purchase" element={<RegisterPage />}>
        <Route index element={<RegsiterForm/>} />
        <Route path="otp" element={<OTPForm/>} />
        <Route path="plan" element={<PlanSelectionForm />} />
        <Route path="success" element={<SuccessCard />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
