import { TTSState } from "@/types/tts";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Repeat2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface TTSControlsProps {
  state: TTSState;
  toggleAllSelection: () => void;
  deleteSelectedInputs: () => void;
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
            <Checkbox
              id="select-all"
              checked={state.isAllSelected}
              onCheckedChange={toggleAllSelection}
            />
            <label htmlFor="select-all">전체 선택</label>
          </div>
          <Button
            onClick={deleteSelectedInputs}
            disabled={!anySelected}
            variant="destructive"
          >
            선택 삭제
          </Button>
        </div>

        {/* Voice and Audio Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="성우이름" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">성우 1</SelectItem>
                <SelectItem value="option2">성우 2</SelectItem>
                <SelectItem value="option3">성우 3</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="secondary" className="ml-2">효과 라디오</Button>
          </div>
          <div className="flex justify-between">
            <Button variant="secondary" className="mr-1">음량</Button>
            <Button variant="secondary" className="mr-1">속도</Button>
            <Button variant="secondary" className="mr-1">높이</Button>
            <Button variant="secondary" className="mr-1">초기화</Button>
            <Button>
              <Repeat2 />재생성
            </Button>
          </div>
        </div>
      </div>

      {/* <div className="text-center">
        {state.editingId !== null ? (
          <>
            <Button onClick={saveInput} className="mr-1">저장</Button>
            <Button onClick={cancelEdit}>취소</Button>
          </>
        ) : (
          <Button onClick={addTextInput}>+ 텍스트 추가</Button>
        )}
      </div> */}
    </>
  );
};

