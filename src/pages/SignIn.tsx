import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
  const onSubmit: SubmitHandler<ILoginFormInput> = (data) => console.log(data);

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
                {...register('id', { required: '아이디를 입력하세요.' })}
                placeholder='ID'
              />
              {errors.id && (
                <p className='mt-1 text-sm text-error'>{errors.id.message}</p>
              )}
            </div>

            <div className='w-2/3'>
              <Input
                {...register('password', {
                  required: '비밀번호를 입력하세요.',
                })}
                placeholder='Password'
                type='password'
              />
              {errors.password && (
                <p className='mt-1 text-sm text-error'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type='submit' className='w-2/3 mt-5'>
              로그인
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
