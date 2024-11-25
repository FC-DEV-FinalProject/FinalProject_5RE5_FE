import { Button } from '@/components/ui/button';
import { useTextInputs } from '@/stores/textInputStore';

export const FileContent = () => {
  const { textInputs, addTextInputs } = useTextInputs();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // 줄바꿈 포함하여 문장 나누기
        try {
          const text = reader.result as string;
          const lines = text.split(/\n/); // 줄바꿈으로 나눔
          const sentences = lines
            .flatMap((line) => line.match(/[^.!?]+[.!?]?/g) || []) //문장이 없을경우 빈배열 반환
            .filter((sentence) => sentence.trim()) //빈값제거
            .map((sentence) => sentence.trim()); //공백제거

          if (sentences.length > 30) {
            alert(
              `문장이 너무 많습니다. 최대 30개의 문장만 처리됩니다. (${sentences.length - 30}개의 문장은 무시됩니다.)`
            );
          }

          // 최대 30개의 문장만 추가
          addTextInputs(sentences.slice(0, 30));
        } catch (error) {
          alert('텍스트 처리 중 오류가 발생했습니다.');
        }
      };
      reader.onerror = () => {
        alert('파일을 읽을 수 없습니다.');
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
