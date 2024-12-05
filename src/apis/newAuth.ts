import axios from 'axios';
import { ISignUpRequest } from '@/types/login';
import apiClient from '@/apis/apiClient';
import { SignUpError } from '@/utils/auth'

export const signUpRequest = async (requestData: ISignUpRequest): Promise<any> => {
  try {
    const response = await apiClient.post<ISignUpRequest>(
      '/member/register', 
      {
        // ...requestData,
        // // termCode: requestData.memberTermCheckOrNotRequests
        // termCode: 'TERMS002',
        //   // .find(term => term.agreed === 'Y')?.termCondCode.toString() || '',
        // chkValid: requestData.memberTermCheckOrNotRequests.every(term => term.agreed) ? 'Y' : 'N',
        // locaAddr: requestData.normAddr, 
        // passAddr: requestData.detailAddr,
        // userRegDate: new Date().toISOString(),
        id: requestData.id,
        email: requestData.email,
        password: requestData.password,
        name: requestData.name,
        normAddr: requestData.normAddr,
        locaAddr: requestData.locaAddr,
        detailAddr: requestData.detailAddr,
        passAddr: requestData.passAddr,
        termCode: 'TERMS002',
        chkValid: requestData.memberTermCheckOrNotRequests.every(term => term.agreed) ? 'Y' : 'N',
        userRegDate: new Date().toISOString(),
        memberTermCheckOrNotRequests: requestData.memberTermCheckOrNotRequests,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data.message || error.message || '회원가입 실패';
      if (status === 400) {
        throw new SignUpError('입력된 정보를 확인해주세요.', 400);
      } else if (status === 409) {
        throw new SignUpError(message, 409);
      }
      throw new SignUpError(message, status);
    }
    throw new Error(`예기치 못한 오류 : ${error}`);
  }
};