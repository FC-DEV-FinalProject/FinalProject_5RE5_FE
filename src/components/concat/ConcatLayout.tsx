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
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className='h-full'>
          <div className='flex h-full'>
            <main className='p-4 overflow-auto bg-white grow'>
              <Concat />
            </main>

            <aside className='flex-none p-4 w-[280px] flex flex-col border-l'>
              <ConcatSidebar />
            </aside>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default ConcatLayout;
