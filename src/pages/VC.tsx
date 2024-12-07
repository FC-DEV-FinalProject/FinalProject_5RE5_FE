import { saveProject } from '@/apis/project';
import { removeSrc } from '@/apis/vc';
import OneVc from '@/components/common/OneVc';
import VcControls from '@/components/vc/VcControls';
import { VcHeader } from '@/components/vc/VcHeader';
import { toast } from '@/hooks/use-toast';
import { useVcStore } from '@/stores/vcDataStore';
import { convertDateFormat } from '@/utils/date';
import { downloadZip } from '@/utils/file';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export interface IVcFileProps {
  seq: number;
  rowOrder: number;
  name: string;
  fileUrl: string;
}

const VC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [projectName, setProjectName] = useState<string>('새 프로젝트');

  const {
    vcList,
    uploadFiles,
    handleTextChange,
    editingId,
    removeList,
    isAllSelected,
    saveInput,
    cancelEdit,
    toggleAllSelection,
    toggleSelection,
    setActivate,
  } = useVcStore();

  const selectedCount = vcList
    .filter((oneVc) => oneVc.activate === 'Y')
    .filter((oneVc) => oneVc.isSelected).length;

  const handler = {
    onSave: async () => {
      // alert('save: ' + projectName);
      // 1. 프로젝트 저장
      try {
        await saveProject({
          projectSeq: Number(projectId),
          projectName,
        });
        // alert('프로젝트가 성공적으로 저장되었습니다.');
        toast({
          title: '프로젝트가 성공적으로 저장되었습니다.',
        });
      } catch (error) {
        // alert('프로젝트 저장 중 오류가 발생했습니다.');
        toast({
          title: '프로젝트 저장 중 오류가 발생했습니다.',
          variant: 'destructive',
        });
      }
      // 2. srg파일 저장

      // 3. trg파일 저장
    },
    onDownloadZip: async () => {
      downloadZip(
        vcList.map((oneVc) => oneVc.vcSrcFile),
        `${projectName}.zip`
      );
    },
    onTypeProjectName: (e: React.ChangeEvent<HTMLInputElement>) => {
      setProjectName(e.target.value);
    },
    removeVcList: (seqList: number[]) => {
      removeSrc(seqList);
    },
  };

  const getNowDate = () => {
    return Date.now();
  };

  return (
    <div>
      <div className='container w-full p-4 '>
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
          <div id='commonDiv'>
            {/* 리스트 컨트롤하는 파트 */}
            <VcControls
              state={{
                vcList,
                editingId,
                isAllSelected,
                removeList,
                uploadFiles,
              }}
              toggleAllSelection={toggleAllSelection}
              addRemoveList={handler.removeVcList}
              selectedCount={selectedCount}
              totalCount={
                vcList.filter((oneVc) => oneVc.activate === 'Y').length
              }
            />
          </div>
          <div id='vcListDiv' className='flex flex-col pt-5'>
            {/* vc데이터 리스트 */}
            {vcList && vcList.length > 0 ? (
              vcList
                .filter((oneVc) => oneVc.activate === 'Y')
                .map((oneVc, index) => <OneVc vcData={oneVc} key={index} />)
            ) : (
              <>
                <p>보이스 클립을 추가해 목소리를 변환해보세요</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VC;
