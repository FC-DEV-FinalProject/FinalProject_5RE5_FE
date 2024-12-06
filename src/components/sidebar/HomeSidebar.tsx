import { ChevronDown, Home, Bell, FolderOpen, Files } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DividingLine from '@/components/common/DivideLine';
import { ROUTES } from '@/constants/route';
import { PROJECT_DATA } from '@/mocks/projectData';
import { useState } from 'react';
import { IProjectProps } from '@/types/project';
import { Button } from '@/components/ui/button';
import NewProjectButton from '@/components/common/NewProjectButton';
import useLogout from '@/hooks/apis/useLogout';
import useAuthStore from '@/stores/authStore';

// Menu items.
const Menus = [
  {
    title: '홈',
    url: ROUTES.HOME,
    icon: Home,
  },
  {
    title: '내 프로젝트',
    url: ROUTES.MYPROJECT,
    icon: FolderOpen,
  },
];

const quickStartItem = [
  {
    title: 'Project1',
    url: ROUTES.PROJECT + ROUTES.TTS + '/1',
    icon: Files,
  },
];

export function HomeSidebar() {
  const userData = useAuthStore((state) => state.userData);
  const isLogin = useAuthStore((state) => state.isLogin);
  const { mutate, error, reset } = useLogout();

  if (error) {
    console.error(error);
    alert('로그아웃에 실패했습니다.');
    reset();
  }

  const items = PROJECT_DATA.slice(0, 3);
  const [recents, setRecents] = useState<IProjectProps[]>(items);

  return (
    <>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className='flex items-center justify-between'>
                {isLogin ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuButton className='flex items-center w-auto'>
                          {userData?.name}
                          <ChevronDown className='ml-1' />
                        </SidebarMenuButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='w-[--radix-popper-anchor-width]'>
                        <DropdownMenuItem>
                          <span>계정 정보</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span>계정 설정</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => mutate()}>
                          <span>로그아웃</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Bell className='pl-1 cursor-pointer' />
                  </>
                ) : (
                  <Link to={ROUTES.SIGNIN}>
                    <Button variant={'green'}>로그인</Button>
                  </Link>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <DividingLine />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {Menus.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <NewProjectButton />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <DividingLine />
        <SidebarGroup>
          <SidebarGroupLabel>최근 작업 프로젝트</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recents.map((item) => (
                <SidebarMenuItem key={item.projectName}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={`${ROUTES.PROJECT}${ROUTES.TTS}/${item.projectSeq}`}
                    >
                      <Files />
                      <span>{item.projectName}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </>
  );
}
