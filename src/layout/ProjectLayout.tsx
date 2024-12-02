import ConcatSidebar from '@/components/sidebar/ConcatSidebar';
import TTSSidebar from '@/components/sidebar/TTSSidebar';
import VCSidebar from '@/components/sidebar/VCSidebar';
import {
  BookAIcon,
  ChevronDown,
  ChevronUp,
  CombineIcon,
  MicIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Link, useParams } from 'react-router-dom';
import TTS from '@/pages/TTS';
import VC from '@/pages/VC';
import Concat from '@/pages/Concat';
import Logo from '@/assets/logo.png';
import { ROUTES } from '@/constants/route';
import { Button } from '@/components/ui/button';

const ProjectLayout = () => {
  // Footer 상태 관리 (열림/닫힘 여부)
  const [isFooterExpanded, setIsFooterExpanded] = useState(false);
  const { selectedMenu, projectId } = useParams();

  // Footer 토글 함수
  const toggleFooter = () => {
    setIsFooterExpanded((prev) => !prev);
  };

  // 단축키 기능 프로젝트 레이아웃에서만 가능하도록
  useHotkeys('ctrl+s', (event) => {
    event.preventDefault();
    alert('저장?');
  });

  // 컴포넌트를 조건부로 렌더링
  let ContentComponent;
  let SidebarComponent;

  switch (selectedMenu) {
    case 'tts':
      ContentComponent = <TTS />;
      SidebarComponent = <TTSSidebar />;
      break;
    case 'vc':
      ContentComponent = <VC />;
      SidebarComponent = <VCSidebar />;
      break;
    case 'concat':
      ContentComponent = <Concat />;
      SidebarComponent = <ConcatSidebar />;
      break;
    default:
      ContentComponent = <div>프로젝트 생성하세요!</div>;
  }

  return (
    <div className='flex flex-col h-screen'>
      {/* 헤더 */}
      <header className='flex items-center gap-4 px-4 text-white bg-gray-800 h-14'>
        <div
          className='text-lg font-bold hover:cursor-pointer'
          onClick={() => {
            window.location.href = ROUTES.HOME;
          }}
        >
          <img src={Logo} />
        </div>
        <nav>
          <ul className='flex gap-4'>
            <li>
              <Link to={`/project/tts/project1`} className='hover:underline'>
                Project 01
              </Link>
            </li>
            <li>
              <Link to={`/project/tts/project2`} className='hover:underline'>
                Project 02
              </Link>
            </li>
            <li>
              <Link to={`/project/tts/project3`} className='hover:underline'>
                Project 03
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className='flex flex-1'>
        {/* 좌측 사이드바 */}
        <aside className='p-2 bg-gray-200 w-[90px]'>
          <ul>
            <li className='mb-4'>
              <Link to={`${ROUTES.PROJECT}${ROUTES.TTS}/${projectId}`}>
                <div className='flex flex-col p-2 hover:bg-accent hover:font-bold hover:text-accent-foreground rounded-2xl'>
                  <BookAIcon className='text-center w-[100%] my-2' size={24} />
                  <p className='text-xs text-center'>TTS</p>
                </div>
              </Link>
            </li>
            <li className='mb-4'>
              <Link to={`${ROUTES.PROJECT}${ROUTES.VC}/${projectId}`}>
                <div className='flex flex-col p-2 hover:bg-accent hover:font-bold hover:text-accent-foreground rounded-2xl'>
                  <MicIcon className='text-center w-[100%] my-2' size={24} />
                  <p className='text-xs text-center '>VC</p>
                </div>
              </Link>
            </li>
            <li className='mb-4'>
              <Link to={`${ROUTES.PROJECT}${ROUTES.CONCAT}/${projectId}`}>
                <div className='flex flex-col p-2 hover:bg-accent hover:font-bold hover:text-accent-foreground rounded-2xl'>
                  <CombineIcon
                    className='text-center w-[100%] my-2'
                    size={24}
                  />
                  <p className='text-xs text-center'>CONCAT</p>
                </div>
              </Link>
            </li>
          </ul>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className='flex-1 p-4 overflow-auto bg-white'>
          {ContentComponent}
        </main>

        {/* 우측 사이드바 */}
        <aside className='p-4  w-[280px] flex flex-col border-l'>
          {SidebarComponent}
        </aside>
      </div>

      {/* 푸터 */}
      <footer
        className={`relative flex items-center justify-center ${
          isFooterExpanded ? 'h-[310px]' : 'h-[114px]'
        } text-white bg-gray-800 transition-all duration-300`}
      >
        {/* 재생 버튼 텍스트 */}
        <p className='text-lg'>재생 버튼 들어갈곳</p>

        {/* 아이콘 버튼 */}
        <button
          onClick={toggleFooter}
          className='absolute bg-gray-600 rounded right-10 hover:bg-gray-700'
        >
          {isFooterExpanded ? <ChevronDown /> : <ChevronUp />}
        </button>
      </footer>
    </div>
  );
};

export default ProjectLayout;
