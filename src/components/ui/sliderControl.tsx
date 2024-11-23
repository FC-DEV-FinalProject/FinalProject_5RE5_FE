import { Slider } from '@/components/ui/slider';

export const SliderControl = ({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (value: number[]) => void;
  min: number;
  max: number;
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
          max={max}
          min={min}
          step={0.1} // 소수점 조정을 위한 step 추가
          className='flex-1'
        />
        <span className='text-sm font-medium text-gray-700'>
          {value ? value.toFixed(2) : '기본'}
        </span>
      </div>
    </div>
  );
};
