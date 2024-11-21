import { useState } from 'react';
import { TextInput, TTSState } from '@/types/tts';

export const useTextInputs = () => {
  const [state, setState] = useState<TTSState>({
    textInputs: [{ id: 0, text: '', isSelected: false, isEditing: false }],
    isAllSelected: false,
    editingId: null
  });

  const addTextInput = () => {
    const newId = state.textInputs.length > 0 
      ? Math.max(...state.textInputs.map(input => input.id)) + 1 
      : 1;
    
    setState(prev => ({
      ...prev,
      textInputs: [
        ...prev.textInputs, 
        { id: newId, text: '', isSelected: false, isEditing: false }
      ]
    }));
  };

  const handleTextChange = (id: number, newText: string) => {
    setState(prev => ({
      ...prev,
      textInputs: prev.textInputs.map(input => 
        input.id === id ? {...input, text: newText} : input
      ),
      editingId: prev.editingId === null ? id : prev.editingId
    }));
  };

  const toggleSelection = (id: number) => {
    setState(prev => ({
      ...prev,
      textInputs: prev.textInputs.map(input => 
        input.id === id 
          ? {...input, isSelected: !input.isSelected} 
          : input
      )
    }));
  };

  const toggleAllSelection = () => {
    setState(prev => {
      const newIsAllSelected = !prev.isAllSelected;
      return {
        ...prev,
        isAllSelected: newIsAllSelected,
        textInputs: prev.textInputs.map(input => ({ 
          ...input, 
          isSelected: newIsAllSelected 
        }))
      };
    });
  };

  const deleteSelectedInputs = () => {
    setState(prev => ({
      ...prev,
      textInputs: prev.textInputs.filter(input => !input.isSelected),
      isAllSelected: false
    }));
  };

  const saveInput = () => {
    setState(prev => ({
      ...prev,
      editingId: null
    }));
  };

  const cancelEdit = () => {
    setState(prev => ({
      ...prev,
      textInputs: prev.textInputs.map(input => 
        input.id === prev.editingId ? { ...input, text: '' } : input
      ),
      editingId: null
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
    cancelEdit
  };
};