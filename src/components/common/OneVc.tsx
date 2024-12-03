import { CustomCheckbox } from '@/components/common/CustomCheckbox';
import EditableLabel from '@/components/common/EditableLabel';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { IVcDataProps } from '@/pages/VC';
import { downloadFile } from '@/utils/file';
import { formatTime } from '@/utils/time';
import {
  DownloadIcon,
  PauseIcon,
  Pencil,
  PlayIcon,
  RefreshCcwDotIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type TStatus = 'play' | 'pause' | 'stop';
interface IOneVcProps {
  vcData: IVcDataProps;
}

const OneVc = ({ vcData }: IOneVcProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioStatus, setAudioStatus] = useState<TStatus>('stop');
  const [vcText, setVcText] = useState<string>(
    vcData.vcText || vcData.vcSrcFile.name
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentPlayTime, setCurrentPlayTime] = useState<string>('00:00');
  const [duration, setDuration] = useState<string>('00:00');

  const handler = {
    onPlay: () => {
      audioRef.current?.play();
      setAudioStatus('play');
    },
    onPause: () => {
      audioRef.current?.pause();
      setAudioStatus('pause');
    },
    onDownload: async () => {
      try {
        downloadFile(vcData.vcSrcFile.fileUrl, vcData.vcSrcFile.name);
      } catch (err) {
        alert('파일 다운로드에 실패했습니다. 다시 시도해주세요.');
      }
    },
    onTypeText: (e: React.ChangeEvent<HTMLInputElement>) => {
      setVcText(e.target.value);
    },
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(formatTime(audio.duration));
    };

    const setAudioTime = () => {
      setCurrentPlayTime(formatTime(audio.currentTime));
    };

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, []);

  return (
    <div className='pb-5'>
      <div id='iconDiv' className='flex justify-between mb-1'>
        <div id='leftIcons'>
          <Button
            variant='outline'
            className='text-green-400 border-green-400 hover:bg-green-400 hover:text-white'
            size='sm'
          >
            재생성
            <RefreshCcwDotIcon />
          </Button>
        </div>
        <div id='rightIcons' className='flex'>
          <audio src={vcData.vcSrcFile.fileUrl} ref={audioRef} />
          <span className='content-center px-1 text-sm'>{`${currentPlayTime} / ${duration}`}</span>
          <Button
            variant={'ghost'}
            size={'sm'}
            onClick={audioStatus === 'play' ? handler.onPause : handler.onPlay}
            title={audioStatus === 'play' ? '일시정지' : '재생'}
          >
            {audioStatus === 'play' ? (
              <PauseIcon fill='black' />
            ) : (
              <PlayIcon fill='black' />
            )}
          </Button>
          <Button
            variant={'ghost'}
            size={'sm'}
            onClick={handler.onDownload}
            title='파일 다운로드'
          >
            <DownloadIcon />
          </Button>
        </div>
      </div>
      <div id='mainDiv' className='flex items-center'>
        <>
          <Checkbox className='mr-2' />
          <Input
            value={vcText}
            onChange={handler.onTypeText}
            maxLength={50}
            title={vcText}
            ref={inputRef}
            className='w-1/2 text-4xl border-none shadow-none'
          />
          <Pencil
            className='mx-2 cursor-pointer'
            onClick={() => {
              inputRef.current?.focus();
            }}
            size={16}
          />
        </>
      </div>
    </div>
  );
};

export default OneVc;
