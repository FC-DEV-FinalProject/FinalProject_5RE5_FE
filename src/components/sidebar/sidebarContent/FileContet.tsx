import { Button } from '@/components/ui/button';
import { useTextInputs } from '@/stores/textInputStore';
import { useEffect } from 'react';

export const FileContent = () => {
  const { textInputs, addTextInputs } = useTextInputs(); // zustand 상태 사용

  useEffect(() => {
    console.log('업데이트된 상태:', textInputs);
  }, [textInputs]); // 상태 변경 시 실행

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        const sentences = text
          .split(/[.!?]/)
          .filter((sentence) => sentence.trim());
        addTextInputs(sentences); // zustand 상태 업데이트
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1 w-full'>
        <Button
          className='w-full'
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          텍스트 파일추가
        </Button>
        <input
          id='file-upload'
          type='file'
          accept='.txt'
          className='hidden'
          onChange={handleFileUpload}
        />
      </div>

      <div className='flex items-center justify-between gap-1'>
        <Button className='flex-1' variant='default'>
          생성하기
        </Button>
      </div>
    </div>
  );
};
