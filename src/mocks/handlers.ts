import { http, HttpResponse } from 'msw';

interface LoginPathParams {}
interface PostLoginReqBody {
  userId: string;
  password: string;
}

export const handlers = [
  http.post<LoginPathParams, PostLoginReqBody>(
    '/api/member/login',
    async ({ request }) => {
      const { userId, password } = await request.json();
      // 로그인 성공 조건 예시
      if (userId === 'test' && password === 'test1234') {
        return HttpResponse.json(
          { message: '로그인 성공' },
          {
            status: 200,
          }
        );
      }
      // 로그인 실패 조건
      return HttpResponse.json(
        { message: '유효하지 않는 아이디/비밀번호 입니다' },
        {
          status: 200,
        }
      );
    }
  ),
];
