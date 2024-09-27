import React, { useState } from "react";
import { NavigateFunction, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAdminInfo } from "../../../redux/slices/adminSlice/adminSlice";
import adminBackground from "../../../assets/admin_login.png";
import useWindowWidth from "../../../customHooks/useWindowWidth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { adminLogin } from "../../../api/admin";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { adminInfo } = useSelector((store: any) => store.adminInfo);

  const isMobile = useWindowWidth();
  const dispatch = useDispatch();

  const navigate: NavigateFunction = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await adminLogin({ email, password });

      if (response?.status === 201) {
        toast.success("Login Successful!");
        dispatch(setAdminInfo({ ...response.data }));
        navigate("/admin/v1/dashboard");
      } else {
        toast.error(response?.data.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (adminInfo) {
    return <Navigate to="/admin/v1/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#fef6f4] overflow-hidden">
      {!isMobile && (
        <div className="flex justify-center items-center w-1/2">
          <div className="w-96 h-96">
            <img
              src={adminBackground}
              alt="Illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
      <div
        className={`flex justify-center items-center ${
          isMobile ? "w-full px-4 my-4" : "w-1/2"
        }`}
      >
        <div className="h-[500px] w-[400px] bg-white shadow-lg rounded-lg flex flex-col justify-center">
          <h2 className="mb-8 text-xl font-semibold text-center">
            Admin Login
          </h2>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-10 mx-7">
              <label htmlFor="email" className="block mb-1">
                Email*
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-10 mx-7 relative">
              <label htmlFor="password" className="block mb-1">
                Password*
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="****** min 6 digit"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-10 right-4 flex items-center"
              >
                {showPassword ? (
                  <EyeIcon height={20} color="#ff6b5a" />
                ) : (
                  <EyeSlashIcon height={20} color="#ff6b5a" />
                )}
              </button>
            </div>
            <div className="mb-2 mx-9">
              <button
                type="submit"
                className="w-full py-1 bg-[#ff6b5a] text-white rounded-full hover:bg-[#ffa497] transform duration-500 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    <span className="ml-2">Logging in...</span>
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
