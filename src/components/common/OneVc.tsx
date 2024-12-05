import { createVc } from '@/apis/vc';
import { CustomCheckbox } from '@/components/common/CustomCheckbox';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { OneVcState, useVcStore, VcState } from '@/stores/vcDataStore';
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
  vcData: OneVcState;
}

const OneVc = ({ vcData }: IOneVcProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioStatus, setAudioStatus] = useState<TStatus>('stop');

  const { toggleSelection, handleTextChange, saveInput, cancelEdit } =
    useVcStore();

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
    onCreateVc: (srcSeq: number, trgSeq: number) => {
      createVc(srcSeq, trgSeq);
    },
  };

  const [inputEditingStates, setInputEditingStates] = useState<
    Record<number, boolean>
  >({});

  const handleInputFocus = (seq: number, isFocused: boolean) => {
    console.log('테스트', seq, isFocused);
    setInputEditingStates((prevState) => ({ ...prevState, [seq]: isFocused }));
  };

  // 오디오 재생시간 변경
  const [currentPlayTime, setCurrentPlayTime] = useState<string>('00:00');
  const [duration, setDuration] = useState<string>('00:00');
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
            onClick={() => {
              // console.log(trgSeq 변수처리)
              handler.onCreateVc(vcData.vcSrcFile.seq, 9);
            }}
          >
            VC 생성
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
      <div id='mainDiv' className='flex items-center'></div>

      <div className='relative flex items-center mb-2 space-x-2'>
        <CustomCheckbox
          id={`input-${vcData.vcSrcFile.seq}`}
          checked={vcData.isSelected}
          onCheckedChange={() => toggleSelection(vcData.vcSrcFile.seq)}
        />
        <Input
          value={vcData.vcText || vcData.vcSrcFile.name}
          onChange={(e) =>
            handleTextChange(vcData.vcSrcFile.seq, e.target.value)
          }
          placeholder='내용을 입력해주세요.(최대 2,000자)'
          onFocus={() => {
            handleInputFocus(vcData.vcSrcFile.seq, true);
            if (vcData.vcText === '') {
              cancelEdit();
            }
          }}
          onBlur={() => {
            handleInputFocus(vcData.vcSrcFile.seq, false);
            cancelEdit();
          }}
        />
        {/* {vcData.isEditing && ( */}
        {inputEditingStates[vcData.vcSrcFile.seq] && (
          <div className='absolute flex space-x-1 transform -translate-y-1/2 top-1/2 right-2'>
            <Button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                saveInput();
                handleInputFocus(vcData.vcSrcFile.seq, false);
              }}
              size='xs'
              variant='secondary'
              className='rounded-3xl'
            >
              저장
            </Button>
            <Button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                cancelEdit();
                handleInputFocus(vcData.vcSrcFile.seq, false);
              }}
              size='xs'
              variant='secondary'
              className='rounded-3xl'
            >
              취소
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OneVc;
