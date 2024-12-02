import EditableLabel from '@/components/common/EditableLabel';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { IVcDataProps } from '@/pages/VC';
import {
  DownloadIcon,
  PauseIcon,
  PlayIcon,
  RefreshCcwDotIcon,
} from 'lucide-react';
import { useRef, useState } from 'react';

type TStatus = 'play' | 'pause' | 'stop';
interface IOneVcProps {
  vcData: IVcDataProps;
}

const OneVc = ({ vcData }: IOneVcProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioStatus, setAudioStatus] = useState<TStatus>('stop');
  const handleButton = {
    onPlay: () => {
      audioRef.current?.play();
      setAudioStatus('play');
    },
    onPause: () => {
      audioRef.current?.pause();
      setAudioStatus('pause');
    },
  };

  return (
    <div className='pb-5'>
      <div id='iconDiv' className='flex justify-between mb-1'>
        <div id='leftIcons'>
          <Button size={'sm'}>
            재생성
            <RefreshCcwDotIcon />
          </Button>
        </div>
        <div id='rightIcons' className='flex'>
          <audio src={vcData.vcSrcFile.fileUrl} ref={audioRef} />
          <Button
            variant={'ghost'}
            size={'sm'}
            onClick={
              audioStatus === 'play'
                ? handleButton.onPause
                : handleButton.onPlay
            }
          >
            {audioStatus === 'play' ? (
              <PauseIcon fill='black' />
            ) : (
              <PlayIcon fill='black' />
            )}
          </Button>
          <Button variant={'ghost'} size={'sm'}>
            <DownloadIcon />
          </Button>
        </div>
      </div>
      <div id='mainDiv' className='flex items-center'>
        <Checkbox className='mr-2' />
        <EditableLabel
          initialValue={vcData.vcText || vcData.vcSrcFile.name}
          onSave={() => {}}
        />
      </div>
    </div>
  );
};

export default OneVc;
