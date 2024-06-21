import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LoginProtect = () => {
  const isAuthenticated = useSelector((state:any) => state.companyInfo.companyInfo);
  console.log('isAuthenticated', isAuthenticated);

  if (isAuthenticated && isAuthenticated.email) {
    console.log('lilili');
    
    return <Outlet />;
  }

  console.log('lalalal');
  

  return <Navigate to="/" replace />;
};

export default LoginProtect;
