import { useEffect, useState } from 'react';

import { Button } from '@/shared/ui/Button';

// temporary component for testing
export const MakeErrorTestBtn = () => {
  const [isError, setError] = useState(false);
  const makeBug = () => setError(true);

  useEffect(() => {
    if (isError) {
      throw new Error('This is a test error');
    }
  }, [isError]);

  return (
    <Button onClick={makeBug}>
      {/* eslint-disable i18next/no-literal-string */}
      make bug
    </Button>
  );
};
