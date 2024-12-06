import { create } from 'zustand';

interface ConcatCheckboxState {
  selectedItems: string[]; // 현재 선택된 체크박스 ID 목록
  selectAll: (items: string[]) => void; // 모든 항목 선택
  clearAll: () => void; // 선택 해제
  toggleItem: (id: string) => void; // 개별 항목 토글
}

export const useConcatCheckboxStore = create<ConcatCheckboxState>((set) => ({
  selectedItems: [],
  selectAll: (items) => set({ selectedItems: items }),
  clearAll: () => set({ selectedItems: [] }),
  toggleItem: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems.includes(id)
        ? state.selectedItems.filter((itemId) => itemId !== id)
        : [...state.selectedItems, id],
    })),
}));
