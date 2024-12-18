import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil } from 'lucide-react';
import { useRef, useState } from 'react';

interface IProjectDataProps {
  projectSeq?: number;
  projectDate?: string;
  projectUpdateDate?: string;
}
interface VcHeaderProps extends IProjectDataProps {
  projectName: string;
  onProjectNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  downloadAll: () => void;
  saveProject: () => void;
}

export const VcHeader: React.FC<VcHeaderProps> = ({
  projectName,
  onProjectNameChange,
  downloadAll,
  saveProject,
  projectSeq,
  projectDate,
  projectUpdateDate,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className='flex items-center justify-between flex-auto mb-4'>
      <div className='flex items-center flex-1 space-x-1'>
        <input
          value={projectName}
          onChange={onProjectNameChange}
          maxLength={50}
          title={projectName}
          ref={inputRef}
          className='w-1/2 text-xl border-none shadow-none'
          aria-label='프로젝트 이름'
          placeholder='프로젝트 이름을 입력하세요'
        />
        <Pencil
          className='cursor-pointer'
          onClick={() => {
            inputRef.current?.focus();
          }}
        />
      </div>
      <div className='flex items-center space-x-4'>
        <span className='text-gray-500'>
          {projectUpdateDate || projectDate || new Date().toLocaleDateString()}
        </span>
        <div className='flex'>
          <Button
            type='submit'
            variant='green'
            onClick={saveProject}
            className='w-[130px] mr-1 rounded-3xl'
          >
            저장
          </Button>
          <Button
            type='button'
            variant='green'
            onClick={downloadAll}
            className='w-[130px] rounded-3xl'
          >
            전체 다운로드
          </Button>
        </div>
      </div>
    </div>
  );
};
