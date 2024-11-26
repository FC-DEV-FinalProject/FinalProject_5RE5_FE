import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from 'lucide-react';
import { RoundButton } from "../common/RoundButton";

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
        <div className="flex items-center space-x-1">
          <Input
            value={projectName}
            onChange={onProjectNameChange}
            maxLength={50}
            className="w-1/2 text-4xl border-none shadow-none"
          />
          <Pencil />
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-500">{new Date().toLocaleDateString()}</span>
        <div className="flex">
          {/* <Button type="submit" className="mr-1 rounded-3xl bg-green-4">저장</Button> */}
          {/* <Button type="button" className="rounded-3xl bg-green-4">전체 다운로드</Button> */}

          <RoundButton type="submit" variant="default" size="lg" bgColor="green" rounded="2xl" className="mr-1">
            저장
          </RoundButton>
          <RoundButton type="button" variant="default" size="lg" bgColor="green" rounded="2xl">
            전체 다운로드
          </RoundButton>
        </div>
      </div>
    </div>
  );
};