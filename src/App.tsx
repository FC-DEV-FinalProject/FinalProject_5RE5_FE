import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getWrapBg } from '@/utils/ui';

const queryClient = new QueryClient();

function App() {
  const bg = getWrapBg();

  return (
    <div id='wrap' style={bg || undefined}>
      <div className='max-w-[1280px] mx-auto'>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
