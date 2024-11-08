import ProjectLayout from '@/components/createProject/ProjectLayout';
import Layout from '@/layout/Layout';
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
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        element: <PublicRoute isAuthenticated={isAuthenticated} />, // 로그인하지 않은 상태만 접근 가능
        children: [
          { path: 'signin', element: <SignIn /> },
          { path: 'signup', element: <SignUp /> },
          { path: 'reset-password', element: <ResetPassword /> },
        ],
      },
      {
        element: <ProtectedRoute isAuthenticated={isAuthenticated} />, // 로그인 상태만 접근 가능
        children: [
          { path: 'my-project', element: <MyProject /> },
          { path: 'profile', element: <Profile /> },
          {
            path: 'project',
            element: <ProjectLayout />,
            children: [
              { index: true, path: 'tts', element: <TTS /> },
              { path: 'vc', element: <VC /> },
              { path: 'concat', element: <Concat /> },
            ],
          },
        ],
      },
    ],
  },
]);
