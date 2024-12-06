import { fetchTTSList } from '@/apis/ttsList';
import { TTSControls } from '@/components/tts/TTSControls';
import { TTSHeader } from '@/components/tts/TTSHeader';
import { TextInputList } from '@/components/tts/TextInputList';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useTextInputs } from '@/stores/textInputStore';
import React, { useEffect, useRef } from 'react';
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
    addTextInputs,
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

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!projectId) return;
      try {
        const sentenceList = await fetchTTSList(projectId);
        const texts = sentenceList.map((item) => ({
          id: item.sentence.tsSeq,
          text: item.sentence.text,
          isSelected: false,
          isEditing: false,
          speed: item.sentence.ttsAttributeInfo.speed,
          pitch: item.sentence.ttsAttributeInfo.stPitch,
          volume: item.sentence.ttsAttributeInfo.volume,
          voice: `Voice ${item.sentence.voiceSeq}`,
        }));
        addTextInputs(texts);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };
    fetchProjectData();
  }, [projectId, addTextInputs]);

  return (
    <div 
      className='container w-full p-4' 
      ref={containerRef}
    >
      <TTSHeader
        projectName={projectName}
        onProjectNameChange={handleProjectNameChange}
      />

      <TTSControls
        state={{ textInputs, editingId, isAllSelected }}
        toggleAllSelection={toggleAllSelection}
        deleteSelectedInputs={deleteSelectedInputs}
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
      />
    </div>
  );
};

export default TTS;
