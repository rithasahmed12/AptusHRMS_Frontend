import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LoginProtect = () => {
  const isAuthenticated = useSelector((state:any) => state.companyInfo.companyInfo);
  console.log('isAuthenticated', isAuthenticated);

  if (isAuthenticated && isAuthenticated.email) {

    
    return <Outlet />;
  }


  

  return <Navigate to="/" replace />;
};

export default LoginProtect;
