import { TTSState } from "@/types/tts";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

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
          className="flex items-center mb-2 space-x-2"
        >
          <Checkbox
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
      ))}
    </>
  );
};
