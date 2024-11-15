import { Outlet, Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useHotkeys } from 'react-hotkeys-hook';

const ProjectLayout = () => {
  // Footer 상태 관리 (열림/닫힘 여부)
  const [isFooterExpanded, setIsFooterExpanded] = useState(false);

  // 현재 URL에서 projectId 가져오기
  const { projectId } = useParams();

  // Footer 토글 함수
  const toggleFooter = () => {
    setIsFooterExpanded((prev) => !prev);
  };

  // 단축키 기능 프로젝트 레이아웃에서만 가능하도록
  useHotkeys('ctrl+s', (event) => {
    event.preventDefault();
    alert('저장?');
  });

  return (
    <div className='flex flex-col h-screen'>
      {/* 헤더 */}
      <header className='flex items-center gap-4 px-4 text-white bg-gray-800 h-14'>
        <h1 className='text-lg font-bold'>로고 </h1>
        <nav>
          <ul className='flex gap-4'>
            <li>
              <Link to={`tts/project1`} className='hover:underline'>
                Project 01
              </Link>
            </li>
            <li>
              <Link to={`tts/project2`} className='hover:underline'>
                Project 02
              </Link>
            </li>
            <li>
              <Link to={`tts/project3`} className='hover:underline'>
                Project 03
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className='flex flex-1'>
        {/* 좌측 사이드바 */}
        <aside className='p-4 bg-gray-200 w-[90px]'>
          <ul>
            <li className='mb-8'>
              <Link to={`tts/${projectId}`} className='hover:underline'>
                TTS
              </Link>
            </li>
            <li className='mb-8'>
              <Link to={`vc/${projectId}`} className='hover:underline'>
                VC
              </Link>
            </li>
            <li>
              <Link to={`concat/${projectId}`} className='hover:underline'>
                Concat
              </Link>
            </li>
          </ul>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className='flex-1 p-4 overflow-auto bg-white'>
          <Outlet />
        </main>

        {/* 우측 사이드바 */}
        <aside className='p-4 bg-gray-200 w-[280px]'>
          <ul>
            <li className='mb-2'>
              <Link
                to={`tts/${projectId || 'project1'}`}
                className='hover:underline'
              >
                Link 4
              </Link>
            </li>
            <li className='mb-2'>
              <Link
                to={`vc/${projectId || 'project1'}`}
                className='hover:underline'
              >
                Link 5
              </Link>
            </li>
            <li>
              <Link
                to={`concat/${projectId || 'project1'}`}
                className='hover:underline'
              >
                Link 6
              </Link>
            </li>
          </ul>
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
