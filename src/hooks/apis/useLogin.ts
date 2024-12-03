import { useMutation } from '@tanstack/react-query';
import { loginRequest } from '@/apis/auth';
import {
  ExtendedAxiosErrorForLogin,
  ILoginProps,
  IUserData,
} from '@/types/login';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

const useLogin = (resetForm: () => void) => {
  const navigate = useNavigate();
  const [rememberChecked, setrememberChecked] = useState(false);
  const authStore = useAuthStore();
  const mutation = useMutation<
    IUserData,
    ExtendedAxiosErrorForLogin,
    ILoginProps
  >({
    mutationFn: loginRequest,
    onSuccess: (data: IUserData) => {
      authStore.login(data, rememberChecked);
      navigate('/');
    },
    onSettled: () => {
      resetForm();
    },
  });
  return {
    ...mutation,
    setrememberChecked,
  };
};

export default useLogin;
