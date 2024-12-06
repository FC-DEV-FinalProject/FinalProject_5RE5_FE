import { Input } from '@/components/ui/input';
import { GripVertical, Play } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { IConcatdata, IFormValues } from '@/types/concat';
import { useConcatCheckboxStore } from '@/stores/concatCheckboxStore';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useFormContext } from 'react-hook-form';

interface IConcatTextItemProps {
  item: IConcatdata;
  dndId: string;
}

export const ConcatTextItem = ({ item, dndId }: IConcatTextItemProps) => {
  const selectedItems = useConcatCheckboxStore((state) => state.selectedItems);
  const toggleItem = useConcatCheckboxStore((state) => state.toggleItem);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: dndId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { register } = useFormContext<IFormValues>();

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      style={style}
      className={`draggable-item bg-white ${isDragging ? 'opacity-0' : ''}`}
    >
      <div className='relative flex items-center justify-between pl-3 pr-8 border rounded-lg brder-gray-200'>
        <div className='flex items-center w-full gap-5'>
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
          <label htmlFor={item.id} className='flex items-center w-full'>
            {item.text}
          </label>
        </div>
        <button className='p-3'>
          <Play fill='true' size={18} />
        </button>

        <div
          className='absolute top-0 right-0 flex items-center justify-center w-8 h-full border-l border-gray-100 hover:bg-gray-100'
          {...listeners}
        >
          <GripVertical />
        </div>
      </div>

      <div className='flex justify-center my-4'>
        <div className='px-4 py-2 border border-gray-200 rounded-lg'>
          무음 추가 : 0.0초
        </div>
      </div>
    </li>
  );
};

export default ConcatTextItem;
