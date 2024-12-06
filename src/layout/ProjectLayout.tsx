import ConcatSidebar from '@/components/sidebar/ConcatSidebar';
import TTSSidebar from '@/components/sidebar/TTSSidebar';
import VCSidebar from '@/components/sidebar/VCSidebar';
import {
  BookAIcon,
  ChevronDown,
  ChevronUp,
  CombineIcon,
  MicIcon,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Square,
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
import ProjectIconMenu from '@/components/sidebar/ProjectIconMenu';
import Header from '@/components/header/Header';
import ConcatLayout from '@/components/concat/ConcatLayout';
import { Toaster } from '@/components/ui/toaster';

const ProjectLayout = () => {
  // Footer 상태 관리 (열림/닫힘 여부)
  const [isFooterExpanded, setIsFooterExpanded] = useState(false);
  const { selectedMenu, projectId } = useParams();

  // Footer 토글 함수
  const toggleFooter = () => {
    setIsFooterExpanded((prev) => !prev);
  };

  // 단축키 기능 프로젝트 레이아웃에서만 가능하도록
  // useHotkeys('ctrl+s', (event) => {
  //   event.preventDefault();
  //   alert('저장?');
  // });

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

  const [isPlay, setIsPlay] = useState<boolean>(false);

  return (
    <div className='max-w-[1280px] mx-auto'>
      <div className='flex flex-col h-screen'>
        {/* 헤더 */}
        <Header projectTab={false} />

        <div className='flex overflow-hidden grow'>
          {/* 좌측 사이드바 */}
          <aside className='p-2 w-[90px] flex-none border-r border-gray-200 gap-4'>
            <ul className='flex flex-col gap-4'>
              <li className='mb-2'>
                <ProjectIconMenu
                  linkTo={`${ROUTES.PROJECT}${ROUTES.TTS}/${projectId}`}
                  name='TTS'
                  icon={BookAIcon}
                />
              </li>
              <li className='mb-2'>
                <ProjectIconMenu
                  linkTo={`${ROUTES.PROJECT}${ROUTES.VC}/${projectId}`}
                  name='VC'
                  icon={MicIcon}
                />
              </li>
              <li className='mb-2'>
                <ProjectIconMenu
                  linkTo={`${ROUTES.PROJECT}${ROUTES.CONCAT}/${projectId}`}
                  name='CONCAT'
                  icon={CombineIcon}
                />
              </li>
            </ul>
          </aside>

          <div className='grow w-[calc(100vw-90px)] flex h-full'>
            {selectedMenu === 'concat' ? (
              <ConcatLayout />
            ) : (
              <>
                {/* 메인 콘텐츠 */}
                <div className='overflow-auto grow'>
                  <main className='p-4 bg-white min-w-[800px]'>
                    {ContentComponent}
                  </main>
                </div>

                {/* 우측 사이드바 */}
                <aside className='p-4 w-[280px] flex flex-col border-l flex-none'>
                  {SidebarComponent}
                </aside>
              </>
            )}
          </div>
        </div>

        {/* 푸터 */}
        <footer
          className={`flex flex-none items-center justify-center relative ${
            isFooterExpanded ? 'h-[310px]' : 'h-[100px]'
          } text-white border-t  transition-all duration-300`}
        >
          {/* 재생 버튼 텍스트 */}
          <div>
            <div className='flex gap-10'>
              <Button variant={'ghost'}>
                <SkipBack color='black' fill='black' />
              </Button>
              <Button
                variant={'ghost'}
                onClick={() => {
                  setIsPlay(false);
                }}
              >
                <Square color='black' fill='black' />
              </Button>

              {isPlay ? (
                <Button
                  variant={'ghost'}
                  onClick={() => {
                    setIsPlay(false);
                  }}
                >
                  <Pause color='black' fill='black' />
                </Button>
              ) : (
                <Button
                  variant={'ghost'}
                  onClick={() => {
                    setIsPlay(true);
                  }}
                >
                  <Play color='black' fill='black' />
                </Button>
              )}

              <Button variant={'ghost'}>
                <SkipForward color='black' fill='black' />
              </Button>
            </div>
          </div>

          {/* 아이콘 버튼 */}
          {/* <button
          onClick={toggleFooter}
          className='absolute bg-gray-600 rounded right-10 hover:bg-gray-700'
        >
          {isFooterExpanded ? <ChevronDown /> : <ChevronUp />}
        </button> */}
        </footer>
      </div>
    </div>
  );
};

export default ProjectLayout;
