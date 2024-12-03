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

export interface ExtendedAxiosErrorForLogin extends AxiosError {
  statusCode: number;
}
