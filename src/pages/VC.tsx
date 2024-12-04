import { saveProject } from '@/apis/project';
import { getVcList } from '@/apis/vc';
import DivideLine from '@/components/common/DividingLine';
import EditableLabel from '@/components/common/EditableLabel';
import OneVc from '@/components/common/OneVc';
import { TTSControls } from '@/components/tts/TTSControls';
import { TTSHeader } from '@/components/tts/TTSHeader';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { VcHeader } from '@/components/vc/VcHeader';
import { MOCK_VC_DATA } from '@/mocks/vcData';
import { useTextInputs } from '@/stores/textInputStore';
import { convertDateFormat } from '@/utils/date';
import { downloadZip } from '@/utils/file';
import { DownloadIcon, SaveIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export interface IVcDataProps {
  activate: 'Y' | 'N';
  vcSrcFile: IVcFileProps;
  vcResultFile?: string | null;
  vcText?: string | null;
}

export interface IVcFileProps {
  seq: number;
  rowOrder: number;
  name: string;
  fileUrl: string;
}

const VC = () => {
  // const [vcData, setVcData] = useState<IVcDataProps[]>([
  //   ...(MOCK_VC_DATA || []),
  // ]);
  const [vcData, setVcData] = useState<IVcDataProps[]>([]);

  const { projectId } = useParams<{ projectId: string }>();
  console.log(projectId);
  const [projectName, setProjectName] = useState<string>('새 프로젝트');

  const handler = {
    onSave: () => {
      alert('save: ' + projectName);
      // 1. 프로젝트 저장
      saveProject({
        projectSeq: Number(projectId),
        projectName,
      });
      // 2. srg파일 저장

      // 3. trg파일 저장
    },
    onDownloadZip: async () => {
      downloadZip(
        vcData.map((vc) => vc.vcSrcFile),
        `${projectName}.zip`
      );
    },
    onTypeProjectName: (e: React.ChangeEvent<HTMLInputElement>) => {
      setProjectName(e.target.value);
    },
  };

  useEffect(() => {
    (async () => {
      console.log('수정필요');
      const a = await getVcList({
        projectSeq: Number(projectId),
      });
    })();
  }, []);

  return (
    <div>
      <div className='container p-4 h-[calc(100vh-170px)] w-full overflow-y-auto'>
        <div id='headerDiv'>
          {/* 프로젝트명, 저장, 다운로드 버튼 */}
          <VcHeader
            projectName={projectName}
            onProjectNameChange={handler.onTypeProjectName}
            downloadAll={handler.onDownloadZip}
            saveProject={handler.onSave}
          />
        </div>
        <div id='mainDiv'>
          <div id='commonDiv'>{/* 리스트 컨트롤하는 파트 */}</div>
          <div id='vcListDiv' className='flex flex-col pt-5'>
            {/* vc데이터 리스트 */}
            {vcData && vcData.length > 0 ? (
              vcData.map((vc) => (
                <OneVc vcData={vc} key={`${vc.vcSrcFile.seq}`} />
              ))
            ) : (
              <p>보이스 클립을 추가해 목소리를 변환해보세요</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VC;
