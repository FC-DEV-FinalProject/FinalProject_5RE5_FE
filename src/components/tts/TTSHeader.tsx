import { ttsSave } from '@/apis/ttsSave';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

interface TTSHeaderProps {
  projectName: string;
  onProjectNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ttsSave: () => void;
}

export const TTSHeader: React.FC<TTSHeaderProps> = ({
  projectName,
  onProjectNameChange,
  ttsSave,
}) => {
  const [isEditable, setisEditable] = useState(false);

  const handleEditClick = () => {
    setisEditable(true);
    const inputRef = document.getElementById('project-name-input');
    if (inputRef) {
      (inputRef as HTMLInputElement).focus();
    }
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!isEditable) {
      e.preventDefault;
    }
  };

  return (
    <div className='flex items-center justify-between mb-4'>
      <div className='flex items-center space-x-1'>
        <Input
          id='project-name-input'
          value={projectName}
          onChange={onProjectNameChange}
          maxLength={50}
          className="text-4xl ${isEditable ? ' border-gray-100' : 'border-none shadow-none'} border-none shadow-none outline-none"
          readOnly={!isEditable}
          onClick={handleInputClick}
        />
        <Pencil onClick={handleEditClick} className='cursor-pointer' />
      </div>
      <div className='flex items-center space-x-4'>
        <span className='text-gray-500'>{new Date().toLocaleDateString()}</span>
        <div className='flex'>
          <Button
            type='submit'
            variant='green'
            className='w-[130px] mr-1 rounded-3xl'
            onClick={ttsSave}
          >
            저장
          </Button>
          <Button
            type='button'
            variant='green'
            className='w-[130px] rounded-3xl'
          >
            전체 다운로드
          </Button>
        </div>
      </div>
    </div>
  );
};
