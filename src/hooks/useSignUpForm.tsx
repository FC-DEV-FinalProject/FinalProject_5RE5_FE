import { useState, useEffect } from 'react';
import { FormData, FormErrors, Term } from '@/types/signup.ts';
import { VALIDATION_PATTERNS } from '@/constants/validation.ts';
import { ERROR_MESSAGES } from '@/constants/errorMsg.ts';

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
  birthDate: ''
};

export const useSignUpForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [terms, setTerms] = useState<Term[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      const response = await fetch('/api/user/register');
      if (!response.ok) throw new Error('Failed to fetch terms');
      const data = await response.json();
      setTerms(data.response.userTerms);
    } catch (error) {
      console.error('Error fetching terms:', error);
    }
  };

  const handleInputChange = (name: keyof FormData, value: string) => {
    let processedValue = value;
    
    if (name === 'phoneNumber') {
      processedValue = value.replace(/[^\d]/g, '');
    } else if (name === 'birthDate') {
      processedValue = value.replace(/[^\d]/g, '').replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    }

    setFormData(prev => ({ ...prev, [name]: processedValue }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!VALIDATION_PATTERNS.userId.test(formData.userId)) {
      newErrors.userId = ERROR_MESSAGES.userId;
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

    const birthYear = parseInt(formData.birthDate.split('-')[0], 10);
    const currentYear = new Date().getFullYear();
    if (currentYear - birthYear < 14) {
      newErrors.birthDate = ERROR_MESSAGES.underage;
    }

    if (!VALIDATION_PATTERNS.email.test(formData.email)) {
      newErrors.email = ERROR_MESSAGES.email;
    }

    if (!VALIDATION_PATTERNS.phoneNumber.test(formData.phoneNumber)) {
      newErrors.phoneNumber = ERROR_MESSAGES.phoneNumber;
    }

    if (!formData.detailAddress) {
      newErrors.detailAddress = ERROR_MESSAGES.detailAddress;
    }
    const requiredTerms = terms.filter(term => term.chkTerm);
    const allRequiredTermsChecked = requiredTerms.every(term => document.getElementById(term.termCode) as HTMLInputElement)?.checked;
    if (!allRequiredTermsChecked) {
      newErrors.terms = ERROR_MESSAGES.terms;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    terms,
    isOpen,
    setIsOpen,
    handleInputChange,
    validateForm,
  };
};