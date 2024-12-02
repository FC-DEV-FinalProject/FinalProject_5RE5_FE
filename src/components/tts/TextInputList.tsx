import { useState } from "react";
import { CustomCheckbox } from '@/components/common/CustomCheckbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Repeat2, Play, Download, MoveVertical } from 'lucide-react';
import { TextInput } from '@/types/tts';

interface TextInputListProps {
  textInputs: TextInput[];
  toggleSelection: (id: number) => void;
  handleTextChange: (id: number, newText: string) => void;
  cancelEdit: () => void;
  addTextInput: (hoveredId: number) => void;
  saveInput: () => void;
  isAllSelected: boolean;
  editingId: number | null;
}

export const TextInputList: React.FC<TextInputListProps> = ({
  textInputs,
  toggleSelection,
  handleTextChange,
  cancelEdit,
  addTextInput,
  saveInput,
}) => {
  const [inputHoverStates, setInputHoverStates] = useState<Record<number, boolean>>({});
  const [inputEditingStates, setInputEditingStates] = useState<Record<number, boolean>>({});

  const handleInputHover = (id: number, isHovered: boolean) => {
    setInputHoverStates(prevState => ({ ...prevState, [id]: isHovered }));
  };
  
  const handleInputFocus = (id: number, isFocused: boolean) => {
    setInputEditingStates(prevState => ({ ...prevState, [id]: isFocused }));
  };
  return (
    <>
      {textInputs.map((input) => (
        <div key={input.id} className='mb-4'>
          <div className='mb-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-end mb-2 space-x-1'>
                <Button variant='secondary' size='sm'>
                  {input.voice ? input.voice : '성우'}
                </Button>
                <Button variant='secondary' size='sm'>
                  효과 없음
                </Button>
                <Button key={`${input.id}-pitch`} variant='secondary' size='sm'>
                  음높이: {input.pitch ?? 0}
                </Button>
                <Button
                  key={`${input.id}-volume`}
                  variant='secondary'
                  size='sm'
                >
                  음량: {input.volume ?? 0}
                </Button>
                <Button key={`${input.id}-speed`} variant='secondary' size='sm'>
                  속도: {input.speed ?? 1}
                </Button>
                <Button variant='ghost' size='sm'>
                  초기화
                </Button>
                <Button
                  variant='outline'
                  className='text-green-400 border-green-400'
                  size='sm'
                >
                  <Repeat2 />
                  재생성
                </Button>
              </div>
              <div className='flex space-x-1'>
                <Play size={16} fill='#333' />
                <Download size={16} />
              </div>
            </div>
            <div className="relative flex items-center mb-2 space-x-2">
              <CustomCheckbox
                id={`input-${input.id}`}
                checked={input.isSelected}
                onCheckedChange={() => toggleSelection(input.id)}
              />
              <Input
                value={input.text}
                onChange={(e) => handleTextChange(input.id, e.target.value)}
                placeholder='내용을 입력해주세요.(최대 2,000자)'
                onFocus={() => {
                  handleInputFocus(input.id, true);
                  if (input.text === '') {
                    cancelEdit();
                  }
                }}
                onBlur={() => handleInputFocus(input.id, false)}
              />
              {input.isEditing && (
                <div className="absolute flex space-x-1 transform -translate-y-1/2 top-1/2 right-2">
                  <Button onClick={saveInput} size="xs" variant="secondary" className="rounded-3xl">
                    저장
                  </Button>
                  <Button onClick={cancelEdit} size="xs" variant="secondary" className="rounded-3xl">
                    취소
                  </Button>
                </div>
              )}
            </div>
            {inputHoverStates[input.id] && !inputEditingStates[input.id] &&(
              <div className="flex items-center justify-center mt-2">
                <>
                  <div className="w-6/12 h-[1px] bg-slate-200"></div>
                  <Button onClick={() => addTextInput(input.id)} variant="outline" className="rounded-3xl w-52">
                    + 텍스트 추가
                  </Button>
                  <div className="w-6/12 h-[1px] bg-slate-200"></div>
                </>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
