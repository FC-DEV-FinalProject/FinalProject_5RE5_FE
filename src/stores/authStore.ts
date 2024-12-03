import { IUserData } from '@/types/login';
import { create } from 'zustand';
import { persist, StorageValue } from 'zustand/middleware';

interface AuthState {
  isLogin: boolean;
  userData: IUserData | null;
  login: (data: IUserData, keepLogin: boolean) => void;
  logout: () => void;
}

type AuthPersistState = Omit<AuthState, 'login' | 'logout'>;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userData: null,
      isLogin: false,
      login: (data, keepLogin) => {
        set({
          userData: data,
          isLogin: true,
        });
        if (keepLogin) {
          localStorage.setItem('keepLogin', 'true');
        } else {
          localStorage.removeItem('keepLogin');
        }
      },
      logout: () => {
        set({
          userData: null,
          isLogin: false,
        });
        localStorage.removeItem('keepLogin');
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        userData: state.userData,
        isLogin: state.isLogin,
      }),
      storage: {
        getItem: (
          name: string
        ):
          | StorageValue<AuthPersistState>
          | Promise<StorageValue<AuthPersistState> | null>
          | null => {
          const keepLogin = localStorage.getItem('keepLogin') === 'true';
          const storedData = keepLogin
            ? localStorage.getItem(name)
            : sessionStorage.getItem(name);

          if (storedData) {
            try {
              return JSON.parse(storedData) as StorageValue<AuthPersistState>;
            } catch (error) {
              console.error('Failed to parse storage data:', error);
              return null;
            }
          }
          return null;
        },
        setItem: (
          name: string,
          value: StorageValue<AuthPersistState>
        ): void => {
          const keepLogin = localStorage.getItem('keepLogin') === 'true';
          const data = JSON.stringify(value);
          if (keepLogin) {
            localStorage.setItem(name, data);
            sessionStorage.removeItem(name);
          } else {
            sessionStorage.setItem(name, data);
            localStorage.removeItem(name);
          }
        },
        removeItem: (name: string): void => {
          localStorage.removeItem(name);
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);

export default useAuthStore;
