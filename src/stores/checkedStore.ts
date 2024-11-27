import { create } from 'zustand';

interface checkedState {
  checkedList: number[];
  addChecked: (projectSeq: number) => void;
  removeChecked: (index: number) => void;
  updateChecked: (index: number, newProjectSeq: number) => void;
  removeAll: () => void;
}

export const useCheckedStore = create<checkedState>((set) => ({
  checkedList: [],
  addChecked: (projectSeq) =>
    set((state) => ({ checkedList: [...state.checkedList, projectSeq] })),
  removeChecked: (index) =>
    set((state) => ({
      checkedList: state.checkedList.filter((_, i) => i !== index),
    })),
  updateChecked: (index, newProjectSeq) =>
    set((state) => ({
      checkedList: state.checkedList.map((projectSeq, i) =>
        i === index ? newProjectSeq : projectSeq
      ),
    })),
  removeAll: () => set(() => ({ checkedList: [] })),
}));
