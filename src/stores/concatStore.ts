import { IConcatdata } from '@/types/concat';
import { create } from 'zustand';

interface ConcatState {
  datas: IConcatdata[];
  setDatas: (newState: IConcatdata[]) => void;
}

export const useConcatStore = create<ConcatState>((set) => ({
  datas: [],
  setDatas: (newState) =>
    set((state) => ({
      datas: [...state.datas, ...newState],
    })),
}));
