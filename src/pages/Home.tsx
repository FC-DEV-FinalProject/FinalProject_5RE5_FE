import { getProjectList } from '@/apis/project';
import DivideLine from '@/components/common/DivideLine';
import ListView from '@/components/common/ListView';
import { PROJECT_DATA } from '@/mocks/projectData';
import MyProject from '@/pages/MyProject';
import { useEffect } from 'react';

export type ProjectType = 'TTS' | 'VC' | 'CONCAT';
export const PROJECT_TYPE: Record<string, ProjectType> = {
  TTS: 'TTS',
  VC: 'VC',
  CONCAT: 'CONCAT',
};

const Home = () => {
  // useEffect(() => {
  //   (async () => {
  //     const projectList = await getProjectList();
  //   })();
  // }, []);

  return (
    <div>
      <header className='flex items-center justify-between px-5 py-2'>
        <div className='text-left'>
          <span>홈</span>
        </div>
      </header>
      <DivideLine />
      <div id='recentDiv' className='m-5'>
        <header className='flex items-center justify-between py-2'>
          <div className='font-bold text-left'>
            <span>최근 프로젝트</span>
          </div>
        </header>
        <div>
          <ListView
            option={'tile'}
            data={PROJECT_DATA.filter(
              (data) => data.projectActivate === 'Y'
            ).slice(0, 3)}
          />
        </div>
      </div>
      <div id='myProjectDiv' className='m-5'>
        <header className='flex items-center justify-between py-2'>
          <div className='font-bold text-left'>
            <span>내 프로젝트</span>
          </div>
        </header>
        <div>
          <ListView
            option={'list'}
            data={PROJECT_DATA.filter((data) => data.projectActivate === 'Y')}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
