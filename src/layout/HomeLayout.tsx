import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CSSProperties } from 'react';
import { HomeSidebar } from '@/components/sidebar/HomeSidebar';
import HomeHeader from '@/components/header/HomeHeader';

export default function HomeLayout() {
  return (
    <div className='flex flex-col h-screen'>
      <header className='ml-[210px]'>
        <HomeHeader />
      </header>
      <div className='flex flex-1 overflow-hidden'>
        <SidebarProvider
          style={
            {
              '--sidebar-width': '210px',
              maxWidth: '210px',
              //   '--sidebar-width-mobile': '10rem',
            } as CSSProperties
          }
        >
          <HomeSidebar />
        </SidebarProvider>
        <main className='flex-1 overflow-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
