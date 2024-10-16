import { FeatureFlags } from '@/shared/types/featureFlags';

import { getFeatureFlag } from './getSetFeatures';

interface ToggleFeaturesOptions<T> {
  name: keyof FeatureFlags;
  on: () => T;
  off: () => T;
}

export const toggleFeatures = <T>({
  name,
  on,
  off,
}: ToggleFeaturesOptions<T>) => {
  if (getFeatureFlag(name)) return on();
  return off();
};
