import ConcatTextItem from '@/components/concat/ConcatTextItem';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { IConcatItem, IFormValues } from '@/types/concat';

interface IConcatTextWrapProps {
  items: IConcatItem[];
}
export const ConcatTextWrap = ({ items }: IConcatTextWrapProps) => {
  const { register, handleSubmit } = useForm<IFormValues>({
    defaultValues: {
      checkbox: [],
      text: [],
    },
  });

  return (
    <ul className='flex flex-col gap-4'>
      <form onSubmit={handleSubmit(console.log)}>
        {items.map((item) => (
          <ConcatTextItem key={item.id} register={register} item={item} />
        ))}

        <Button type='submit'>생성하기</Button>
      </form>
    </ul>
  );
};

export default ConcatTextWrap;
