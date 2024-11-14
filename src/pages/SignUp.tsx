import DaumPostcode from 'react-daum-postcode';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Term {
  termCode: string;
  termName: string;
  shortCont: string;
  longCont: string;
  chkTerm: boolean;
}

const SignUp: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [emailVerification, setEmailVerification] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [terms, setTerms] = useState<Term[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [errors, setErrors] = useState<{[key:string]: string}>({});

  useEffect(()=> {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      const response = await fetch('/api/user/register');
      if (!response.ok) {
        throw new Error('Failed to fetch terms');
      }
      const data = await response.json();
      setTerms(data.response.userTerms);
    } catch (error) {
      console.error('Error fetching terms:', error);
    }
  };

  const handleComplete  = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname != '') {
        extraAddress += data.bname;
      }
      if (data.buildingName != '') {
        extraAddress += extraAddress != '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddress(fullAddress);
    setIsOpen(false);
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    // const formattedValue = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    setPhoneNumber(value);
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    const formattedValue = value.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    setBirthDate(formattedValue);
  };

  const validateForm = () => {
    const newErrors: {[key:string]: string} = {};

    if (!/^[a-zA-Z0-9]{6,20}$/.test(userId)) {
      newErrors.userId = '아이디는 6~20자의 영문 및 숫자만 허용됩니다.';
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(password)) {
      newErrors.password = '비밀번호는 8~20자, 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.';
    }
    if (/(.)\1\1/.test(password)) {
      newErrors.password = '비밀번호에 동일 문자를 3회 이상 연속 사용할 수 없습니다.';
    }

    if (password != confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (!/^[가-힣a-zA-Z]+$/.test(name)) {
      newErrors.name = '이름은 실명을 입력해야 하며 특수문자를 포함할 수 없습니다.';
    }

    const birthYear = parseInt(birthDate.split('-')[0], 10);
    const currentYear = new Date().getFullYear();
    if (currentYear - birthYear < 14) {
      newErrors.birthDate = '만 14세 이상만 가입할 수 있습니다.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
    }

    if (!/^\d{10,11}$/.test(phoneNumber)) {
      newErrors.phoneNumber = '휴대폰 번호는 10~11자의 숫자만 입력 가능합니다.';
    }

    if (!detailAddress) {
      newErrors.detailAddress = '상세주소를 입력해주세요.';
    }

    const requiredTerms = terms.filter(term => term.chkTerm);
    const allRequiredTermsChecked = requiredTerms.every(term => document.getElementById(term.termCode) as HTMLInputElement)?.checked;
    if (!allRequiredTermsChecked) {
      newErrors.terms = '필수 약관에 모두 동의해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;

  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('유효함.제출중');
    } else {
      console.log('에러남');
    }
  }

  return (
    <div className="container p-6 mx-auto">
      <h2 className="mb-2 text-2xl font-bold text-center">회원가입</h2>
      <h4 className="mb-6 font-bold text-center text-l">이미 계정이 있으신가요? <Link to="/signin">로그인 화면으로 이동</Link></h4>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="userId">아이디</Label>
          <Input type="text" id="userId" value={userId} onChange = {(e)=> setUserId(e.target.value)} placeholder="아이디를 입력하세요" />
          {errors.userId && <p className='text-red-500'>{errors.userId}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <div className="flex space-x-2">
            <Input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="이메일을 입력하세요" />
            <Button type="button">이메일 인증</Button>
          </div>
          {errors.email && <p className='text-red-500'>{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="emailVerification">이메일 인증번호</Label>
          <Input type="text" id="emailVerification" value={emailVerification} onChange={(e)=> setEmailVerification(e.target.value)} placeholder="인증번호를 입력하세요" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <Input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="비밀번호를 입력하세요" />
          {errors.password && <p className='text-red-500'>{errors.password}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">비밀번호 확인</Label>
          <Input 
            type="password" 
            id="confirmPassword" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 다시 입력하세요" 
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">이름</Label>
          <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름을 입력하세요" />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">전화번호</Label>
          <Input type="tel" id="phone" value={phoneNumber} onChange={handlePhoneNumberChange} placeholder="전화번호를 입력하세요" />
          {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthDate">생년월일</Label>
          <Input 
            type="text" 
            id="birthDate" 
            value={birthDate}
            onChange={handleBirthDateChange}
            placeholder="YYYY-MM-DD"
            maxLength={10}
          />
          {errors.birthDate && <p className="text-red-500">{errors.birthDate}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">주소</Label>
          <div className="flex space-x-2">
            <Input type="text" id="address" value={address} readOnly placeholder="주소 검색을 클릭하세요" />
            <Button type="button" onClick={() => setIsOpen(true)}>주소 검색</Button>
          </div>
        </div>

        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-4 bg-white rounded-lg">
              <DaumPostcode onComplete={handleComplete} autoClose={false} width={500} height={600} />
              <Button onClick={() => setIsOpen(false)} className='mt-4'>닫기</Button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {/* <Label htmlFor="addressDetail">상세 주소</Label> */}
          <Input type="text" id="addressDetail" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} placeholder="상세 주소를 입력하세요" />
          {errors.detailAddress && <p className="text-red-500">{errors.detailAddress}</p>}
        </div>

        <div className="space-y-2">
          <Label>약관 동의</Label>
          {terms.map((term) => (
            <div key={term.termCode} className="flex items-center space-x-2">
            <Checkbox id={term.termCode} />
            <label htmlFor={term.termCode} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {term.termName} {term.chkTerm ? '(필수)' : '(선택)'}
            </label>
          </div>
          ))}
          {errors.terms && <p className="text-red-500">{errors.terms}</p>}
        </div>

        <Button type="submit" className="w-full">가입하기</Button>
      </form>
    </div>
  );
};

export default SignUp;
