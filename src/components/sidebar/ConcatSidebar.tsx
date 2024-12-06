import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConcatFileContent } from '@/components/sidebar/sidebarContent/ConcatFileContet';

interface IFileStatus {
  name: string;
  status: '완료' | '오류';
}

const ConcatSidebar = () => {
  const [activeTab, setActiveTab] = useState<'file' | 'edit'>('file');
  const [allFiles, setAllFiles] = useState<IFileStatus[]>([]); // 전체 업로드 시도된 파일 리스트
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]); // 업로드 완료된 파일 리스트
  const [uploadingCount, setUploadingCount] = useState<number>(0); // 현재 업로드 중인 파일 개수

  return (
    <>
      <div className='flex gap-4 mb-4'>
        <Button
          variant={activeTab === 'file' ? 'blue' : 'outline'}
          size='sm'
          onClick={() => setActiveTab('file')}
        >
          File
        </Button>
        <Button
          variant={activeTab === 'edit' ? 'blue' : 'outline'}
          size='sm'
          onClick={() => setActiveTab('edit')}
        >
          Edit
        </Button>
      </div>
      {activeTab === 'file' ? (
        <ConcatFileContent
          allFiles={allFiles}
          setAllFiles={setAllFiles}
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
          uploadingCount={uploadingCount}
          setUploadingCount={setUploadingCount}
        />
      ) : (
        <>
          <p className='mb-4 text-sm'>무음 추가</p>

          <div className='flex gap-3'>
            <Input value='0.0' id='silent' />
            <Button>적용</Button>
          </div>
        </>
      )}
    </>
  );
};

export default ConcatSidebar;
