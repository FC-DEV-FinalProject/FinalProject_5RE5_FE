import { useAuthStore } from './../../stores/authStore';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/apis/auth';
import {
  ExtendedAxiosErrorForLogin,
  ILoginProps,
  IUserData,
} from '@/types/login';
import { useEffect, useState } from 'react';

const useLogin = (resetForm: () => void) => {
  const [rememberChecked, setrememberChecked] = useState(false);
  const [userData, setUserData] = useState<IUserData | null>(null);
  const setUserAndLogin = useAuthStore((state) => state.setUserAndLogin);
  const setRememberMe = useAuthStore((state) => state.setRememberMe);

  useEffect(() => {
    setUserAndLogin(userData);
  }, [userData]);

  const mutation = useMutation<
    IUserData,
    ExtendedAxiosErrorForLogin,
    ILoginProps
  >({
    mutationFn: login,
    onSuccess: (data: IUserData) => {
      setUserData(data);
      setRememberMe(rememberChecked);
    },
    onError: (error: ExtendedAxiosErrorForLogin) => {},
    onSettled: (data) => {
      resetForm();
    },
  });
  return {
    ...mutation,
    setrememberChecked,
  };
};

export default useLogin;
