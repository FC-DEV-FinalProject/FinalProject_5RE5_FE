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
  selectedCount: number;
  totalCount: number;
}

export const TTSControls: React.FC<TTSControlsProps> = ({
  state,
  toggleAllSelection,
  deleteSelectedInputs,
  selectedCount,
  totalCount,
}) => {
  const anySelected = selectedCount > 0;

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
            <label htmlFor="select-all">
              {anySelected ? `${selectedCount}/${totalCount} 선택` : '전체 선택'}
            </label>
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

