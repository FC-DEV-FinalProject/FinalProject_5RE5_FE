import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { TTSHeader } from '@/components/tts/TTSHeader';
import { TTSControls } from '@/components/tts/TTSControls';
import { TextInputList } from '@/components/tts/TextInputList';
import { Button } from '@/components/ui/button';
import { useTextInputs } from '@/stores/textInputStore';

const TTS: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [projectName, setProjectName] = React.useState(projectId || '');
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    textInputs,
    addTextInput,
    handleTextChange,
    toggleSelection,
    toggleAllSelection,
    deleteSelectedInputs,
    saveInput,
    cancelEdit,
    isAllSelected,
    editingId,
  } = useTextInputs();

  useOutsideClick(containerRef, () => {
    if (textInputs.some((input) => input.isEditing)) {
      cancelEdit();
    }
  });

  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  return (
    <div className='container p-4 mx-auto' ref={containerRef}>
      <TTSHeader
        projectName={projectName}
        onProjectNameChange={handleProjectNameChange}
      />

      <TTSControls
        state={{ textInputs, editingId, isAllSelected }}
        toggleAllSelection={toggleAllSelection}
        deleteSelectedInputs={deleteSelectedInputs}
        addTextInput={addTextInput}
        saveInput={saveInput}
        cancelEdit={cancelEdit}
      />

      <TextInputList
        state={{ textInputs, isAllSelected, editingId }}
        toggleSelection={toggleSelection}
        handleTextChange={handleTextChange}
        cancelEdit={cancelEdit}
      />

      <div className='mt-4 text-center'>
        {textInputs.some((input) => input.isEditing) ? (
          <>
            <Button onClick={saveInput} className='mr-1'>
              저장
            </Button>
            <Button onClick={cancelEdit}>취소</Button>
          </>
        ) : (
          <Button onClick={addTextInput}>+ 텍스트 추가</Button>
        )}
      </div>
    </div>
  );
};

export default TTS;
