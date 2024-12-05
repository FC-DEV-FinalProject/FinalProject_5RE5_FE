import { create } from 'zustand';

interface ConcatState {}

export const useConcatStore = create<ConcatState>((set) => ({}));
