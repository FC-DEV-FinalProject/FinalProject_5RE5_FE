import { useState } from 'react';
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
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState<string>(value.toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const parsedValue = parseFloat(inputValue);

    // 입력 값이 숫자인지 확인
    if (!isNaN(parsedValue)) {
      const adjustedValue = Math.min(Math.max(parsedValue, min), max);
      onChange([adjustedValue]);
      setInputValue(adjustedValue.toString());
    } else {
      setInputValue(value.toString()); // 유효하지 않은 값일 경우 기존 값 복원
    }

    setIsEditing(false); // 입력 모드 종료
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur(); // Enter 키로 입력 완료
    }
  };

  const handleInputFocus = () => {
    setInputValue(''); // 포커스 시 기존 값 초기화
  };

  return (
    <div className='w-full'>
      {/* 라벨과 값 */}
      <div className='flex items-center justify-between'>
        <label className='text-sm font-medium text-gray-700'>{label}</label>
        {isEditing ? (
          <input
            type='number'
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            onFocus={handleInputFocus} // 포커스 시 기존 값 초기화
            min={min}
            max={max}
            step={0.1}
            className='w-16 px-1 text-sm text-right border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
        ) : (
          <span
            className='text-sm font-medium text-gray-700 cursor-pointer'
            onClick={() => setIsEditing(true)}
          >
            {value ? parseFloat(value.toFixed(1)) : '기본'}
          </span>
        )}
      </div>
      {/* 슬라이더 */}
      <div className='mt-2'>
        <Slider
          value={[value]}
          onValueChange={(v) => onChange(v)}
          max={max}
          min={min}
          step={0.1}
          className='w-full'
        />
      </div>
    </div>
  );
};
