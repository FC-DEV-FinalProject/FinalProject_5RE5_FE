import { create } from 'zustand';
import { TTSState } from '@/types/tts'; // TTSState 인터페이스 가져오기

interface TTSStore extends TTSState {
  addTextInput: () => void;
  addTextInputs: (texts: string[]) => void;
  handleTextChange: (id: number, newText: string) => void;
  toggleSelection: (id: number) => void;
  toggleAllSelection: () => void;
  deleteSelectedInputs: () => void;
  saveInput: () => void;
  cancelEdit: () => void;
}

export const useTextInputs = create<TTSStore>((set) => ({
  textInputs: [
    { id: 0, text: '', isSelected: false, isEditing: false }, // 초기값 설정
  ],
  isAllSelected: false, // 초기값 설정
  editingId: null, // 초기값 설정
  addTextInput: () =>
    set((state) => {
      const newId =
        state.textInputs.length > 0
          ? Math.max(...state.textInputs.map((input) => input.id)) + 1
          : 1;
      return {
        ...state,
        textInputs: [
          ...state.textInputs,
          { id: newId, text: '', isSelected: false, isEditing: false },
        ],
      };
    }),
  addTextInputs: (texts) =>
    set((state) => ({
      ...state,
      textInputs: [
        ...state.textInputs,
        ...texts.map((text, index) => ({
          id: state.textInputs.length + index + 1,
          text: text.trim(),
          isSelected: false,
          isEditing: false,
        })),
      ],
    })),
  handleTextChange: (id, newText) =>
    set((state) => ({
      ...state,
      textInputs: state.textInputs.map((input) =>
        input.id === id ? { ...input, text: newText } : input
      ),
      editingId: state.editingId === null ? id : state.editingId,
    })),
  toggleSelection: (id) =>
    set((state) => ({
      ...state,
      textInputs: state.textInputs.map((input) =>
        input.id === id ? { ...input, isSelected: !input.isSelected } : input
      ),
    })),
  toggleAllSelection: () =>
    set((state) => {
      const newIsAllSelected = !state.isAllSelected;
      return {
        ...state,
        isAllSelected: newIsAllSelected,
        textInputs: state.textInputs.map((input) => ({
          ...input,
          isSelected: newIsAllSelected,
        })),
      };
    }),
  deleteSelectedInputs: () =>
    set((state) => ({
      ...state,
      textInputs: state.textInputs.filter((input) => !input.isSelected),
      isAllSelected: false,
    })),
  saveInput: () =>
    set((state) => ({
      ...state,
      editingId: null,
    })),
  cancelEdit: () =>
    set((state) => ({
      ...state,
      textInputs: state.textInputs.map((input) =>
        input.id === state.editingId ? { ...input, text: '' } : input
      ),
      editingId: null,
    })),
}));
