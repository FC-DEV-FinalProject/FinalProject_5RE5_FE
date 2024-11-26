import { TTSState } from "@/types/tts";
import { CustomCheckbox } from "@/components/common/CustomCheckbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Repeat2, Play, Download, MoveVertical } from "lucide-react";

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
            <div className="flex items-center justify-between">
              <div className="flex items-end mb-2 space-x-1">
                <Select>
                  <SelectTrigger className="w-[95px] border-none shadow-none ml-4">
                    <SelectValue placeholder="성우 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">성우 1</SelectItem>
                    <SelectItem value="option2">성우 2</SelectItem>
                    <SelectItem value="option3">성우 3</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="secondary" size="sm">효과 없음</Button>
                <Button variant="secondary" size="sm" >음량</Button>
                <Button variant="secondary" size="sm" >속도</Button>
                <Button variant="secondary" size="sm" >높이</Button>
                <Button variant="ghost" size="sm" >초기화</Button>
                <Button variant="outline" className="text-green-400 border-green-400" size="sm">
                  <Repeat2 />재생성
                </Button>
              </div>
              <div className="flex space-x-1">
                <Play size={16} fill="#333" />
                <Download size={16} />
                <MoveVertical size={16} />
              </div>
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
