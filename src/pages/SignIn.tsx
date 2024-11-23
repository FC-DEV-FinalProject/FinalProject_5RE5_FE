import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import axios from 'axios';

interface ILoginFormInput {
  id: string;
  password: string;
}

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();

  async function login(userId: string, password: string) {
    try {
      const response = await axios.post(
        '/api/member/login',
        {
          userId,
          password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
    login(data.id, data.password);
  };

  return (
    <div className='flex login-wrap'>
      <div className='w-[53%] bg-[#D6EEFE]'>
        <h1 className='mt-[40px]'>
          <Link to='/'>
            <img src='./src/assets/logo.png' alt='' />
          </Link>
        </h1>

        <p>내가 적은 시나리오</p>
        <p>AI 오디오로 생성해줘</p>
      </div>

      <div className='w-[47%]'>
        <p>시작하기</p>
        <div>
          <form className='' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                {...register('id', {
                  required: '아이디를 입력하세요.',
                })}
                placeholder='ID'
              />
              {errors.id && (
                <p className='mt-1 text-sm text-error'>{errors.id.message}</p>
              )}

              <Input
                {...register('password', {
                  required: '비밀번호를 입력하세요.',
                })}
                placeholder='Password'
                type='password'
                autoComplete='new-password'
              />
              {errors.password && (
                <p className='mt-1 text-sm text-error'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className=''>
              <Checkbox
                id='keep-login'
                aria-label='로그인 상태 유지'
                aria-describedby='로그인 상태 유지'
              />
              <label
                htmlFor='keep-login'
                className='text-sm cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                로그인 유지하기
              </label>
              <span id='keep-login-description' className='sr-only'>
                체크하면 다음 접속 시 자동으로 로그인됩니다
              </span>
            </div>

            <Button type='submit'>로그인</Button>
          </form>
        </div>

        <ul className=''>
          <li className=''>
            <Link to='/reset-password'>비밀번호 찾기</Link>
          </li>
          <li className=''>
            <Link to=''>아이디 찾기</Link>
          </li>
          <li className=''>
            <Link to='/signup'>회원가입</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SignIn;
