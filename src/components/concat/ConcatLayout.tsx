import ConcatSidebar from '@/components/sidebar/ConcatSidebar';
import Concat from '@/pages/Concat';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { IFormValues } from '@/types/concat';

const ConcatLayout = () => {
  const methods = useForm<IFormValues>({
    defaultValues: {
      checkbox: [],
      text: [],
    },
  });
  const onSubmit: SubmitHandler<IFormValues> = (data) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className='size-full'>
        <div className='flex size-full'>
          {/* 메인 콘텐츠 */}
          <div className='overflow-auto grow'>
            <main className='p-4 bg-white min-w-[800px]'>
              <Concat />
            </main>
          </div>

          {/* 우측 사이드바 */}
          <aside className='p-4 w-[280px] flex flex-col border-l flex-none'>
            <ConcatSidebar />
          </aside>
        </div>
      </form>
    </FormProvider>
  );
};

export default ConcatLayout;
