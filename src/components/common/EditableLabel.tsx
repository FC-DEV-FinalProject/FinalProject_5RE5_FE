import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  LabelHTMLAttributes,
  InputHTMLAttributes,
} from 'react';

type EditableLabelAttributes = Pick<
  LabelHTMLAttributes<HTMLLabelElement> & InputHTMLAttributes<HTMLInputElement>,
  keyof LabelHTMLAttributes<HTMLLabelElement> &
    keyof InputHTMLAttributes<HTMLInputElement>
>;

interface IEditableLabelProps extends EditableLabelAttributes {
  initialValue: string;
  onSave: (value: string) => void;
}

const EditableLabel: React.FC<IEditableLabelProps> = ({
  initialValue,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue.trim());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleLabelClick = () => {
    setIsEditing(true);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    try {
      onSave(value);
    } catch (error) {
      console.error('Failed to save value:', error);
      setValue(initialValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
    if (e.key === 'Escape') {
      setValue(initialValue); // initialvalue가 아니라 기존값 상태를 반환하도록
      setIsEditing(false);
    }
  };

  return (
    <div role='group' aria-label='편집 가능한 레이블'>
      {isEditing ? (
        <>
          <input
            ref={inputRef}
            type='text'
            value={value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            aria-label='텍스트 편집'
            title='Enter를 눌러 저장하거나 Escape를 눌러 취소하세요'
          />
        </>
      ) : (
        <Label onClick={handleLabelClick} role='button' title='클릭하여 편집'>
          {value}
        </Label>
      )}
    </div>
  );
};

export default EditableLabel;
