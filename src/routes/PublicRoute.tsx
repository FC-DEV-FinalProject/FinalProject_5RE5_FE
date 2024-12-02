import { useAuthStore } from '@/stores/authStore';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isLogin);
  return isAuthenticated ? <Navigate to='/' /> : <Outlet />;
};

export default PublicRoute;
