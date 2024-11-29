export interface TextInput {
  id: number;
  text: string;
  isSelected: boolean;
  isEditing: boolean;
}

export interface TTSState {
  textInputs: TextInput[];
  isAllSelected: boolean;
  editingId: number | null;
}

export interface Language {
  languageCode: string;
  languageName: string;
}


export interface Style {
  name: string;
  mood: string;
}

export interface Voice {
  voiceSeq: string;
  name: string;
}