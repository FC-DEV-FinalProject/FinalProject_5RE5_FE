import { Outlet } from 'react-router-dom';

const ProjectLayout = () => {
  return (
    <div className='flex flex-col h-screen'>
      {/* 헤더 */}
      <header className='h-14 bg-gray-800 text-white flex items-center justify-between px-4'>
        <h1 className='text-lg font-bold'>프로젝트 헤더</h1>
        <nav>
          <ul className='flex gap-4'>
            <li>
              <a href='#project1' className='hover:underline'>
                Project 01
              </a>
            </li>
            <li>
              <a href='#project2' className='hover:underline'>
                Project 02
              </a>
            </li>
            <li>
              <a href='#project3' className='hover:underline'>
                Project 03
              </a>
            </li>
            <li>
              <a href='#project4' className='hover:underline'>
                Project 04
              </a>
            </li>
            <li>
              <a href='#project5' className='hover:underline'>
                Project 05
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <div className='flex flex-1'>
        {/* 좌측 사이드바 */}
        <aside className='w-60 bg-gray-200 p-4'>
          <h2 className='text-lg font-semibold'>좌측 사이드바</h2>
          <ul>
            <li className='mb-2'>
              <a href='#link1' className='hover:underline'>
                Link 1
              </a>
            </li>
            <li className='mb-2'>
              <a href='#link2' className='hover:underline'>
                Link 2
              </a>
            </li>
            <li>
              <a href='#link3' className='hover:underline'>
                Link 3
              </a>
            </li>
          </ul>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className='flex-1 bg-white p-4 overflow-auto'>
          <Outlet />
        </main>

        {/* 우측 사이드바 */}
        <aside className='w-60 bg-gray-200 p-4'>
          <h2 className='text-lg font-semibold'>우측 사이드바</h2>
          <ul>
            <li className='mb-2'>
              <a href='#link4' className='hover:underline'>
                Link 4
              </a>
            </li>
            <li className='mb-2'>
              <a href='#link5' className='hover:underline'>
                Link 5
              </a>
            </li>
            <li>
              <a href='#link6' className='hover:underline'>
                Link 6
              </a>
            </li>
          </ul>
        </aside>
      </div>

      {/* 푸터 */}
      <footer className='h-12 bg-gray-800 text-white flex items-center justify-center'>
        <p className='text-sm'>© 2024 My Project. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProjectLayout;
