import { Button } from '@/components/ui/button';
import { UploadIcon } from 'lucide-react';

const VCSidebar = () => {
  return (
    <div className='flex flex-col'>
      <div className='pt-5 pb-5 border-b-[1px] border-b-gray-500'>
        <p className='pb-5 '>삽입</p>
        <Button variant={'default'} className='w-[100%]'>
          보이스 클립 추가
        </Button>
      </div>
      <div className='pt-5 pb-5 '>
        <p className='pb-5 '>수정</p>
        <Button variant={'default'} className='w-[100%]'>
          생성 보이스 추가
        </Button>
      </div>
      <div className='pt-5 pb-5 '>
        <Button variant={'default'} className='w-[100%] '>
          <UploadIcon /> 텍스트 파일 추가
        </Button>
      </div>
    </div>
  );
};

export default VCSidebar;
