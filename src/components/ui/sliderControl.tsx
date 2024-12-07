import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button'; // Button 컴포넌트 임포트

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

    if (!isNaN(parsedValue)) {
      const adjustedValue = Math.min(Math.max(parsedValue, min), max);
      onChange([adjustedValue]);
      setInputValue(adjustedValue.toString());
    } else {
      setInputValue(value.toString()); // 유효하지 않은 값일 경우 기존 값 복원
    }

    setIsEditing(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur(); // Enter로 입력 완료
    }
  };

  const handleInputFocus = () => {
    setInputValue(''); // 포커스 시 빈칸으로 초기화
  };

  const handleIncrement = () => {
    const newValue = Math.min(value + 0.1, max);
    onChange([newValue]);
    setInputValue(newValue.toFixed(1));
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - 0.1, min);
    onChange([newValue]);
    setInputValue(newValue.toFixed(1));
  };

  return (
    <div className='w-full'>
      {/* 라벨과 값 */}
      <div className='flex items-center justify-between'>
        <label className='text-sm font-medium text-gray-700'>{label}</label>
        <div className='flex items-center'>
          <Button
            onClick={handleDecrement}
            variant='outline'
            size='xs'
            className='rounded-r'
          >
            -
          </Button>
          {isEditing ? (
            <input
              type='text'
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              onFocus={handleInputFocus} // 포커스 시 빈칸으로 초기화
              className='h-6 px-4 text-xs text-right border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
              style={{ width: '4rem' }} // 고정 너비 추가
            />
          ) : (
            <span
              className='flex items-center justify-center h-6 px-4 text-xs text-gray-700 border border-gray-300 rounded-md cursor-pointer'
              style={{
                width: '58px',
                textAlign: 'center',
              }}
              onClick={() => setIsEditing(true)}
            >
              {value ? parseFloat(value.toFixed(1)) : '기본'}
            </span>
          )}
          <Button
            onClick={handleIncrement}
            variant='outline'
            size='xs'
            className='rounded-l'
          >
            +
          </Button>
        </div>
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
