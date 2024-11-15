export const VALIDATION_PATTERNS = {
  userId: /^[a-zA-Z0-9]{6,20}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
  consecutiveChars: /(.)\1\1/,
  name: /^[가-힣a-zA-Z\s]+$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phoneNumber: /^010\d{8}$/
};