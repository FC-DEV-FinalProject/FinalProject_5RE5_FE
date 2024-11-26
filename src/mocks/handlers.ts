import { http, HttpResponse } from 'msw';

interface LoginPathParams {}
interface PostLoginReqBody {
  username: string;
  password: string;
}

export const handlers = [
  http.post<LoginPathParams, PostLoginReqBody>(
    `${import.meta.env.VITE_API_BASE_URL}/member/login`,
    async ({ request }) => {
      console.log('MSW 핸들러가 요청을 가로챘습니다:');

      const { username, password } = await request.json();

      // 응답을 5초 지연시키기 위해 Promise 사용
      return new Promise((resolve) => {
        setTimeout(() => {
          // 로그인 성공 조건 예시
          if (username === 'test' && password === 'test1234') {
            resolve(
              HttpResponse.json(
                {
                  success: true,
                  data: {
                    name: '테스트',
                    id: 'test',
                    seq: 1,
                    email: 'test@example.com',
                  },
                },
                {
                  status: 200,
                }
              )
            );
          } else {
            // 로그인 실패 조건
            resolve(
              HttpResponse.json(
                {
                  error: '인증 실패',
                },
                {
                  status: 401,
                }
              )
            );
          }
        }, 3000);
      });
    }
  ),
];
