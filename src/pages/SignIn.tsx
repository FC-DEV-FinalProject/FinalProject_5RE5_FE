import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import useLogin from '@/hooks/apis/useLogin';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ILoginFormInput {
  username: string;
  password: string;
}

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<ILoginFormInput>();
  const { mutate, isPending, error, reset } = useLogin(resetForm);
  const onSubmit: SubmitHandler<ILoginFormInput> = ({ username, password }) => {
    mutate({ username, password });
  };
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    if (error?.statusCode === 401) {
      setLoginError(true);
    }
    if (error?.statusCode === 500) {
      alert('로그인에 실패했습니다.');
    }
    reset();
  }, [error]);

  return (
    <div className='flex login-wrap min-w-[1280px] h-screen min-h-[600px] border-box'>
      <div className='w-[53%] bg-blue-2 relative flex justify-end'>
        <div className='w-full max-w-[800px] border-box pt-8 pl-10'>
          <h1 className='w-[108px] h-[23px]'>
            <Link to='/'>
              <img src='./src/assets/logo.png' alt='' />
            </Link>
          </h1>
          <div className='mt-[240px] h-[85px] overflow-hidden'>
            <p className='text-[57px] font-bold text-blue-7 animate-text-slide'>
              내가 적은 시나리오1
            </p>
            <p className='text-[57px] font-bold text-blue-7 animate-text-slide'>
              내가 적은 시나리오2
            </p>
            <p className='text-[57px] font-bold text-blue-7 animate-text-slide'>
              내가 적은 시나리오3
            </p>
            <p className='text-[57px] font-bold text-blue-7 animate-text-slide'>
              내가 적은 시나리오4
            </p>
            <p className='text-[57px] font-bold text-blue-7 animate-text-slide'>
              내가 적은 시나리오1
            </p>
          </div>

          <p className='text-[57px] text-blue-7'>AI 오디오 생성해줘</p>
        </div>
      </div>

      <div className='w-[47%] flex justify-center'>
        <div className='w-[500px] mt-[240px] flex flex-col items-stretch gap-5'>
          <p className='text-[36px] text-center'>시작하기</p>
          <div>
            <form className='' onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-col gap-3'>
                <Input
                  {...register('username', {
                    required: '아이디를 입력하세요.',
                  })}
                  placeholder='ID'
                  onFocus={() => setLoginError(false)}
                  autoComplete='off'
                />
                {errors.username && (
                  <p className='mt-[-7px] text-sm text-error'>
                    {errors.username.message}
                  </p>
                )}

                <Input
                  {...register('password', {
                    required: '비밀번호를 입력하세요.',
                  })}
                  placeholder='Password'
                  type='password'
                  autoComplete='new-password'
                  onFocus={() => setLoginError(false)}
                />
                {errors.password && (
                  <p className='mt-[-7px] text-sm text-error'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className='flex items-center gap-1 mt-3 mb-3'>
                <Checkbox
                  id='keep-login'
                  aria-label='로그인 상태 유지'
                  aria-describedby='로그인 상태 유지'
                  className='data-[state=checked]:bg-green-6 data-[state=checked]:border-green-6 border-gray-300'
                />
                <label
                  htmlFor='keep-login'
                  className='text-sm text-gray-600 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  로그인 유지하기
                </label>
                <span id='keep-login-description' className='sr-only'>
                  체크하면 다음 접속 시 자동으로 로그인됩니다
                </span>
              </div>

              {loginError && (
                <p className='mb-3 text-sm text-error'>
                  아이디 또는 비밀번호를 확인해주세요.
                </p>
              )}

              <Button
                type='submit'
                variant='green'
                className='w-full'
                size='lg'
              >
                {isPending ? (
                  <LoaderCircle className='animate-spin' />
                ) : (
                  '로그인'
                )}
              </Button>
            </form>
          </div>

          <ul className='text-[#999] text-sm mx-auto flex max-w-[300px] gap-7'>
            <li className='after:content-["|"] after:absolute after:right-[-15px] after:top-[-1px] relative after:text-[#d9d9d9]'>
              <Link to='/reset-password'>비밀번호 찾기</Link>
            </li>
            <li className='after:content-["|"] after:absolute after:right-[-15px] after:top-[-1px] relative after:text-[#d9d9d9]'>
              <Link to=''>아이디 찾기</Link>
            </li>
            <li className=''>
              <Link to='/signup'>회원가입</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
