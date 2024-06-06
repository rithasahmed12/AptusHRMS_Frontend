import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedSuccessRoute = ({ children }: { children: JSX.Element }) => {
    const {customerInfo} = useSelector((store: any) => store.customerInfo);
    
  if (!customerInfo || !customerInfo.success) {
    return <Navigate to="/purchase" replace />;
  }

  return children;
};

export default ProtectedSuccessRoute;
