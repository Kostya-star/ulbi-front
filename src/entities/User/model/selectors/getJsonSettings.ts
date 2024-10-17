import { buildSelector } from '@/shared/lib/store/buildSelector';

import { JsonSettings } from '../types/jsonSettings';

const defaultSettings: JsonSettings = {};

export const [useJsonSettings, getJsonSettings] = buildSelector(
  (state) => state.user.authData?.jsonSettings ?? defaultSettings,
);
// export const [useJsonSettingsByKey] = buildSelector(
//   (state, key: keyof JsonSettings) => state.user.authData?.jsonSettings?.[key],
// );
