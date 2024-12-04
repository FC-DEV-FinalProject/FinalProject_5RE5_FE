export interface Term {
  code: string;
  termName: string;
  shortCont: string;
  longCont: string;
  chkTerm: boolean;
  agreed: boolean;
  valid: boolean;
  termCode: string; 
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