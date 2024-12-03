import { Input } from '@/components/ui/input';
import { Play } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormRegister } from 'react-hook-form';
import { IConcatItem, IFormValues } from '@/types/concat';
import { useConcatCheckboxStore } from '@/stores/concatCheckboxStore';

interface IConcatTextItemProps {
  register: UseFormRegister<IFormValues>;
  item: IConcatItem;
}

export const ConcatTextItem = ({ register, item }: IConcatTextItemProps) => {
  const selectedItems = useConcatCheckboxStore((state) => state.selectedItems);
  const toggleItem = useConcatCheckboxStore((state) => state.toggleItem);
  return (
    <li>
      <div className='flex items-center justify-end mb-2'>
        <Play fill='true' size={18} className='cursor-pointer' />
      </div>

      <div className='flex items-center gap-5'>
        <Checkbox
          {...register('checkbox')}
          type='checkbox'
          id={item.id}
          checked={selectedItems.includes(item.id)}
          onCheckedChange={() => {
            toggleItem(item.id);
          }}
          className='data-[state=checked]:bg-green-6 data-[state=checked]:border-green-6 border-gray-300 w-5 h-5'
        />
        <Input {...register('text')} defaultValue={item.text} />
      </div>

      <div className='flex justify-center mt-2'>
        <p>무음 추가 : 0.0초</p>
      </div>
    </li>
  );
};

export default ConcatTextItem;
