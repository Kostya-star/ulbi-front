import { DependencyList, useEffect } from 'react';

export const useConditionalEffect = (
  cb: () => void,
  deps: DependencyList = [],
) => {
  useEffect(() => {
    if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'jest') {
      cb();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
