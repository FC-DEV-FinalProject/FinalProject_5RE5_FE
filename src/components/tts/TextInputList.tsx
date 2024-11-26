import { TTSState } from "@/types/tts";
import { CustomCheckbox } from "@/components/common/CustomCheckbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Repeat2 } from "lucide-react";

interface TextInputListProps {
  state: TTSState;
  toggleSelection: (id: number) => void;
  handleTextChange: (id: number, text: string) => void;
  cancelEdit: () => void;
}

export const TextInputList: React.FC<TextInputListProps> = ({
  state,
  toggleSelection,
  handleTextChange,
  cancelEdit
}) => {
  return (
    <>
      {state.textInputs.map((input) => (
        <div 
          key={input.id} 
          className="mb-2"
        >
          <div className="mb-4">
            <div className="flex mb-2 space-x-1">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="성우 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">성우 1</SelectItem>
                  <SelectItem value="option2">성우 2</SelectItem>
                  <SelectItem value="option3">성우 3</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="secondary" className="ml-2">효과 없음</Button>
              <Button variant="secondary" className="mr-1">음량</Button>
              <Button variant="secondary" className="mr-1">속도</Button>
              <Button variant="secondary" className="mr-1">높이</Button>
              <Button variant="ghost" className="mr-1">초기화</Button>
              <Button>
                <Repeat2 />재생성
              </Button>
            </div>
            <div className="flex items-center mb-2 space-x-2">
            <CustomCheckbox
              id={`input-${input.id}`}
              checked={input.isSelected}
              onCheckedChange={() => toggleSelection(input.id)}
            />
            <Input 
              value={input.text}
              onChange={(e) => handleTextChange(input.id, e.target.value)}
              placeholder="내용을 입력해주세요.(최대 2,000자)"
              onFocus={() => {
                if (input.text === '') {
                  cancelEdit();
                }
              }}
            />
          </div>
        </div>
        </div>
      ))}
    </>
  );
};
