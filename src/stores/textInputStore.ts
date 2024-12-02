import { create } from 'zustand';
import { TTSState } from '@/types/tts';

interface TTSStore extends TTSState {
  addTextInput: (hoveredId: number) => void;
  addTextInputs: (texts: string[]) => void;
  handleTextChange: (id: number, newText: string) => void;
  toggleSelection: (id: number) => void;
  toggleAllSelection: () => void;
  deleteSelectedInputs: () => void;
  saveInput: () => void;
  cancelEdit: () => void;
  updateInputSettings: (
    id: number,
    newSettings: Partial<{
      speed: number;
      pitch: number;
      volume: number;
      voice: string;
    }>
  ) => void;
  resetInputSettings: (id: number) => void;
}

export const useTextInputs = create<TTSStore>((set) => ({
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

  addTextInput: (hoveredId: number) =>
    set((state) => {
      const newId =
        state.textInputs.length > 0
          ? Math.max(...state.textInputs.map((input) => input.id)) + 1
          : 1;
<<<<<<< HEAD
      const currentIndex = state.textInputs.findIndex((input) => input.id === hoveredId);
      if (currentIndex === -1) {
        return {
          ...state,
          textInputs: [
            ...state.textInputs,
            { id: newId, text: '', isSelected: false, isEditing: false },
          ],
        };
      } else {
          return {
            ...state,
            textInputs: [
              ...state.textInputs.slice(0, currentIndex + 1),
              { id: newId, text: '', isSelected: false, isEditing: false },
              ...state.textInputs.slice(currentIndex + 1),
            ],
          };
      }
=======
      return {
        ...state,
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
      };
>>>>>>> 4f13907ab161b5b85f86bef8adeeb105c3c2b94f
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
          speed: 1,
          pitch: 0,
          volume: 0,
          voice: '',
        })),
      ],
    })),

  handleTextChange: (id, newText) =>
    set((state) => ({
      ...state,
      textInputs: state.textInputs.map((input) =>
        input.id === id ? { ...input, text: newText, isEditing: true } : input
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
      textInputs: state.textInputs.map((input) =>
        input.id === state.editingId ? { ...input, isEditing: false } : input
      ),
      editingId: null,
    })),

  cancelEdit: () =>
    set((state) => ({
      ...state,
      textInputs: state.textInputs.map((input) =>
        input.id === state.editingId
          ? { ...input, text: '', isEditing: false }
          : input
      ),
      editingId: null,
    })),

  // 새로운 설정값을 업데이트하는 함수
  updateInputSettings: (id, newSettings) =>
    set((state) => ({
      ...state,
      textInputs: state.textInputs.map((input) =>
        input.id === id ? { ...input, ...newSettings } : input
      ),
    })),

  // 개별 항목 설정 초기화 함수
  resetInputSettings: (id) =>
    set((state) => ({
      ...state,
      textInputs: state.textInputs.map((input) =>
        input.id === id
          ? { ...input, speed: 1, pitch: 0, volume: 0, voice: '' }
          : input
      ),
    })),
}));
