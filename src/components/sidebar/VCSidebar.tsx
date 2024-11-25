import { Button } from '@/components/ui/button';
import { UploadIcon } from 'lucide-react';

const VCSidebar = () => {
  const handleButton = {
    addOrgAudio: () => {},
    addTrgAudio: () => {},
    addTxtFile: () => {},
  };
  return (
    <div className='flex flex-col'>
      <div className='pt-5 pb-5 border-b-[1px] border-b-gray-500'>
        <p className='pb-5 '>삽입</p>
        <Button
          variant={'default'}
          className='w-[100%]'
          aria-label='보이스 클립 추가하기'
          onClick={handleButton.addOrgAudio}
        >
          보이스 클립 추가
        </Button>
      </div>
      <div className='pt-5 pb-5 '>
        <p className='pb-5 '>수정</p>
        <Button
          variant={'default'}
          className='w-[100%]'
          aria-label='생성 보이스 추가'
          onClick={handleButton.addTrgAudio}
        >
          생성 보이스 추가
        </Button>
      </div>
      <div className='pt-5 pb-5 '>
        <Button
          variant={'default'}
          className='w-[100%]'
          aria-label='텍스트 파일 추가'
          onClick={handleButton.addTxtFile}
        >
          <UploadIcon /> 텍스트 파일 추가
        </Button>
      </div>
    </div>
  );
};

export default VCSidebar;
