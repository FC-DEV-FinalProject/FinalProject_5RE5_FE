import { useMutation } from '@tanstack/react-query';
import { logoutRequest } from '@/apis/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

const useLogout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      logout();
      navigate('/signIn');
    },
  });
};

export default useLogout;
