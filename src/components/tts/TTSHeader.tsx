import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TTSHeaderProps {
  projectName: string;
  onProjectNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TTSHeader: React.FC<TTSHeaderProps> = ({
  projectName,
  onProjectNameChange
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <Input
        value={projectName}
        onChange={onProjectNameChange}
        maxLength={50}
        className="w-1/2 text-2xl font-bold"
      />
      <div className="flex items-center space-x-4">
        <span className="text-gray-500">{new Date().toLocaleDateString()}</span>
        <div className="flex">
          <Button type="submit" className="mr-1">저장하기</Button>
          <Button type="button">다운로드</Button>
        </div>
      </div>
    </div>
  );
};