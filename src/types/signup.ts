export interface Term {
  code: number;
  termCode: string;
  termName: string;
  shortCont: string;
  longCont: string;
  chkTerm: boolean;
  agreed: boolean;
  valid: boolean;
}

export interface FormData {
  userId: string;
  email: string;
  emailVerification: string;
  password: string;
  confirmPassword: string;
  name: string;
  address: string;
  detailAddress: string;
  phoneNumber: string;
}

export interface FormErrors {
  [key: string]: string;
}