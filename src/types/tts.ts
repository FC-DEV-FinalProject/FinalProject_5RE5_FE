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