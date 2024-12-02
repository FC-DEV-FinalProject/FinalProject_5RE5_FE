import EditableLabel from '@/components/common/EditableLabel';
import OneVc from '@/components/common/OneVc';
import { Button } from '@/components/ui/button';
import { MOCK_VC_DATA } from '@/mocks/vcData';
import { DownloadIcon, SaveIcon } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export interface IVcDataProps {
  activate: 'Y' | 'N';
  vcSrcFile: {
    seq: number;
    rowOrder: number;
    name: string;
    fileUrl: string;
  };
  vcResultFile?: string | null;
  vcText?: string | null;
}

const VC = () => {
  const [vcData, setVcData] = useState<IVcDataProps[]>([
    ...(MOCK_VC_DATA || []),
  ]);

  const { projectId } = useParams<{ projectId: string }>();
  const [projectName, setProjectName] = useState<string>('새 프로젝트');

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
        <EditableLabel
          initialValue={projectName}
          onSave={(value) => {
            setProjectName(value);
          }}
        />
        <Button className='mr-5' onClick={handleButton.save}>
          저장하기 <SaveIcon />
        </Button>
        <Button className='mr-5' onClick={handleButton.download}>
          다운로드 <DownloadIcon />
        </Button>
      </div>
      <div id='vcListDiv' className='flex flex-col pt-5'>
        {vcData && vcData.length > 0 ? (
          vcData.map((vc) => <OneVc vcData={vc} key={`${vc.vcSrcFile.seq}`} />)
        ) : (
          <p>보이스 클립을 추가해 목소리를 변환해보세요</p>
        )}
      </div>
    </div>
  );
};

export default VC;
