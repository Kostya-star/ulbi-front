import { useEffect, useState } from 'react';

export function useDevice() {
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    if (!window.matchMedia) return;
    setMobile(window.matchMedia('(pointer:coarse)').matches);
  }, []);

  return isMobile;
}
