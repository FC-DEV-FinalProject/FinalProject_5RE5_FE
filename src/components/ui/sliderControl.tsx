import { Slider } from '@/components/ui/slider';

export const SliderControl = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number[]) => void;
}) => {
  return (
    <div className='flex flex-col items-start w-full gap-2'>
      {/* 제목 */}
      <label className='text-sm font-medium text-gray-700'>{label}</label>
      {/* 슬라이더 및 값 */}
      <div className='flex items-center w-full gap-4'>
        <Slider
          value={[value]}
          onValueChange={(v) => onChange(v)}
          max={100}
          className='flex-1'
        />
        <span className='text-sm font-medium text-gray-700'>
          {value > 0 ? value : '없음'}
        </span>
      </div>
    </div>
  );
};
