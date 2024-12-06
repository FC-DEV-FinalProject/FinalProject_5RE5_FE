export interface IProjectProps {
  checked: boolean;
  projectSeq: number;
  projectName: string;
  projectUpdateDate: string;
  projectDate: string;
  tts: boolean;
  vc: boolean;
  concat: boolean;
  projectActivate: 'Y' | 'N';
}
