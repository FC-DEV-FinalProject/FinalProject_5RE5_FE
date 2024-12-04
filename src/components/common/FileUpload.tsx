import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CircleIcon,
  LucideProps,
  MessageSquareMoreIcon,
  UploadIcon,
} from 'lucide-react';
import React, { useRef, useState } from 'react';

export interface IFileUploadProps {
  title?: string;
  buttonName?: string;
  emptyText?: string | null;
  buttonIcon?: React.ComponentType<Omit<LucideProps, 'ref'>>;
}

const FileUpload: React.FC<IFileUploadProps> = ({
  title,
  buttonName = '파일 업로드',
  emptyText = '파일을 업로드 해주세요',
  buttonIcon: ButtonIcon = UploadIcon,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handler = {
    srcUploadClick: () => {
      fileInputRef.current?.click();
    },
    srcFileChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const fileList = Array.from(event.target.files);
        setFiles((prevFiles) => [...prevFiles, ...fileList]);
      }
    },
  };
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
      />
      {files && files.length > 0 ? (
        <div id='uploadFileList'>
          <ul className='my-2'>
            {files.map((file, index) => (
              <li key={index} className='box-content w-full mb-2 text-sm'>
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
