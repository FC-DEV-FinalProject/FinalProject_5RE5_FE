import { createVc } from '@/apis/vc';
import DivideLine from '@/components/common/DividingLine';
import FileUpload from '@/components/common/FileUpload';
import { Button } from '@/components/ui/button';
import { OneVcState, useVcStore } from '@/stores/vcDataStore';
import { MessageSquareMoreIcon, SpeechIcon, UploadIcon } from 'lucide-react';
import { useEffect } from 'react';

const VCSidebar = () => {
  const { addVcList, uploadFiles, vcList } = useVcStore();

  const handler = {
    onCreate: () => {
      alert('vc생성하기');
      vcList.map((oneVc) => {
        // console.log(trgSeq);
        // createVc(oneVc.vcSrcFile.seq, 0);
      });
    },
    onSliceTxtFile: (files: File[]): Promise<string[]> => {
      return new Promise((resolve, reject) => {
        let allSentences: string[] = [];
        let filesProcessed = 0;

        Array.from(files).forEach((file) => {
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const text = reader.result as string;
              const lines = text.split(/\n/);
              const sentences = lines
                .flatMap((line) => line.match(/[^.!?]+[.!?]?/g) || [])
                .filter((sentence) => sentence.trim())
                .map((sentence) => sentence.trim());

              allSentences = allSentences.concat(sentences);
              filesProcessed++;

              if (filesProcessed === files.length) {
                if (allSentences.length > 30) {
                  console.warn(
                    `문장이 너무 많습니다. 최대 30개의 문장만 처리됩니다. (${allSentences.length - 30}개의 문장은 무시됩니다.)`
                  );
                  resolve(allSentences.slice(0, 30));
                } else {
                  resolve(allSentences);
                }
              }
            } catch (err) {
              reject(new Error('텍스트 처리 중 오류가 발생했습니다.'));
            }
          };
          reader.onerror = () => reject(new Error('파일 읽기 오류'));
          reader.readAsText(file);
        });
      });
    },
    onAddSrcFiles: (files: File[]) => {
      if (files && files.length > 0) {
        files.map((file, index) => {
          const vcData: OneVcState = {
            activate: 'Y',
            isEditing: false,
            isSelected: false,
            vcResultFile: null,
            vcSrcFile: {
              fileUrl: '',
              name: file.name,
              rowOrder: 0,
              // console.log('개발용 임시 seq');
              seq: Number(100) + Number(index) + Number(Date.now()), // 개발용 임시 seq
            },
            vcText: file.name,
          };
          addVcList(vcData);
        });
      }
    },
  };

  useEffect(() => {
    console.log(vcList);
  }, [vcList]);

  return (
    <div className='flex flex-col h-full'>
      <div id='sideTabMenu'>
        <Button variant={'blue'} size='sm'>
          File
        </Button>
      </div>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex-1 '>
          <FileUpload
            type='src'
            title='원본 오디오'
            buttonName='보이스 클립 추가'
            emptyText='보이스 클립을 추가해 목소리를 변환해보세요'
            buttonIcon={MessageSquareMoreIcon}
            afterSrcFn={handler.onAddSrcFiles}
            fileType='audio/*'
          />

          <DivideLine />

          <FileUpload
            type='trg'
            title='변환 오디오'
            buttonName='생성 보이스 추가'
            emptyText='생성 보이스로 목소리를 변환해보세요'
            buttonIcon={SpeechIcon}
            afterFn={() => {
              alert('생성 보이스');
            }}
            fileType='audio/*'
          />
          <DivideLine />

          <FileUpload
            type='txt'
            title='텍스트'
            buttonName='텍스트 파일 추가'
            emptyText=''
            buttonIcon={UploadIcon}
            afterTxtFn={handler.onSliceTxtFile}
            fileType='text/plain'
          />
        </div>
        <div className='flex items-center justify-between gap-1'>
          <Button
            className='w-full'
            variant={'green'}
            onClick={handler.onCreate}
          >
            생성하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VCSidebar;
