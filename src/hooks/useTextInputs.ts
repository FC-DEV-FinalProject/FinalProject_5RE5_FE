import { useState } from 'react';
import { TextInput, TTSState } from '@/types/tts';

export const useTextInputs = () => {
  const [state, setState] = useState<TTSState>({
    textInputs: [
      {
        id: 1,
        text: '',
        isSelected: false,
        isEditing: false,
        speed: 1,
        pitch: 0,
        volume: 0,
        voice: '',
      },
    ],
    isAllSelected: false,
    editingId: null,
  });

  const addTextInput = () => {
    const newId =
      state.textInputs.length > 0
        ? Math.max(...state.textInputs.map((input) => input.id)) + 1
        : 1;

    setState((prev) => ({
      ...prev,
      textInputs: [
        ...state.textInputs,
        {
          id: newId,
          text: '',
          isSelected: false,
          isEditing: false,
          speed: 1,
          pitch: 0,
          volume: 0,
          voice: '',
        },
      ],
    }));
  };

  const addTextInputs = (texts: string[]) => {
    setState((prev) => {
      const updatedState = {
        ...prev,
        textInputs: [
          ...state.textInputs,
          ...texts.map((text, index) => ({
            id: state.textInputs.length + index + 1,
            text: text.trim(),
            isSelected: false,
            isEditing: false,
            speed: 1,
            pitch: 0,
            volume: 0,
            voice: '',
          })),
        ],
      };
      return updatedState;
    });
  };
  const handleTextChange = (id: number, newText: string) => {
    if (newText.length > 1000) return;
    if (!/^[가-힣a-zA-Z0-9\s.,!?]*$/.test(newText)) return;

    setState((prev) => ({
      ...prev,
      textInputs: prev.textInputs.map((input) =>
        input.id === id ? { ...input, text: newText } : input
      ),
      editingId: prev.editingId === null ? id : prev.editingId,
    }));
  };

  const toggleSelection = (id: number) => {
    setState((prev) => ({
      ...prev,
      textInputs: prev.textInputs.map((input) =>
        input.id === id ? { ...input, isSelected: !input.isSelected } : input
      ),
    }));
  };

  const toggleAllSelection = () => {
    setState((prev) => {
      const newIsAllSelected = !prev.isAllSelected;
      return {
        ...prev,
        isAllSelected: newIsAllSelected,
        textInputs: prev.textInputs.map((input) => ({
          ...input,
          isSelected: newIsAllSelected,
        })),
      };
    });
  };

  const deleteSelectedInputs = () => {
    setState((prev) => ({
      ...prev,
      textInputs: prev.textInputs.filter((input) => !input.isSelected),
      isAllSelected: false,
    }));
  };

  const saveInput = () => {
    setState((prev) => ({
      ...prev,
      editingId: null,
    }));
  };

  const cancelEdit = () => {
    setState((prev) => ({
      ...prev,
      textInputs: prev.textInputs.map((input) =>
        input.id === prev.editingId ? { ...input, text: '' } : input
      ),
      editingId: null,
    }));
  };

  return {
    state,
    addTextInput,
    handleTextChange,
    toggleSelection,
    toggleAllSelection,
    deleteSelectedInputs,
    saveInput,
    cancelEdit,
    addTextInputs,
  };
};
