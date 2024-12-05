import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useVcStore } from '@/stores/vcDataStore';
import { CircleIcon, LucideProps, UploadIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

type FileUploadStatus = '대기' | '업로드 중' | '완료' | '오류';
export interface IFileUploadProps {
  title?: string;
  buttonName?: string;
  emptyText?: string | null;
  buttonIcon?: React.ComponentType<Omit<LucideProps, 'ref'>>;
  afterFn?: () => void;
  fileType?: string;
  type: 'src' | 'trg' | 'txt';
  afterTxtFn?: (files: File[]) => Promise<string[]>;
}

/**
 *
 * @param param0: {title: 헤더타이틀, buttonName: 버튼이름, emptyText: 빈 값일때 표시 텍스트, buttonIcon: 버튼 아이콘, afterFn: 파일추가 후 실행함수}
 * @returns
 */
const FileUpload: React.FC<IFileUploadProps> = ({
  title,
  buttonName = '파일 업로드',
  emptyText = '파일을 업로드 해주세요',
  buttonIcon: ButtonIcon = UploadIcon,
  afterFn,
  afterTxtFn,
  fileType = 'audio/*',
  type = 'src',
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { addSrcFiles, setTxtFiles } = useVcStore();

  const handler = {
    srcUploadClick: () => {
      fileInputRef.current?.click();
      // setFiles([]);
    },
    srcFileChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const fileList = Array.from(event.target.files);
        setFiles((prevFiles) => [...prevFiles, ...fileList]);
      }
    },
  };

  useEffect(() => {
    if (files.length > 0) {
      if (type === 'src') addSrcFiles(files);
      else if (type === 'txt' && afterTxtFn) {
        afterTxtFn(files)
          .then((textList) => {
            setTxtFiles(textList);
          })
          .catch((error) => {
            console.error('Error processing files:', error);
          });
      }
    }
  }, [files]);
  return (
    <div className='pt-5 pb-5'>
      {title && (
        <div className='px-2 my-2 text-sm font-bold text-left'>{title}</div>
      )}
      <Button
        variant={'outline'}
        className='w-[100%]'
        aria-label={buttonName}
        onClick={handler.srcUploadClick}
      >
        {ButtonIcon && <ButtonIcon />}
        {buttonName}
      </Button>
      <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handler.srcFileChange}
        multiple
        accept={fileType}
      />
      {files && files.length > 0 ? (
        <div id='uploadFileList'>
          <ul className='my-2'>
            {files.map((file, index) => (
              <li
                key={file.name + index + files.length}
                className='box-content w-full mb-2 text-sm'
              >
                <div className='flex justify-between flex-grow mx-2'>
                  <span
                    className='content-center w-2/3 text-xs truncate'
                    title={file.name}
                  >
                    {file.name}
                  </span>
                  <Badge className='w-1/4 px-2 text-center' variant={'outline'}>
                    <CircleIcon size={8} fill='green' />
                    &nbsp;완료
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        emptyText &&
        emptyText.trim() !== '' && (
          <div className='p-1 my-2 w-[100%] text-[12px] text-center rounded-lg bg-gray-300 break-keep'>
            {emptyText}
          </div>
        )
      )}
    </div>
  );
};

export default FileUpload;
