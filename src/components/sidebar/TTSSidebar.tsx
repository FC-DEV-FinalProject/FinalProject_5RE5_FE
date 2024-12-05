import { useState } from 'react';
import { Button } from '@/components/ui/button';
import EditContent from '@/components/sidebar/sidebarContent/EditContent';
import { FileContent } from '@/components/sidebar/sidebarContent/FileContent';

interface IFileStatus {
  name: string;
  status: '완료' | '오류';
}

const TTSSidebar = () => {
  const [activeTab, setActiveTab] = useState<'file' | 'edit'>('file');
  const [allFiles, setAllFiles] = useState<IFileStatus[]>([]); // 전체 업로드 시도된 파일 리스트
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]); // 업로드 완료된 파일 리스트
  const [uploadingCount, setUploadingCount] = useState<number>(0); // 현재 업로드 중인 파일 개수

  return (
    <>
      <div className='flex gap-4 pb-4 mb-4 border-b'>
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
      {/* 탭별 콘텐츠 */}
      {activeTab === 'file' ? (
        <FileContent
          allFiles={allFiles}
          setAllFiles={setAllFiles}
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
          uploadingCount={uploadingCount}
          setUploadingCount={setUploadingCount}
        />
      ) : (
        <EditContent />
      )}
    </>
  );
};

export default TTSSidebar;
