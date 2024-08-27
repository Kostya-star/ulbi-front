import { useCallback, useMemo, useState } from 'react';

interface UseHoverBind {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

type UseHoverReturned = [boolean, UseHoverBind];

export const useHover = (): UseHoverReturned => {
  const [isHover, setHover] = useState(false);

  const onMouseEnter = useCallback(() => {
    setHover(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  return useMemo(() => {
    return [isHover, { onMouseEnter, onMouseLeave }];
  }, [isHover, onMouseEnter, onMouseLeave]);
};
