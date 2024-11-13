import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const SignUp: React.FC = () => {
  return (
    <div className="container p-6 mx-auto">
      <h2 className="mb-6 text-2xl font-bold">회원가입</h2>
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
          <Input type="tel" id="phone" placeholder="전화번호를 입력하세요" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">주소지</Label>
          <Input type="text" id="address" placeholder="주소를 입력하세요" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="addressDetail">상세주소지</Label>
          <Input type="text" id="addressDetail" placeholder="상세주소를 입력하세요" />
        </div>

        <div className="space-y-2">
          <Label>약관 동의</Label>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                이용약관 동의 (필수)
              </label>
            </div>
            {/* 추가 약관 항목들... */}
          </div>
        </div>

        <Button type="submit" className="w-full">가입하기</Button>
      </form>
    </div>
  );
};

export default SignUp;
