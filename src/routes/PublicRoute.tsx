import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  // return isAuthenticated ? <Navigate to='/' /> : <Outlet />;
  return <Outlet />;
};

export default PublicRoute;
