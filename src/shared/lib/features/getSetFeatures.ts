import { FeatureFlags } from '@/shared/types/featureFlags';

let featureFalgs: FeatureFlags = {};

export const setFeatureFlags = (newFlags?: FeatureFlags) => {
  if (newFlags) featureFalgs = newFlags;
};

export const getFeatureFlag = (flag: keyof FeatureFlags) => {
  return featureFalgs[flag];
};
