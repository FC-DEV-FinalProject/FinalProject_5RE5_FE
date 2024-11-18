import ErrorBoundary from '@/components/errorPageComponent/errorBoundary';
import NotFound from '@/components/errorPageComponent/notFound';
import HomeLayout from '@/layout/HomeLayout';
import Layout from '@/layout/Layout';
import ProjectLayout from '@/layout/ProjectLayout';
import Concat from '@/pages/Concat';
import Home from '@/pages/Home';
import MyProject from '@/pages/MyProject';
import Profile from '@/pages/Profile';
import ResetPassword from '@/pages/ResetPassword';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import TTS from '@/pages/TTS';
import VC from '@/pages/VC';
import ProtectedRoute from '@/routes/ProtectedRoute';
import PublicRoute from '@/routes/PublicRoute';
import { createBrowserRouter } from 'react-router-dom';

const isAuthenticated = true; // 실제 로그인 상태를 가져오는 로직으로 대체

// import { useAuthStore } from '@/stores/authStore';

// const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

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
        element: <ProtectedRoute isAuthenticated={isAuthenticated} />, // 보호된 경로
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
        element: <PublicRoute isAuthenticated={isAuthenticated} />,
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
    element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
    children: [
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'project',
        element: <ProjectLayout />, // 프로젝트 전용 레이아웃
        children: [
          { index: true, path: 'tts/:projectId', element: <TTS /> },
          { path: 'vc/:projectId', element: <VC /> },
          { path: 'concat/:projectId', element: <Concat /> },
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
