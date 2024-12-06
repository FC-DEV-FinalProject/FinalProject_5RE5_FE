import useAuthStore from '@/stores/authStore';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isLogin);
  return isAuthenticated ? <Outlet /> : <Navigate to='/signin' />;
};

export default ProtectedRoute;
