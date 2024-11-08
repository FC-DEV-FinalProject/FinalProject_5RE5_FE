import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  // return isAuthenticated ? <Outlet /> : <Navigate to='/signin' />;
  return <Outlet />;
};

export default ProtectedRoute;
