import { useState } from 'react';
import { Button } from '@/components/ui/button';
import EditContent from '@/components/sidebar/sidebarContent/EditContent';
import { FileContent } from '@/components/sidebar/sidebarContent/FileContent';

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
