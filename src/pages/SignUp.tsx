import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from 'react-router-dom';
import { useSignUpForm } from '@/hooks/useSignUpForm';
import { FormField } from '@/components/signup/FormField';
import { AddressSearch } from '@/components/signup/AddressSearch';
import TermsSection from "@/components/signup/TermsSection";
import { SignUpError } from '@/utils/auth';
import { ISignUpRequest } from "@/types/login";
import { signUpRequest } from "@/apis/newAuth";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { 
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
    handleAllTermsChange,
  } = useSignUpForm();;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('모든 필드를 입력해주세요. ');
      return;
    }
    if (!emailVerified) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }

    const requiredTermsChecked = terms.filter(term => term.chkTerm).every(term => term.agreed);
    if (!requiredTermsChecked) {
      alert('모든 필수 약관에 동의해주세요.');
      return;
    }

    try {
      const requestData: ISignUpRequest = {
        id: formData.userId,
        email: formData.email,
        password: formData.password,
        name: formData.name,
        normAddr: formData.address,
        locaAddr: formData.address,
        detailAddr: formData.detailAddress,
        passAddr: formData.detailAddress,
        termCode: '', 
        chkValid: '', 
        userRegDate: new Date().toISOString(),
        memberTermCheckOrNotRequests: terms.map((term) => ({
          termCondCode: term.code,
          agreed: term.agreed ? 'Y' : 'N',
          valid: term.valid,
        })),
      };
      
      await signUpRequest(requestData);
      alert('회원가입이 성공적으로 완료되었습니다.');
      navigate('/signin');
    } catch (error) {
      if (error instanceof SignUpError) {
        alert(`회원가입 실패: ${error.message}`);
      } else {
        alert('예기치 못한 오류가 발생했습니다.')
      }
    }
  };

  return (
    <div className="px-4 py-20 mx-auto w-[800px]">
      <h2 className="mb-2 text-[36px] font-bold text-center">회원가입</h2>
      <h4 className="mb-10 text-center text-l">이미 계정이 있으신가요? 
        <Link to="/signin"><span className="font-bold text-blue-3"> 로그인</span> 화면으로 이동</Link>
      </h4>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormField 
          label="아이디"
          id="userId"
          type="text"
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
              placeholder="5re5@email.com"
              disabled={emailVerified}
            />
            <Button 
              type="button"
              variant="secondary"
              onClick={handleEmailVerification}
              disabled={emailVerified}
            >
              인증번호 발송
            </Button>
          </div>
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="emailVerification">인증번호</Label>
          <div className="flex space-x-2">
            <Input
              type="text"
              id="emailVerification"
              value={formData.emailVerification}
              onChange={(e) => handleInputChange('emailVerification', e.target.value)}
              placeholder="인증번호를 입력하세요"
              disabled={emailVerified}
            />
            <Button 
              type="button" 
              variant="secondary"
              onClick={verifyEmailCode}
              disabled={emailVerified}
            >
              인증 확인
            </Button>
          </div>
          {errors.emailVerification && <p className="text-red-500">{errors.emailVerification}</p>}
        </div>

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
          onChange={(value: string) => handleInputChange('phoneNumber', value)}
          error={errors.phoneNumber}
          placeholder="전화번호를 입력하세요"
        />

        <AddressSearch
          address={formData.address}
          isOpen={isOpen}
          onComplete={(data: { address: string; }) => handleInputChange('address', data.address)}
          onClose={() => setIsOpen(false)}
          setIsOpen={setIsOpen}
        />

        <FormField
          label=""
          id="addressDetail"
          type="text"
          value={formData.detailAddress}
          onChange={(value: string) => handleInputChange('detailAddress', value)}
          error={errors.detailAddress}
          placeholder="상세 주소를 입력하세요"
        />

        <TermsSection
          terms={terms || []}
          error={errors.terms}
          onChange={handleTermChange}
          onAllChange={handleAllTermsChange}
        />

        <Button type="submit" variant="green" className="w-full py-5 rounded-3xl">가입하기</Button>
      </form>
    </div>
  );  
};

export default SignUp;
