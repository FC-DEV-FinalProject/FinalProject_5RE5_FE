import DividingLine from '@/components/common/DividingLine';
import ListView from '@/components/common/ListView';
import { PROJECT_DATA } from '@/mocks/projectData';
import MyProject from '@/pages/MyProject';

export type ProjectType = 'TTS' | 'VC' | 'Concat';
export const PROJECT_TYPE: Record<string, ProjectType> = {
  TTS: 'TTS',
  VC: 'VC',
  CONCAT: 'Concat',
};
const CONST = {
  PROEJECT: {
    TITLE: '새 프로젝트 생성',
    DESC: '프로젝트 생성에 대한 설명 ~~~',
    CREATE: '프로젝트 생성',
    RECENT: '최근 프로젝트',
  },
  TTS: {
    TITLE: 'TTS',
    DESC: '텍스트를 음성파일로 생성할 수 있어요',
    TYPE: PROJECT_TYPE.TTS,
  },
  BUTTON: {
    CREATE: '프로젝트 생성',
  },
};

const Home = () => {
  return (
    <div>
      <header className='flex items-center justify-between px-5 py-2'>
        <div className='text-left'>
          <span>Home</span>
        </div>
      </header>
      <DividingLine />
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
          <MyProject option={'list'} />
        </div>
      </div>
    </div>
  );
};

export default Home;
