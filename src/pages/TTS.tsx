import { TTSControls } from '@/components/tts/TTSControls';
import { TTSHeader } from '@/components/tts/TTSHeader';
import { TextInputList } from '@/components/tts/TextInputList';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useTextInputs } from '@/stores/textInputStore';
import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';

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
    resetInputSettings,
  } = useTextInputs();

  useOutsideClick(containerRef, () => {
    if (textInputs.some((input) => input.isEditing)) {
      cancelEdit();
    }
  });

  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const selectedCount = textInputs.filter((input) => input.isSelected).length;

  return (
    <div className='container w-full p-4 ' ref={containerRef}>
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
        selectedCount={selectedCount}
        totalCount={textInputs.length}
      />

      <TextInputList
        textInputs={textInputs}
        isAllSelected={isAllSelected}
        editingId={editingId}
        toggleSelection={toggleSelection}
        handleTextChange={handleTextChange}
        cancelEdit={cancelEdit}
        addTextInput={addTextInput}
        saveInput={saveInput}
        onSelectionChange={(selectedCount, totalCount) => {}}
        resetInputSettings={resetInputSettings}
      />
    </div>
  );
};

export default TTS;
