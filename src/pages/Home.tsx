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

const Home = () => {
  return (
    <>
      <div id='recentDiv'>
        <div className='flex items-center justify-between'>
          <div className='mb-2 font-bold text-left'>
            <span>최근 프로젝트</span>
          </div>
        </div>
        <div>
          <ListView option={'tile'} data={PROJECT_DATA.slice(0, 3)} />
        </div>
      </div>
      <div id='myProjectDiv'>
        <div className='flex items-center justify-between'>
          <div className='mb-2 font-bold text-left'>
            <span>내 프로젝트</span>
          </div>
        </div>
        <div>
          <ListView option={'list'} data={PROJECT_DATA} />
        </div>
      </div>
    </>
  );
};

export default Home;
