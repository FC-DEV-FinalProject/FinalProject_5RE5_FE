// TTS 컴포넌트
import { ttsCall } from '@/apis/ttsCall';
import { ttsSave } from '@/apis/ttsSave';
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
    fetchTextInputs,
    handleTextChange,
    toggleSelection,
    toggleAllSelection,
    deleteSelectedInputs,
    saveInput,
    cancelEdit,
    isAllSelected,
    editingId,
    resetInputSettings,
    getChanges,
  } = useTextInputs();

  useOutsideClick(containerRef, () => {
    if (textInputs.some((input) => input.isEditing)) {
      cancelEdit();
    }
  });

  useEffect(() => {
    const fetchTTSData = async () => {
      if (!projectId) return;
      try {
        const ttsData = await ttsCall(projectId);
        console.log(ttsData.response.sentenceList);

        if (ttsData?.response?.sentenceList) {
          const transformedInputs = ttsData.response.sentenceList.map(
            (item: any) => ({
              id: item.sentence.tsSeq,
              text:
                typeof item.sentence.text === 'string'
                  ? item.sentence.text
                  : JSON.stringify(item.sentence.text),
              isSelected: false,
              isEditing: false,
              speed: item.sentence.ttsAttributeInfo.speed || 1,
              pitch: item.sentence.ttsAttributeInfo.stPitch || 0,
              volume: item.sentence.ttsAttributeInfo.volume || 0,
              voice: `Voice ${item.sentence.voiceSeq}` || '',
              voiceSeq: item.sentence.voiceSeq || 0,
            })
          );

          fetchTextInputs(transformedInputs);
        }
      } catch (error) {
        console.error('Failed to fetch TTS data:', error);
      }
    };

    fetchTTSData();
  }, [projectId, fetchTextInputs]);

  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const handleSave = async () => {
    const { added, deleted, updated } = getChanges();

    try {
      if (added.length > 0) {
        await ttsSave(projectId || '', 'CREATE', added);
      }

      if (deleted.length > 0) {
        await ttsSave(projectId || '', 'DELETE', deleted);
      }

      if (updated.length > 0) {
        await ttsSave(projectId || '', 'UPDATE', updated);
      }

      console.log('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const selectedCount = textInputs.filter((input) => input.isSelected).length;

  return (
    <div className='container w-full p-4 ' ref={containerRef}>
      <TTSHeader
        projectName={projectName}
        onProjectNameChange={handleProjectNameChange}
        ttsSave={handleSave}
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
