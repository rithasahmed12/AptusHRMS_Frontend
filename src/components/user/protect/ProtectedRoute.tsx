import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const {customerInfo} = useSelector((store: any) => store.customerInfo);
  

  if (!customerInfo || customerInfo.success) {
    // Redirect to the registration form if customer info is not available
    return <Navigate to="/purchase" replace />;
  }

  return children;
};

export default ProtectedRoute;
