import axios from 'axios';
import { ISignUpRequest } from '@/types/login';
import apiClient from '@/apis/apiClient';
import { SignUpError } from '@/utils/auth'

export const signUpRequest = async (requestData: ISignUpRequest): Promise<any> => {
  try {
    const response = await apiClient.post<ISignUpRequest>(
      '/api/member/register', 
      {
        ...requestData,
        // Swagger 문서에 맞춰 추가 필드 처리
        termCode: requestData.memberTermCheckOrNotRequests
          .find(term => term.agreed === 'Y')?.termCondCode.toString() || '',
        chkValid: requestData.memberTermCheckOrNotRequests
          .every(term => term.agreed === 'Y') ? 'Y' : 'N',
        locaAddr: requestData.normAddr, // 주소 매핑
        passAddr: requestData.detailAddr
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
      const message = error.message || '회원가입 실패';
      if (status === 400) {
        throw new SignUpError('입력된 정보를 확인해주세요.', 400);
      } else if (status === 409) {
        throw new SignUpError('이미 존재하는 아이디 또는 이메일 입니다.', 409);
      }
      throw new SignUpError(message, status);
    }
    throw new Error(`예기치 못한 오류 : ${error}`);
  }
};