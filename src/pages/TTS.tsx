import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    // setEditingId(newId);
  };

  const handleTextChange = (id: number, newText: string) => {
    setTextInputs(textInputs.map(input => input.id === id ? {...input, text: newText } : input ));
    // setEditingId(id);
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

  // const saveInput = (id: number) => {
  //   setTextInputs(textInputs.map(input => input.id === id ? { ...input, isEditing: false } : input));
  // };
  const saveInput = () => {
    setEditingId(null);
  };

  // const cancelEdit = (id: number) => {
  //   setTextInputs(textInputs.map(input => 
  //     input.id === id ? { ...input, text: '', isEditing: false } : input
  //   ));
  //   if (inputRefs.current[id]) {
  //     inputRefs.current[id]?.blur();
  //   }
  // };
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
          <Button onClick={saveInput}>저장</Button>
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



