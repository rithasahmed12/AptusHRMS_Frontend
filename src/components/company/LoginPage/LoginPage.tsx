import { useState } from "react";
import useWindowWidth from "../../../customHooks/useWindowWidth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { companyLogin } from "../../../api/company";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCompanyInfo } from "../../../redux/slices/companySlice/companySlice";



const LoginPages = () => {

  const {companyInfo} = useSelector((state:any) => state.companyInfo);

  if (companyInfo) {
    return <Navigate to="/dashboard" replace />;
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isMobile = useWindowWidth();

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async(e:any)=>{
    e.preventDefault();

    const tenantId = localStorage.getItem('portalId');

    // Extract the subdomain from the current hostname
    const hostname = window.location.hostname;
    const subdomain = hostname.split('.')[0];

    const body = {
      email:email,
      password:password
    }
    const headers = {
      'x-tenant-id': tenantId,
      'x-domain': subdomain
    }

    const response = await companyLogin(body,headers);
    console.log(response);
    if(response.status === 201){
      toast.success(response.data.message);
      dispatch(setCompanyInfo({email:response.data.email}));
      navigate('dashboard');
    }else {
      toast.error(response.data.message)
    }
    
  }
    
  return (
    <div className="flex justify-center min-h-screen bg-[#f0f0f0] overflow-hidden">
  <div className="absolute left-0 hidden md:flex flex-col justify-center h-svh w-[300px] bg-black text-white text-center">
    <h1 className="font-extrabold text-xl mb-2">Welcome To AptusHR</h1>
    <p>Streamline.Save Time. Better Clime</p>
  </div>
  <div className={`flex justify-center items-center w-full md:w-auto ${!isMobile ? 'ml-16' : ''} `}>
    <div className="h-[500px] w-[400px] bg-white shadow-lg rounded-lg flex flex-col justify-center items-center">
      <h2 className="mb-8 text-xl font-semibold text-center">Login</h2>
      <form className="w-full">
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
            type={showPassword ? 'text' : 'password'}
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
              <EyeIcon height={20} color="gray" />
            ) : (
              <EyeSlashIcon height={20} color="gray" />
            )}
          </button>
        </div>
        <div className="mb-2 mx-9">
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full py-1 bg-[#000000] text-white rounded-full hover:bg-[#2a2a2a] transform duration-500"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
  )
}

export default LoginPages