import { create } from 'zustand';

interface IProjectState {
  projectSeq: number;
  projectName: string;
  projectUpdateDate: string;
  projectDate: string;
}

const curProjectStore = create<IProjectState>((set) => ({
  projectSeq: 0,
  projectName: '',
  projectDate: '',
  projectUpdateDate: '',
}));
