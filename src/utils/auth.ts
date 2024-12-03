export class LoginError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'LoginError';
    this.statusCode = statusCode;
  }
}
export class SignUpError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'SignUpError';
    this.statusCode = statusCode;
  }
}

export const validateLoginForm = ({
  username,
  password,
}: {
  username: string;
  password: string;
}): boolean => {
  //6~20자, 영문 및 숫자만 허용
  const usernameRegex = /^[a-zA-Z0-9]{6,20}$/;
  if (!usernameRegex.test(username)) {
    return false;
  }

  // 8~20자, 영문 대소문자, 숫자, 특수문자 포함
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,20}$/;
  if (!passwordRegex.test(password)) {
    return false;
  }

  // 동일 문자 3회 이상 연속 불가
  if (/(.)\1\1/.test(password)) {
    return false;
  }

  return true;
};
