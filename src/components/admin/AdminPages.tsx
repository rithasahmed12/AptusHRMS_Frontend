import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


const AdminPages = () => {
  const { adminInfo } = useSelector((store: any) => store.adminInfo);

  return (
    <>
      {adminInfo ? (
        <div className="flex h-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to="/admin" replace />
      )}
    </>
  );
}

export default AdminPages;
