import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  AudioLines,
  AudioLinesIcon,
  Headphones,
  UploadIcon,
} from 'lucide-react';

const ConcatSidebar = () => {
  const [activeTab, setActiveTab] = useState<'file' | 'edit'>('file');

  return (
    <>
      <div className='flex gap-4 mb-4'>
        <Button
          variant={activeTab === 'file' ? 'blue' : 'outline'}
          size='sm'
          onClick={() => setActiveTab('file')}
        >
          File
        </Button>
        <Button
          variant={activeTab === 'edit' ? 'blue' : 'outline'}
          size='sm'
          onClick={() => setActiveTab('edit')}
        >
          Edit
        </Button>
      </div>
      {activeTab === 'file' ? (
        <div className='flex flex-col justify-between h-full'>
          <div>
            <div>
              <p className='mb-4'>편집 오디오</p>
              <Button className='w-full' size='sm' variant={'outline'}>
                <Headphones />
                오디오 파일 추가
              </Button>
              <ScrollArea className='h-24 my-2'>
                <ul className='px-2'>
                  <li>test.wav</li>
                  <li>asdfdf.wav</li>
                  <li>test.wav</li>
                  <li>asdfdf.wav</li>
                  <li>test.wav</li>
                  <li>asdfdf.wav</li>
                  <li>asdfdf.wav</li>
                  <li>test.wav</li>
                </ul>
                <ScrollBar forceMount orientation='vertical' />
              </ScrollArea>
            </div>

            <Separator className='my-3' />
            <div>
              <p className='mb-4 text-md'>텍스트</p>
              <Button className='w-full' size='sm' variant={'outline'}>
                <UploadIcon />
                텍스트 파일 추가
              </Button>
            </div>

            <Separator className='my-3' />

            <div>
              <p className='mb-4 text-md'>배경 오디오</p>
              <Button className='w-full' size='sm' variant={'outline'}>
                <AudioLinesIcon /> 배경 오디오 추가
              </Button>
              <ul className='mt-3 text-sm'>
                <li>asdfsd.mp3</li>
              </ul>
            </div>
          </div>
          <Button size='lg' variant={'green'}>
            생성하기
          </Button>
        </div>
      ) : (
        <>
          <p className='mb-4 text-sm'>무음 추가</p>

          <div className='flex gap-3'>
            <Input value='0.0' id='silent' />
            <Button>적용</Button>
          </div>
        </>
      )}
    </>
  );
};

export default ConcatSidebar;
