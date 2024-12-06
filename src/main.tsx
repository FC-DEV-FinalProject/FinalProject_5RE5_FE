import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

//경고무시
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0]?.includes('React Router Future Flag Warning')) {
    return;
  }
  originalWarn(...args);
};

// Mocking 활성화 함수
async function enableMocking() {
  const isMockEnabled = import.meta.env.VITE_ENABLE_MOCK === 'true';
  if (process.env.NODE_ENV === 'development' && isMockEnabled) {
    const { worker } = await import('./mocks/browser');
    return worker.start();
  } else {
    return false;
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
