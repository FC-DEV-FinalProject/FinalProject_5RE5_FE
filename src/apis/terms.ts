import apiClient from './apiClient';
import { Term } from '@/types/signup';

export const fetchTerms = async (): Promise<Term[]> => {
  try {
    const response = await apiClient.get('/api/terms');
    return response.data.response.userTerms;
  } catch (error) {
    console.error('약관 불러오기 실패', error);
    throw error;
  }
};

export const sendEmailVerificationCode = async (email: string) => {
  try {
    await apiClient.post('/api/email/verify/send', { email });
  } catch (error) {
    throw error;
  }
};

export const checkEmailVerificationCode = async (
  email: string, 
  verificationCode: string
): Promise<boolean> => {
  try {
    const response = await apiClient.post('/api/email/verify/check', { 
      email, 
      verificationCode 
    });
    return response.data.isValid;
  } catch (error) {
    throw error;
  }
};