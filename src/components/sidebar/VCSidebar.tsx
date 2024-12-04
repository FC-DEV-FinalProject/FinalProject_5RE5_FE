import DivideLine from '@/components/common/DividingLine';
import FileUpload from '@/components/common/FileUpload';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Circle,
  FileIcon,
  MessageCircleIcon,
  MessageSquareMoreIcon,
  MusicIcon,
  SpeechIcon,
  UploadIcon,
} from 'lucide-react';
import { useRef, useState } from 'react';

const VCSidebar = () => {
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
    addOrgAudio: () => {},
    addTrgAudio: () => {},
    addTxtFile: () => {},
  };
  return (
    <div className='flex flex-col'>
      <div id='sideTabMenu'>
        <Button variant={'blue'} size='sm'>
          File
        </Button>
      </div>
      <FileUpload
        title='원본 오디오'
        buttonName='보이스 클립 추가'
        emptyText='보이스 클립을 추가해 목소리를 변환해보세요'
        buttonIcon={MessageSquareMoreIcon}
      />

      <DivideLine />

      <FileUpload
        title='변환 오디오'
        buttonName='생성 보이스 추가'
        emptyText='생성 보이스로 목소리를 변환해보세요'
        buttonIcon={SpeechIcon}
      />
      <DivideLine />

      <FileUpload
        title='텍스트'
        buttonName='텍스트 파일 추가'
        emptyText=''
        buttonIcon={UploadIcon}
      />
    </div>
  );
};

export default VCSidebar;
