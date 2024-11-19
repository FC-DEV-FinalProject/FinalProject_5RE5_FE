import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

interface TextInput {
  id: number;
  text: string;
  isSelected: boolean;
}

const TTS = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [textInputs, setTextInputs] = useState<TextInput[]>([{ id: 0, text: '', isSelected: false }]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const addTextInput = () => {
    const newId = textInputs.length > 0 ? Math.max(...textInputs.map(input => input.id)) + 1 : 1;
    setTextInputs([...textInputs, {id: newId, text: '', isSelected: false }]);
  };

  const handleTextChange = (id: number, newText: string) => {
    setTextInputs(textInputs.map(input => input.id === id ? {...input, text: newText } : input ));
  };

  const toggleSelection = (id: number) => {
    setTextInputs(textInputs.map(input => input.id === id ? {...input, isSelected: !input.isSelected} : input ));
  };

  const toggleAllSelection = () => {
    const newIsAllSelected = !isAllSelected;
    setIsAllSelected(newIsAllSelected);
    setTextInputs(textInputs.map(input => ({ ...input, isSelected: newIsAllSelected })));
  };

  return (
    <div className="container p-4 mx-auto">
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
        <div>
          <Checkbox 
            id="select-all"
            checked={isAllSelected}
            onCheckedChange={toggleAllSelection}
          />
          <label htmlFor="select-all">전체 선택</label>
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
              placeholder="내용을 입력해주세요. (최대 00자)"
            />
          </div>
        ))}
      </div>

      <Button onClick={addTextInput}>텍스트 추가</Button>
    </div>

  );
};

export default TTS;



