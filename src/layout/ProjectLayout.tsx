import ConcatSidebar from '@/components/sidebar/ConcatSidebar';
import TTSSidebar from '@/components/sidebar/TTSSidebar';
import VCSidebar from '@/components/sidebar/VCSidebar';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Link, useParams } from 'react-router-dom';
import TTS from '@/pages/TTS';
import VC from '@/pages/VC';
import Concat from '@/pages/Concat';
import Logo from '@/assets/logo.png';

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
      <header className='flex items-center gap-4 px-4 text-white border-b h-14'>
        <h1 className='text-lg font-bold '>
          <img src={Logo} />
        </h1>
        <nav>
          <ul className='flex gap-4 border-1'>
            <li>
              <Link
                to={`/project/tts/project1`}
                className='text-black hover:underline'
              >
                Project 01
              </Link>
            </li>
            <li>
              <Link
                to={`/project/tts/project2`}
                className='text-black hover:underline'
              >
                Project 02
              </Link>
            </li>
            <li>
              <Link
                to={`/project/tts/project3`}
                className='text-black hover:underline'
              >
                Project 03
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className='flex flex-1'>
        {/* 좌측 사이드바 */}
        <aside className='p-4 w-[90px] border-r flex flex-col items-center'>
          <ul className='flex flex-col items-center'>
            <li className='flex items-center justify-center mb-8'>
              <Link
                to={`/project/tts/${projectId}`}
                className='text-center hover:underline'
              >
                TTS
              </Link>
            </li>
            <li className='flex items-center justify-center mb-8'>
              <Link
                to={`/project/vc/${projectId}`}
                className='text-center hover:underline'
              >
                VC
              </Link>
            </li>
            <li className='flex items-center justify-center'>
              <Link
                to={`/project/concat/${projectId}`}
                className='text-center hover:underline'
              >
                Concat
              </Link>
            </li>
          </ul>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className='flex-1 p-4 overflow-auto bg-white'>
          {ContentComponent}
        </main>

        {/* 우측 사이드바 */}
        <aside className='  w-[280px] flex flex-col border-l p-4'>
          {SidebarComponent}
        </aside>
      </div>

      {/* 푸터 */}
      <footer
        className={`relative flex items-center justify-center ${
          isFooterExpanded ? 'h-[310px]' : 'h-[114px]'
        } text-white border-t  transition-all duration-300`}
      >
        {/* 재생 버튼 텍스트 */}
        <p className='text-lg text-black'>재생 버튼 들어갈곳</p>

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
