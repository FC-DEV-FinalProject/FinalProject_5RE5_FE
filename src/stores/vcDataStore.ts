import { IVcDataResponse } from '@/apis/vc';
import { useState } from 'react';
import { create } from 'zustand';

interface VcData {
  vcSeq: number;
}

interface VcState extends IVcDataResponse {
  vcDataList: VcData[];
  isAllSelected: boolean;
  editingId: number | null;
}

interface VcStore extends VcState {
  addVcData: (vcData: VcData) => void;
  addSrcVoice: () => void;
}

export const vcDataStore = create<VcStore>((set) => ({
  vcDataList: [],
  isAllSelected: false,
  editingId: null,
  addVcData: (vcData) =>
    set((state: VcState) => {
      state.vcDataList.push(vcData);
      return { ...state };
    }),

  addSrcVoice: () => {},
}));
