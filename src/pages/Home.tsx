import ListView from '@/components/common/ListView';
import Tile from '@/components/common/Tile';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PROJECT_DATA } from '@/mock/project';
import MyProject from '@/pages/MyProject';
import { BookAIcon, CombineIcon, MicIcon } from 'lucide-react';

type ProjectType = 'TTS' | 'VC' | 'Concat';

const Home = () => {
  const handleClick = {
    createNewProject: (type: ProjectType) => {
      alert(`${type} 프로젝트 생성`);
    },
  };

  return (
    <div>
      <header className='flex items-center justify-between p-2 pl-5 pr-5 border-b-[1px] border-b-gray-300'>
        <div className='text-left'>
          <span>Home</span>
        </div>
        <div className='text-right'>
          <Dialog>
            <DialogTrigger asChild>
              <Button>프로젝트 생성</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-fit'>
              <DialogHeader>
                <DialogTitle>새 프로젝트 생성</DialogTitle>
                <DialogDescription>
                  프로젝트 생성에 대한 설명 ~~~
                </DialogDescription>
              </DialogHeader>
              <div className='flex gap-3'>
                <Tile
                  title='TTS'
                  desc='텍스트를 음성파일로 생성할 수 있어요'
                  icon={BookAIcon}
                  onClick={() => {
                    handleClick.createNewProject('TTS');
                  }}
                />
                <Tile
                  title='VC'
                  desc='내 보이스를 연예인 보이스로 바꿀 수 있어요'
                  icon={MicIcon}
                  onClick={() => {
                    handleClick.createNewProject('VC');
                  }}
                />
                <Tile
                  title='Concat'
                  desc='다양한 보이스 파일을 하나로 합칠 수 있어요'
                  icon={CombineIcon}
                  onClick={() => {
                    handleClick.createNewProject('Concat');
                  }}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div id='recentDiv' className='m-5'>
        <header className='flex items-center justify-between py-2'>
          <div className='font-bold text-left'>
            <span>최근 프로젝트</span>
          </div>
        </header>
        <div>
          <ListView option={'tile'} data={PROJECT_DATA.slice(0, 3)} />
        </div>
      </div>
      <div id='recentDiv' className='m-5'>
        <header className='flex items-center justify-between py-2'>
          <div className='font-bold text-left'>
            <span>내 프로젝트</span>
          </div>
        </header>
        <div>
          <MyProject option={'list'} data={PROJECT_DATA} />
        </div>
      </div>
    </div>
  );
};

export default Home;
