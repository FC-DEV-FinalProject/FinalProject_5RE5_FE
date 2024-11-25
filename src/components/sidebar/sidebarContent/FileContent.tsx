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

        // 줄바꿈 포함하여 문장 나누기
        const lines = text.split(/\n/); // 줄바꿈으로 나눔
        const sentences = lines
          .flatMap(
            (line) => line.match(/[^.!?]+[.!?]?/g) || [] // null 방지: 매칭 결과가 없으면 빈 배열 반환
          )
          .filter((sentence) => sentence.trim()) // 빈 값 제거
          .map((sentence) => sentence.trim()); // 공백 제거

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
