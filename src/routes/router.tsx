import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProjectLayout from '@/layout/ProjectLayout';
import Concat from '@/pages/Concat';
import TTS from '@/pages/TTS';
import VC from '@/pages/VC';
import ProtectedRoute from '@/routes/ProtectedRoute';
import HomeLayout from '@/layout/HomeLayout';
import Layout from '@/layout/Layout';
import Home from '@/pages/Home';
import MyProject from '@/pages/MyProject';
import Profile from '@/pages/Profile';
import ResetPassword from '@/pages/ResetPassword';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import ErrorBoundary from '@/components/errorPageComponent/errorBoundary';
import NotFound from '@/components/errorPageComponent/notFound';
import PublicRoute from '@/routes/PublicRoute';

export const router = createBrowserRouter([
  // 홈 레이아웃
  {
    path: '/',
    element: <HomeLayout />, // 홈 전용 레이아웃
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true, // 홈 화면
        element: <Home />,
      },
      {
        element: <ProtectedRoute />, // 보호된 경로
        children: [
          { path: 'my-project', element: <MyProject /> }, // my-project는 HomeLayout 사용
        ],
      },
    ],
  },
  // PublicRoute (로그인/회원가입 등 레이아웃 없음)
  {
    element: <Layout />, // 레이아웃 없는 화면
    children: [
      {
        element: <PublicRoute />,
        children: [
          { path: 'signin', element: <SignIn /> },
          { path: 'signup', element: <SignUp /> },
          { path: 'reset-password', element: <ResetPassword /> },
        ],
      },
    ],
  },
  // PrivateRoute (프로젝트 레이아웃)
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'project',
        element: <ProjectLayout />, // 프로젝트 전용 레이아웃
        children: [
          // 프로젝트 기본 페이지: `/project`로 접근 시 기본적으로 리디렉션하거나 안내 페이지 제공
          {
            index: true,
            element: <TTS />,
          },
          { path: ':selectedMenu/:projectId', element: <TTS /> },
          { path: ':selectedMenu/:projectId', element: <VC /> },
          { path: ':selectedMenu/:projectId', element: <Concat /> },
        ],
      },
    ],
  },
  // Not Found
  {
    path: '*',
    element: <NotFound />,
  },
]);
