import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState, useRef, useEffect, forwardRef } from 'react';

interface IEditableLabelProps {
  initialValue: string;
  onSave: (value: string) => void;
}

const EditableLabel: React.FC<IEditableLabelProps> = ({
  initialValue,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
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
    onSave(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  };

  return (
    <div>
      {isEditing ? (
        <>
          <Input
            ref={inputRef}
            type='text'
            value={value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
          />
        </>
      ) : (
        <Label onClick={handleLabelClick}>{value}</Label>
      )}
    </div>
  );
};

export default EditableLabel;
