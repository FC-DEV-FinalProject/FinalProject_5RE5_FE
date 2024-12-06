import { AxiosError } from 'axios';

export interface IUserData {
  name: string;
  id: string;
  seq: number;
  email: string;
}

export interface ILoginProps {
  username: string;
  password: string;
}

export interface ISignUpRequest {
  id: string;
  email: string;
  password: string;
  name: string;
  normAddr: string; //기본 주소
  locaAddr: string; //지역 주소
  detailAddr: string; //상세 주소
  passAddr: string; //추가 주소 정보
  termCode: string;
  chkValid: string;
  userRegDate: string;
  memberTermCheckOrNotRequests: {
    termCondCode: string;
    agreed: 'Y' | 'N';
    valid: boolean;
  }[];
}
export interface ExtendedAxiosErrorForLogin extends AxiosError {
  statusCode: number;
}
