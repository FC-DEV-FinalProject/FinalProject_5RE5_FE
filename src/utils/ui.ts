export const getWrapBg = (): React.CSSProperties | null => {
  const pathName = window.location.pathname.toLocaleLowerCase();
  const isSignin = pathName === '/signin';
  return isSignin
    ? { background: 'linear-gradient(to right, #D6EEFE 50%, #fff 50%)' }
    : null;
};
