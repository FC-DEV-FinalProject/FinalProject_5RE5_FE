import { useState, useEffect } from 'react';
import { FormData, FormErrors, Term } from '@/types/signup.ts';
import { VALIDATION_PATTERNS } from '@/constants/validation.ts';
import { ERROR_MESSAGES } from '@/constants/errorMsg.ts';
import { fetchTerms, sendEmailVerificationCode, checkEmailVerificationCode } from '@/apis/terms';

const initialFormData: FormData = {
  userId: '',
  email: '',
  emailVerification: '',
  password: '',
  confirmPassword: '',
  name: '',
  address: '',
  detailAddress: '',
  phoneNumber: '',
};

export const useSignUpForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [terms, setTerms] = useState<Term[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  // useEffect(() => {
  //   fetchTerms();
  // }, []);

  useEffect(() => {
    const loadTerms = async () => {
      try {
        const fetchedTerms = await fetchTerms();
        setTerms(fetchedTerms);
      } catch (error) {
        console.error('약관 불러오기 실패:', error);
      }
    };
    loadTerms();
  }, []);

  // const fetchTerms = async () => {
  //   try {
  //     const response = await fetch('/api/user/register');
  //     if (!response.ok) throw new Error('Failed to fetch terms');
  //     const data = await response.json();
  //     setTerms(data.response.userTerms);
  //   } catch (error) {
  //     console.error('Error fetching terms:', error);
  //   }
  // };

  const handleInputChange = (name: keyof FormData, value: string) => {
    let processedValue = value;

    if (name === 'phoneNumber') {
      processedValue = value.replace(/[^\d]/g, '');
    }

    setFormData((prev) => ({ ...prev, [name]: processedValue }));

    // 이메일 변경 시 인증 초기화
    if (name === 'email') {
      setEmailVerified(false);
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!VALIDATION_PATTERNS.userId.test(formData.userId)) {
      newErrors.userId = ERROR_MESSAGES.userId;
    }

    if (!VALIDATION_PATTERNS.email.test(formData.email)) {
      newErrors.email = ERROR_MESSAGES.email;
    }

    if (!VALIDATION_PATTERNS.password.test(formData.password)) {
      newErrors.password = ERROR_MESSAGES.password;
    }
    if (VALIDATION_PATTERNS.consecutiveChars.test(formData.password)) {
      newErrors.password = ERROR_MESSAGES.consecutivePassword;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = ERROR_MESSAGES.confirmPassword;
    }

    if (!VALIDATION_PATTERNS.name.test(formData.name)) {
      newErrors.name = ERROR_MESSAGES.name;
    }

    if (!VALIDATION_PATTERNS.phoneNumber.test(formData.phoneNumber)) {
      newErrors.phoneNumber = ERROR_MESSAGES.phoneNumber;
    }

    if (!formData.detailAddress) {
      newErrors.detailAddress = ERROR_MESSAGES.detailAddress;
    }
    const requiredTerms = terms.filter(term => term.chkTerm);
    const allRequiredTermsChecked = requiredTerms.every(term => {
      const element = document.getElementById(term.termCode);
      return element instanceof HTMLInputElement ? element.checked : false;
    });
    
    if (!allRequiredTermsChecked) {
      newErrors.terms = ERROR_MESSAGES.terms;
    }

    // 이메일 인증 확인
    if (!emailVerified) {
      newErrors.emailVerification = '이메일 인증이 필요합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailVerification = async () => {
    try {
      // 이메일 인증 요청 API 호출
      await sendEmailVerificationCode(formData.email);
      alert('인증번호가 발송되었습니다.');
    } catch (error) {
      alert('인증번호 발송에 실패했습니다.');
    }
  };

  const verifyEmailCode = async () => {
    try {
      const isValid = await checkEmailVerificationCode(
        formData.email, 
        formData.emailVerification
      );
      
      if (isValid) {
        setEmailVerified(true);
        alert('이메일 인증이 완료되었습니다.');
      } else {
        setErrors(prev => ({
          ...prev,
          emailVerification: '인증번호가 일치하지 않습니다.'
        }));
      }
    } catch (error) {
      alert('인증 중 오류가 발생했습니다.');
    }
  };

  // const handleTermChange = (termCode: string, checked: boolean) => {
  //   if (termCode === 'all') {
  //     // 전체 동의
  //     const updatedTerms = terms.map(term => ({ ...term, agreed: checked }));
  //     setTerms(updatedTerms);
  //   } else {
  //     // 개별 약관 동의 로직
  //     const updatedTerms = terms.map((term) =>
  //       term.termCode === termCode ? { ...term, agreed: checked } : term
  //     );
  //     setTerms(updatedTerms);
  //   }
  // };
  const handleTermChange = (termCode: string, checked: boolean) => {
    const updatedTerms = terms.map(term => 
      term.termCode === termCode 
        ? { ...term, agreed: checked }
        : term
    );
    setTerms(updatedTerms);
  };

  return {
    formData,
    errors,
    terms,
    isOpen,
    setIsOpen,
    emailVerified,
    handleInputChange,
    validateForm,
    handleTermChange,
    handleEmailVerification,
    verifyEmailCode,
  };
};
