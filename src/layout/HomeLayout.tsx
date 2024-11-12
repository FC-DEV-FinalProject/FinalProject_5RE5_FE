import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { HomeSidebar } from '@/components/HomeSidebar';
import { CSSProperties } from 'react';

export default function HomeLayout() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '210px',
          //   '--sidebar-width-mobile': '10rem',
        } as CSSProperties
      }
    >
      <HomeSidebar />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
