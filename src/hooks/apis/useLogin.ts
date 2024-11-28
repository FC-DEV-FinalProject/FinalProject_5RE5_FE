import { useMutation } from '@tanstack/react-query';
import { login } from '@/apis/auth';
import {
  ExtendedAxiosErrorForLogin,
  IUseLoginProps,
  IUserData,
} from '@/types/login';

const useLogin = (resetForm: () => void) => {
  return useMutation<IUserData, ExtendedAxiosErrorForLogin, IUseLoginProps>({
    mutationFn: login,
    onSuccess: (data: IUserData) => {
      console.log('로그인 성공:', data);
      //setUser
    },
    onError: (error: ExtendedAxiosErrorForLogin) => {},
    onSettled: (data) => {
      resetForm();
    },
  });
};

export default useLogin;
