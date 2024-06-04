import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';
import { Outlet } from 'react-router-dom';

type Props = {}

const AdminPages = (props: Props) => {
    return (
        <div className="flex h-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <Outlet />
          </div>
        </div>
      );
}

export default AdminPages