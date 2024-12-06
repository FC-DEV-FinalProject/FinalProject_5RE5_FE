import { Link, Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CSSProperties } from 'react';
import { HomeSidebar } from '@/components/sidebar/HomeSidebar';
import Header from '@/components/header/Header';

export default function HomeLayout() {
  return (
    <div className='max-w-[1280px] mx-auto'>
      <div className='flex flex-col h-screen'>
        <Header />

        <div className='flex h-full overflow-hidden'>
          <div className='flex-none w-[210px] pt-2 border-r border-gray-200'>
            <SidebarProvider
              style={
                {
                  '--sidebar-width': '100%',
                  // maxWidth: '100%',
                  //   '--sidebar-width-mobile': '10rem',
                } as CSSProperties
              }
            >
              <HomeSidebar />
            </SidebarProvider>
          </div>
          <div className='overflow-auto grow'>
            <main className='flex flex-col gap-5 p-5 min-w-[1000px]'>
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
