import * as React from 'react';

interface WindowProps {
  width: number;
  height: number;
}

export const useWindow = () => {
  const [windowState, setWindowState] = React.useState<WindowProps>({
    width: 1366,
    height: 768,
  });

  function handleResize() {
    setWindowState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
    return;
  }, []);

  return windowState;
};