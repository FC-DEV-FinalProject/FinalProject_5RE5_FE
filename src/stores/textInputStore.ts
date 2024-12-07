// Zustand Store 설정
import { create } from 'zustand';
import { TTSState } from '@/types/tts';

interface ExtendedTTSState extends TTSState {
  textInputs: {
    id: number;
    text: string;
    isSelected: boolean;
    isEditing: boolean;
    speed: number;
    pitch: number;
    volume: number;
    voice: string;
    voiceSeq: number;
  }[];
  originalTextInputs: ExtendedTTSState['textInputs'];
  isAllSelected: boolean;
  editingId: number | null;
}

interface TTSStore extends ExtendedTTSState {
  addTextInput: (hoveredId: number) => void;
  addTextInputs: (texts: string[]) => void;
  fetchTextInputs: (inputs: ExtendedTTSState['textInputs']) => void;
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
      voiceSeq: number;
    }>
  ) => void;
  resetInputSettings: (id: number) => void;
  getChanges: () => {
    added: ExtendedTTSState['textInputs'];
    deleted: ExtendedTTSState['textInputs'];
    updated: ExtendedTTSState['textInputs'];
  };
}

export const useTextInputs = create<TTSStore>((set, get) => ({
  textInputs: [],
  originalTextInputs: [],
  isAllSelected: false,
  editingId: null,

  addTextInput: (hoveredId) =>
    set((state) => {
      const newId =
        state.textInputs.length > 0
          ? Math.max(...state.textInputs.map((input) => input.id)) + 1
          : 1;
      const currentIndex = state.textInputs.findIndex(
        (input) => input.id === hoveredId
      );
      if (currentIndex === -1) {
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
              voiceSeq: 0,
            },
          ],
        };
      } else {
        return {
          ...state,
          textInputs: [
            ...state.textInputs.slice(0, currentIndex + 1),
            {
              id: newId,
              text: '',
              isSelected: false,
              isEditing: false,
              speed: 1,
              pitch: 0,
              volume: 0,
              voice: '',
              voiceSeq: 0,
            },
            ...state.textInputs.slice(currentIndex + 1),
          ],
        };
      }
    }),

  addTextInputs: (texts) =>
    set((state) => ({
      ...state,
      textInputs: [
        ...state.textInputs,
        ...texts.map((text, index) => ({
          id: state.textInputs.length + index + 1,
          text: text,
          isSelected: false,
          isEditing: false,
          speed: 1,
          pitch: 0,
          volume: 0,
          voice: '',
          voiceSeq: 0,
        })),
      ],
    })),

  fetchTextInputs: (inputs) =>
    set(() => ({
      textInputs: inputs.map((input) => ({
        ...input,
        isEditing: false,
      })),
      originalTextInputs: inputs,
    })),

  handleTextChange: (id, newText) =>
    set((state) => ({
      textInputs: state.textInputs.map((input) =>
        input.id === id ? { ...input, text: newText, isEditing: true } : input
      ),
      editingId: state.editingId === null ? id : state.editingId,
    })),

  toggleSelection: (id) =>
    set((state) => ({
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
      textInputs: state.textInputs.filter((input) => !input.isSelected),
      isAllSelected: false,
    })),

  saveInput: () =>
    set((state) => ({
      textInputs: state.textInputs.map((input) =>
        input.id === state.editingId ? { ...input, isEditing: false } : input
      ),
      editingId: null,
    })),

  cancelEdit: () =>
    set((state) => ({
      textInputs: state.textInputs.map((input) =>
        input.id === state.editingId ? { ...input, isEditing: false } : input
      ),
      editingId: null,
    })),

  updateInputSettings: (id, newSettings) =>
    set((state) => ({
      textInputs: state.textInputs.map((input) =>
        input.id === id ? { ...input, ...newSettings } : input
      ),
    })),

  resetInputSettings: (id) =>
    set((state) => ({
      textInputs: state.textInputs.map((input) =>
        input.id === id
          ? { ...input, speed: 1, pitch: 0, volume: 0, voice: '' }
          : input
      ),
    })),

  getChanges: () => {
    const { textInputs, originalTextInputs } = get();

    const added = textInputs.filter(
      (input) =>
        !originalTextInputs.find((original) => original.id === input.id)
    );

    const deleted = originalTextInputs.filter(
      (original) => !textInputs.find((input) => input.id === original.id)
    );

    const updated = textInputs.filter((input) =>
      originalTextInputs.some(
        (original) =>
          original.id === input.id &&
          JSON.stringify(original) !== JSON.stringify(input)
      )
    );

    return { added, deleted, updated };
  },
}));
