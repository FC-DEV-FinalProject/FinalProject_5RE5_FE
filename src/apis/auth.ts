import axios from 'axios';
import { ILoginProps, IUserData } from '@/types/login';
import apiClient from '@/apis/apiClient';
import { LoginError } from '@/lib/utils';

export const login = async ({
  username,
  password,
}: ILoginProps): Promise<IUserData> => {
  try {
    const response = await apiClient.post<IUserData>(
      '/member/login',
      {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      const status = error.response?.status || 500;
      const message = error.message || '로그인 실패';
      if (status === 401) {
        throw new LoginError('아이디 혹은 비밀번호를 확인해주세요.', 401);
      }
      throw new LoginError(message, status);
    }
    throw new Error(`예기치 못한 오류 : ${error}`);
  }
};
