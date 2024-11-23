import { useState } from 'react';
import { Button } from '@/components/ui/button';
import EditContent from '@/components/sidebar/sidebarContent/EditContent';

const FileContent = () => {
  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1 w-full'>
        <Button className='w-full'>텍스트 파일추가</Button>
      </div>

      <div className='flex items-center justify-between gap-1'>
        <Button className='flex-1' variant='default'>
          생성하기
        </Button>
      </div>
    </div>
  );
};

const TTSSidebar = () => {
  const [activeTab, setActiveTab] = useState<'file' | 'edit'>('file');

  return (
    <>
      <div className='flex gap-4 mb-4'>
        <Button
          variant={activeTab === 'file' ? 'default' : 'outline'}
          size='sm'
          onClick={() => setActiveTab('file')}
        >
          File
        </Button>
        <Button
          variant={activeTab === 'edit' ? 'default' : 'outline'}
          size='sm'
          onClick={() => setActiveTab('edit')}
        >
          Edit
        </Button>
      </div>
      {/* 탭별 콘텐츠 */}
      {activeTab === 'file' ? <FileContent /> : <EditContent />}
    </>
  );
};

export default TTSSidebar;
