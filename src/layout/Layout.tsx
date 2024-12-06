import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const path = useLocation().pathname;
  const isSignin = path.toLocaleLowerCase() === '/signin';
  const [style, setStyle] = useState<null | React.CSSProperties>(null);

  useEffect(() => {
    if (isSignin) {
      setStyle({
        background: 'linear-gradient(to right, #D6EEFE 50%, #fff 50%)',
      });
    }
  }, [path]);

  return (
    <div style={style || undefined}>
      <main className='max-w-[1280px] mx-auto'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
