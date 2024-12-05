import { createProject } from '@/apis/project';
import Tile from '@/components/common/Tile';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PROJECT_TYPE, ProjectType } from '@/pages/Home';
import { BookAIcon, CombineIcon, FilePlusIcon, MicIcon } from 'lucide-react';

const NewProjectButton = () => {
  const handleClick = {
    createNewProject: async (type: ProjectType) => {
      alert(`${type} 프로젝트 생성`);
      const response = await createProject();
    },
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'green'}>
            <FilePlusIcon />새 프로젝트 생성
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-fit w-[450px]'>
          <DialogHeader>
            <DialogTitle>새 프로젝트 생성</DialogTitle>
          </DialogHeader>
          <div className='flex flex-col gap-3'>
            <div>
              <Tile
                title={PROJECT_TYPE.TTS}
                desc='텍스트를 음성파일로 생성할 수 있어요'
                icon={BookAIcon}
                onClick={() => {
                  handleClick.createNewProject(PROJECT_TYPE.TTS);
                }}
                className='w-[100%]'
              />
            </div>
            <div className='flex gap-3'>
              <Tile
                title={PROJECT_TYPE.VC}
                desc='내 보이스를 연예인 보이스로 바꿀 수 있어요'
                icon={MicIcon}
                onClick={() => {
                  handleClick.createNewProject(PROJECT_TYPE.VC);
                }}
              />
              <Tile
                title={PROJECT_TYPE.CONCAT}
                desc='다양한 보이스 파일을 하나로 합칠 수 있어요'
                icon={CombineIcon}
                onClick={() => {
                  handleClick.createNewProject(PROJECT_TYPE.CONCAT);
                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewProjectButton;
