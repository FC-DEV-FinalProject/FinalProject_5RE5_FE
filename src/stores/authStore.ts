import { IUserData } from '@/types/login';
import { create } from 'zustand';

interface AuthState {
  userInfo: IUserData | null;
  isAuthenticated: boolean;
  logout: () => void;
  setUserAndLogin: (userInfo: IUserData | null) => void;
  setRememberMe: (newState: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userInfo: null,
  isAuthenticated: false,
  setUserAndLogin: (userInfo) => {
    set({ userInfo, isAuthenticated: true });
  },
  logout: () => {
    set({ isAuthenticated: false });
    document.cookie = `isLogin=; path=/; max-age=0; Secure; SameSite=Strict`;
  },
  setRememberMe: (newState) => {
    if (newState) {
      document.cookie = `isLogin=true; path=/; max-age=${60 * 60 * 24}; Secure; SameSite=Strict`;
    } else {
      if (document.cookie.includes('isLogin')) {
        document.cookie = `isLogin=; path=/; max-age=0; Secure; SameSite=Strict`;
      }
    }
  },
}));
