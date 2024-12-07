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
  isVolume,
}: {
  label: string;
  value: number;
  onChange: (value: number[]) => void;
  min: number;
  max: number;
  step: number;
  isVolume?: boolean;
}) => {
  // 내부 값 -> 사용자 값 변환
  const convertInternalToUser = (internalValue: number): number => {
    if (!isVolume) return internalValue; // pitch일 경우 변환하지 않음
    return ((internalValue + 10) / 20) * (3 - 0.3) + 0.3;
  };

  // 사용자 값 -> 내부 값 변환
  const convertUserToInternal = (userValue: number): number => {
    if (!isVolume) return userValue; // pitch일 경우 변환하지 않음
    return Math.round(((userValue - 0.3) / (3 - 0.3)) * 20 - 10);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState<string>(
    convertInternalToUser(value).toFixed(isVolume ? 1 : 2)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const parsedValue = parseFloat(inputValue);

    if (!isNaN(parsedValue)) {
      const adjustedUserValue = Math.min(
        Math.max(parsedValue, isVolume ? 0.3 : min),
        isVolume ? 3 : max
      );
      const adjustedInternalValue = convertUserToInternal(adjustedUserValue);
      onChange([adjustedInternalValue]);
      setInputValue(adjustedUserValue.toFixed(isVolume ? 1 : 2));
    } else {
      setInputValue(convertInternalToUser(value).toFixed(isVolume ? 1 : 2)); // 유효하지 않은 값일 경우 복원
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
    const newInternalValue = Math.min(value + step, max);
    const newUserValue = convertInternalToUser(newInternalValue);
    onChange([newInternalValue]);
    setInputValue(newUserValue.toFixed(isVolume ? 1 : 2));
  };

  const handleDecrement = () => {
    const newInternalValue = Math.max(value - step, min);
    const newUserValue = convertInternalToUser(newInternalValue);
    onChange([newInternalValue]);
    setInputValue(newUserValue.toFixed(isVolume ? 1 : 2));
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
              x{convertInternalToUser(value).toFixed(1)}
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
          value={[value]} // 내부 값 사용
          onValueChange={(v) => {
            const internalValue = v[0];
            const userValue = convertInternalToUser(internalValue);
            onChange([internalValue]);
            setInputValue(userValue.toFixed(isVolume ? 1 : 2));
          }}
          max={max}
          min={min}
          step={step} // 내부 값 단위
          className='w-full'
        />
      </div>
    </div>
  );
};
