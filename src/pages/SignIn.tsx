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
    <div className='flex items-center justify-center h-screen'>
      <div className='w-1/3 pb-28'>
        <h1 className='mb-5 text-5xl font-bold text-center'>
          <Link to='/'>AIPARK</Link>
        </h1>

        <div>
          <form
            className='flex flex-col items-center justify-center'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='w-2/3 mb-2'>
              <Input
                {...register('id', {
                  required: '아이디를 입력하세요.',
                })}
                placeholder='ID'
              />
              {errors.id && (
                <p className='mt-1 text-sm text-error'>{errors.id.message}</p>
              )}
            </div>

            <div className='w-2/3 mb-4'>
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

            <div className='flex items-center justify-start w-2/3 gap-2 mb-4'>
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

            <Button type='submit' className='w-2/3'>
              로그인
            </Button>
          </form>

          <ul className='flex items-center justify-between w-2/3 gap-2 m-auto mt-5 text-sm'>
            <li className="relative after:content-['|'] after:absolute after:top-[-1px] after:right-[-34px]">
              <Link to='/reset-password'>비밀번호 찾기</Link>
            </li>
            <li className="relative after:content-['|'] after:absolute after:top-[-1px] after:right-[-34px]">
              <Link to=''>아이디 찾기</Link>
            </li>
            <li className=''>
              <Link to='/signUp'>회원가입</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
