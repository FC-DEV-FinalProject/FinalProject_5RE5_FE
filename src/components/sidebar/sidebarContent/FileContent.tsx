import { Button } from '@/components/ui/button';
import { useTextInputs } from '@/stores/textInputStore';

export const FileContent = () => {
  const { textInputs, addTextInputs } = useTextInputs();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        const sentences =
          text.match(/[^.!?]+[.!?]/g)?.map((sentence) => sentence.trim()) || [];
        addTextInputs(sentences);
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
