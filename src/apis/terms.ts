import { useState, useEffect } from 'react';
import apiClient from './apiClient';
import { Term } from '@/types/signup';

export interface TermResponse {
  memberTermConditionResponses: {
    memberTermConditionResponses: {
      condCode: string;
      shortCont: string;
      longCont: string;
      chkUse: string;
      ord: number;
      law1: string;
      law2: string;
      law3: string;
    }[];
  };
}

export const fetchTerms = async (termCode: string): Promise<TermResponse> => {
  try {
    const response = await apiClient.get(`/member-term/${termCode}`);
    return response.data;
  } catch (error) {
    console.error('약관 불러오기 실패', error);
    throw error;
  }
};

let verificationCode: string | null = null;

export const sendEmailVerificationCode = async (email: string):Promise<string> => {
  try {
    const response = await apiClient.post('/member/verify-email', JSON.stringify(email),{
      headers: {
        'Content-Type': 'application/json'
      }
    } );
    console.log('Full API Response:', response);
    console.log('Response Data:', response.data);
    // 백엔드 응답 구조에 따라 코드 추출
    const code = response.data;

    if (!code) {
      throw new Error('인증번호를 받지 못했습니다.');
    }

    return code;
    // return response.data.verificationCode;
  } catch (error) {
    console.error('이메일 인증번호 발송 실패', error);
    throw error;
  }
};

export const checkEmailVerificationCode = async (
  email: string, 
  userVerificationCode: string
): Promise<boolean> => {
  try {
    if (verificationCode === userVerificationCode) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};