import EditableLabel from '@/components/common/EditableLabel';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DownloadIcon, PlayIcon, RefreshCcwDotIcon } from 'lucide-react';

const OneVc = () => {
  return (
    <div className='pb-5'>
      <div id='iconDiv' className='flex justify-between mb-1'>
        <div id='leftIcons'>
          {/* <Button size={'sm'} variant={'aipark'}> */}
          <Button size={'sm'}>
            재생성
            <RefreshCcwDotIcon />
          </Button>
        </div>
        <div id='rightIcons' className='flex'>
          <Button variant={'ghost'} size={'sm'}>
            <PlayIcon fill='black' />
          </Button>
          <Button variant={'ghost'} size={'sm'}>
            <DownloadIcon />
          </Button>
        </div>
      </div>
      <div id='mainDiv' className='flex items-center'>
        <Checkbox className='mr-2' />
        <EditableLabel initialValue='대충파일경로' onSave={() => {}} />
      </div>
    </div>
  );
};

export default OneVc;
