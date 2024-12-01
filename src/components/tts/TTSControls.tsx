import { TTSState } from "@/types/tts";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Repeat2 } from "lucide-react";
import { CustomCheckbox } from "@/components/common/CustomCheckbox";

interface TTSControlsProps {
  state: TTSState;
  toggleAllSelection: () => void;
  deleteSelectedInputs: () => void;
  addTextInput: (hoveredId: number) => void;
  saveInput: () => void;
  cancelEdit: () => void;
}

export const TTSControls: React.FC<TTSControlsProps> = ({
  state,
  toggleAllSelection,
  deleteSelectedInputs,
}) => {
  const anySelected = state.textInputs.some(input => input.isSelected);

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <CustomCheckbox
              id="select-all"
              checked={state.isAllSelected}
              onCheckedChange={toggleAllSelection}
            />
            <label htmlFor="select-all">전체 선택</label>
          </div>
          <Button 
            onClick={deleteSelectedInputs} 
            disabled={!anySelected} 
            variant="outline" 
            className="w-24 rounded-3xl"
          >
            선택 삭제
          </Button>
        </div>
      </div>
    </>
  );
};

