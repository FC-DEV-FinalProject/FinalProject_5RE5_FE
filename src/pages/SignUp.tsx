import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from 'react-router-dom';
import { useSignUpForm } from '@/hooks/useSignUpForm';
import { FormField } from '@/components/signup/FormField';
import { AddressSearch } from '@/components/signup/AddressSearch';
import { TermsSection } from '@/components/signup/termSection';

const SignUp: React.FC = () => {
  const { 
    formData,
    errors,
    terms,
    isOpen,
    setIsOpen,
    handleInputChange,
    validateForm,
  } = useSignUpForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('유효함.제출중');
    } else {
      console.log('에러남 ㅅㄱ');
    }
  }

  return (
    <div className="container p-6 mx-auto">
      <h2 className="mb-2 text-2xl font-bold text-center">회원가입</h2>
      <h4 className="mb-6 font-bold text-center text-l">이미 계정이 있으신가요? 
        <Link to="/signin">로그인 화면으로 이동</Link>
      </h4>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormField 
          label="아이디"
          id=""
          type=""
          value={formData.userId}
          onChange={(value) => handleInputChange('userId', value)}
          error={errors.userId}
          placeholder="아이디를 입력하세요"
        />

        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <div className="flex space-x-2">
            <Input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="이메일을 입력하세요"
            />
            <Button type="button">이메일 인증</Button>
          </div>
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <FormField
          label="이메일 인증번호"
          id="emailVerification"
          type="text"
          value={formData.emailVerification}
          onChange={(value) => handleInputChange('emailVerification', value)}
          placeholder="인증번호를 입력하세요"
        />

        <FormField
          label="비밀번호"
          id="password"
          type="password"
          value={formData.password}
          onChange={(value) => handleInputChange('password', value)}
          error={errors.password}
          placeholder="비밀번호를 입력하세요"
        />

        <FormField
          label="비밀번호 확인"
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(value) => handleInputChange('confirmPassword', value)}
          error={errors.confirmPassword}
          placeholder="비밀번호를 다시 입력하세요"
        />

        <FormField
          label="이름"
          id="name"
          type="text"
          value={formData.name}
          onChange={(value) => handleInputChange('name', value)}
          error={errors.name}
          placeholder="이름을 입력하세요"
        />

        <FormField
          label="전화번호"
          id="phone"
          type="tel"
          value={formData.phoneNumber}
          onChange={(value) => handleInputChange('phoneNumber', value)}
          error={errors.phoneNumber}
          placeholder="전화번호를 입력하세요"
        />

        <FormField
          label="생년월일"
          id="birthDate"
          type="text"
          value={formData.birthDate}
          onChange={(value) => handleInputChange('birthDate', value)}
          error={errors.birthDate}
          placeholder="YYYY-MM-DD"
          maxLength={10}
        />

        <AddressSearch
          address={formData.address}
          isOpen={isOpen}
          onComplete={(data) => handleInputChange('address', data.address)}
          onClose={() => setIsOpen(false)}
        />

        <FormField
          label="주소"
          id="addressDetail"
          type="text"
          value={formData.detailAddress}
          onChange={(value) => handleInputChange('detailAddress', value)}
          error={errors.detailAddress}
          placeholder="상세 주소를 입력하세요"
        />

        <TermsSection
          terms={terms}
          error={errors.terms}
        />

        <Button type="submit" className="w-full">가입하기</Button>
      </form>
    </div>
  );
};

export default SignUp;
