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
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [terms, setTerms] = useState<Term[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');

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
    const formattedValue = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    setPhoneNumber(formattedValue);
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    const formattedValue = value.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    setBirthDate(formattedValue);
  };

  return (
    <div className="container p-6 mx-auto">
      <h2 className="mb-2 text-2xl font-bold text-center">회원가입</h2>
      <h4 className="mb-6 font-bold text-center text-l">이미 계정이 있으신가요? <Link to="/signin">로그인 화면으로 이동</Link></h4>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="userId">아이디</Label>
          <Input type="text" id="userId" placeholder="아이디를 입력하세요" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <div className="flex space-x-2">
            <Input type="email" id="email" placeholder="이메일을 입력하세요" />
            <Button type="button">이메일 인증</Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="emailVerification">이메일 인증번호</Label>
          <Input type="text" id="emailVerification" placeholder="인증번호를 입력하세요" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <Input type="password" id="password" placeholder="비밀번호를 입력하세요" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">이름</Label>
          <Input type="text" id="name" placeholder="이름을 입력하세요" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">전화번호</Label>
          <Input type="tel" id="phone" value={phoneNumber} onChange={handlePhoneNumberChange} placeholder="전화번호를 입력하세요" />
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
        </div>

        <Button type="submit" className="w-full">가입하기</Button>
      </form>
    </div>
  );
};

export default SignUp;
