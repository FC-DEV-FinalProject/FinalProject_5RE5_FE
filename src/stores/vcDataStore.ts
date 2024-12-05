import OneVc from '@/components/common/OneVc';
import { MOCK_VC_DATA } from '@/mocks/vcData';
import { create } from 'zustand';

export interface ProjectState {
  projectSeq: number;
  projectName: string;
  projectContent: string;
  projectDate: string;
  projectUpdateDate: string;
  tts: boolean;
  vc: boolean;
  concat: boolean;
  projectActivate: 'Y' | 'N';
}

export interface VcSrcFileProps {
  seq: number;
  rowOrder: number;
  name: string;
  fileUrl: string;
}
export interface OneVcState {
  activate: 'Y' | 'N';
  vcSrcFile: VcSrcFileProps;
  vcResultFile: string | null;
  vcText: string | null;
  isSelected: boolean;
  isEditing: boolean;
}

// extended tts state랑 같은것
export interface VcState {
  vcList: OneVcState[];
  isAllSelected: boolean;
  editingId: number | null;
  removeList: number[];
  uploadFiles: File[];
}

export interface VcStore extends VcState {
  handleTextChange: (seq: number, newText: string) => void;
  toggleSelection: (seq: number) => void;
  toggleAllSelection: () => void;
  addRemoveList: (seqList: number[]) => void;
  saveInput: () => void;
  cancelEdit: () => void;
  addVcList: (uploadSrcFile: OneVcState) => void;
  addSrcFiles: (files: File[]) => void;
  initSrcFiles: () => void;
  setTxtFiles: (textList: string[]) => void;
  setActivate: (seq: number) => void;
}

export const useVcStore = create<VcStore>((set) => ({
  // console.log(목데이터 분리해야함)
  vcList: [...MOCK_VC_DATA],
  // vcList: [],
  isAllSelected: false,
  editingId: null,
  removeList: [],
  uploadFiles: [],

  handleTextChange: (seq, newText) =>
    set((state: VcState) => ({
      ...state,
      vcList: state.vcList.map((oneVc) =>
        oneVc.vcSrcFile.seq === seq
          ? { ...oneVc, vcText: newText, isEditing: true }
          : oneVc
      ),
      editingId: state.editingId === null ? seq : state.editingId,
    })),
  toggleSelection: (seq) =>
    set((state: VcState) => ({
      ...state,
      vcList: state.vcList.map((oneVc) =>
        oneVc.vcSrcFile.seq === seq
          ? { ...oneVc, isSelected: !oneVc.isSelected }
          : oneVc
      ),
    })),

  toggleAllSelection: () =>
    set((state: VcState) => {
      const newIsAllSelected = !state.isAllSelected;
      return {
        ...state,
        isAllSelected: newIsAllSelected,
        vcList: state.vcList.map((oneVc) => ({
          ...oneVc,
          isSelected: newIsAllSelected,
        })),
      };
    }),
  addRemoveList: (seqList) =>
    set((state: VcState) => ({
      ...state,
      removeList: [...state.removeList, ...seqList],
    })),

  saveInput: () =>
    set((state: VcState) => ({
      ...state,
      vcList: state.vcList.map((oneVc) =>
        oneVc.vcSrcFile.seq === state.editingId
          ? { ...oneVc, isEditing: false }
          : oneVc
      ),
      editingId: null,
    })),

  cancelEdit: () =>
    set((state: VcState) => ({
      ...state,
      vcList: state.vcList.map((oneVc) =>
        oneVc.vcSrcFile.seq === state.editingId
          ? { ...oneVc, vcText: '', isEditing: false }
          : oneVc
      ),
      editingId: null,
    })),

  addVcList: (uploadSrcFile: OneVcState) => {
    return set((state: VcState) => ({
      ...state,
      vcList: [...state.vcList, uploadSrcFile],
    }));
  },
  addSrcFiles: (uploadSrcFiles: File[]) =>
    set((state: VcState) => ({
      ...state,
      uploadFiles: [...state.uploadFiles, ...uploadSrcFiles],
    })),

  initSrcFiles: () =>
    set((state: VcState) => ({
      ...state,
      uploadFiles: [],
    })),

  setTxtFiles: (textList: string[]) =>
    set((state: VcState) => ({
      ...state,
      vcList: state.vcList.map((oneVc, index) => ({
        ...oneVc,
        vcText: textList[index],
      })),
    })),

  setActivate: (seq) =>
    set((state: VcState) => ({
      ...state,
      vcList: state.vcList.map((oneVc) =>
        oneVc.vcSrcFile.seq === seq ? { ...oneVc, activate: 'N' } : oneVc
      ),
    })),
}));
