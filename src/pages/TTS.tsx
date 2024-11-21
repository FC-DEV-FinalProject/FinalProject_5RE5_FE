import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,  } from '@/components/ui/select';
import { Repeat2 } from 'lucide-react';

interface TextInput {
  id: number;
  text: string;
  isSelected: boolean;
  isEditing: boolean;
}

const TTS = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [textInputs, setTextInputs] = useState<TextInput[]>([{ id: 0, text: '', isSelected: false, isEditing: false }]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setEditingId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const addTextInput = () => {
    const newId = textInputs.length > 0 ? Math.max(...textInputs.map(input => input.id)) + 1 : 1;
    setTextInputs([...textInputs, {id: newId, text: '', isSelected: false, isEditing: false }]);
  };

  const handleTextChange = (id: number, newText: string) => {
    setTextInputs(textInputs.map(input => input.id === id ? {...input, text: newText } : input ));
    if (editingId === null) {
      setEditingId(id);
    }
  };

  const toggleSelection = (id: number) => {
    setTextInputs(textInputs.map(input => input.id === id ? {...input, isSelected: !input.isSelected} : input ));
  };

  const toggleAllSelection = () => {
    const newIsAllSelected = !isAllSelected;
    setIsAllSelected(newIsAllSelected);
    setTextInputs(textInputs.map(input => ({ ...input, isSelected: newIsAllSelected })));
  };

  const deleteSelectedInputs = () => {
    setTextInputs(textInputs.filter(input => !input.isSelected));
    setIsAllSelected(false);
  };

  const saveInput = () => {
    setEditingId(null);
  };

  const cancelEdit = () => {
    setTextInputs(textInputs.map(input => 
      input.id === editingId ? { ...input, text: '' } : input
    ));
    setEditingId(null);
  };

  const anySelected = textInputs.some(input => input.isSelected);

  return (
    <div className="container p-4 mx-auto" ref={containerRef}>
      <div className="flex items-center justify-between mb-4">
        <h1>{projectId}</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-500">{new Date().toLocaleDateString()}</span>
          <div className="flex">
            <Button type="submit" className="mr-1">저장하기</Button>
            <Button type="button">다운로드</Button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="select-all"
              checked={isAllSelected}
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
        <div className="flex items-center justify-between mb-4">
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
          <Button variant="secondary">효과 라디오</Button>
          <div className="flex justify-between">
            <Button variant="secondary" className="mr-1">음량</Button>
            <Button variant="secondary" className="mr-1">속도</Button>
            <Button variant="secondary" className="mr-1">높이</Button>
            <Button variant="secondary">초기화</Button>
            <Button>
              <Repeat2 />재생성
            </Button>
          </div>
        </div>
        {textInputs.map((input) => (
          <div key={input.id} className="flex items-center mb-2 space-x-2">
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
                  setEditingId(input.id);
                }
              }}
            />
          </div>
        ))}
      </div>

      <div className="text-center">
        {editingId !== null ? (
          <>
          <Button onClick={saveInput} className="mr-1">저장</Button>
          <Button onClick={cancelEdit}>취소</Button>
          </>
        ) : (
        <Button onClick={addTextInput}>+ 텍스트 추가</Button>
        )}
      </div>
    </div>

  );
};

export default TTS;



