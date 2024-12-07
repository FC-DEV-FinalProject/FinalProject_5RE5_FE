import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button'; // Button 컴포넌트 임포트

export const SliderControl = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (value: number[]) => void;
  min: number;
  max: number;
  step: number; // step 값 추가
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
    const newValue =
      step === 1
        ? Math.min(Math.max(Math.round(value + step), min), max) // 정수 1단위
        : Math.min(Math.max(parseFloat((value + step).toFixed(1)), min), max); // 소수 0.1단위
    onChange([newValue]);
    setInputValue(newValue.toString());
  };

  const handleDecrement = () => {
    const newValue =
      step === 1
        ? Math.min(Math.max(Math.round(value - step), min), max) // 정수 1단위
        : Math.min(Math.max(parseFloat((value - step).toFixed(1)), min), max); // 소수 0.1단위
    onChange([newValue]);
    setInputValue(newValue.toString());
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
              {value.toFixed(step === 1 ? 0 : 1)} {/* 정수 또는 소수 표시 */}
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
          step={step} // 동적으로 step 설정
          className='w-full'
        />
      </div>
    </div>
  );
};
