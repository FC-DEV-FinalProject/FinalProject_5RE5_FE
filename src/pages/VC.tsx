import OneVc from '@/components/common/OneVc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DownloadIcon, SaveIcon } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const VC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [projectName, setProjectName] = useState<string>();

  const handleButton = {
    save: () => {
      alert('save: ' + projectName);
    },
    download: () => {
      alert('다운로드 요청: ' + projectId);
    },
  };

  const onType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  return (
    <div>
      <div id='commonDiv' className='flex '>
        <Input
          className='mr-5'
          defaultValue={projectName}
          onChange={onType}
          aria-label='프로젝트 이름'
          placeholder='프로젝트 이름을 입력하세요'
        />
        <Button className='mr-5' onClick={handleButton.save}>
          저장하기 <SaveIcon />
        </Button>
        <Button className='mr-5' onClick={handleButton.download}>
          다운로드 <DownloadIcon />
        </Button>
      </div>
      <div id='vcListDiv' className='flex flex-col pt-5'>
        <OneVc />
        <OneVc />
        <OneVc />
      </div>
    </div>
  );
};

export default VC;
