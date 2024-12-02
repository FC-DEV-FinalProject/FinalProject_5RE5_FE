import axios from 'axios';
import { IUseLoginProps, IUserData } from '@/types/login';
import apiClient from '@/apis/apiClient';
import { LoginError } from '@/lib/utils';

export const login = async ({
  username,
  password,
}: IUseLoginProps): Promise<IUserData> => {
  try {
    const response = await apiClient.post<IUserData>(
      '/member/login',
      {
        username,
        password,
      },
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 401) {
        throw new LoginError('아이디 혹은 비밀번호를 확인해주세요.', 401);
      }
    }

    throw new LoginError(`로그인 실패: ${error}`, 500);
  }
};
