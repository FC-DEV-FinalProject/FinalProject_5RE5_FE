import ListView from '@/components/common/ListView';
import { Button } from '@/components/ui/button';
import { PROJECT_DATA } from '@/mock/project';
import MyProject from '@/pages/MyProject';

const Home = () => {
  return (
    <div>
      <div className='p-5 text-right'>
        <Button
          onClick={() => {
            alert('새 프로젝트 생성');
          }}
        >
          프로젝트 생성
        </Button>
      </div>
      <div>
        <h3 className='pl-5 font-bold'>Quick Starts</h3>
        <ListView option={'tile'} data={PROJECT_DATA.slice(0, 3)} />
      </div>
      <div>
        <h3 className='pl-5 font-bold'>My Project</h3>
        <MyProject option={'list'} data={PROJECT_DATA.slice(0, 5)} />
      </div>
      <div className='flex others'>
        <div className='w-[50%]'>
          <h3 className='pl-5 font-bold'>캐릭터 추천</h3>
          <div className='content-center h-40 p-5 m-5 text-center duration-100 border rounded-lg hover:cursor-pointer hover:scale-95'>
            썸네일
          </div>
        </div>
        <div className='w-[50%]'>
          <h3 className='pl-5 font-bold'>블로그</h3>
          <div className='content-center h-40 p-5 m-5 text-center duration-100 border rounded-lg hover:cursor-pointer hover:scale-95'>
            썸네일
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
