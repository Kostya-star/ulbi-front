import { Profile } from '@/entities/Profile';
import { isNumber } from '@/shared/util/isNumber/isNumber';

import { ProfileFormErrors } from '../../const/profileFormErrors';

export function validateProfileErrors(profileEdits: Profile | null) {
  const errors: ProfileFormErrors[] = [];

  if (!profileEdits) {
    errors.push(ProfileFormErrors.NO_DATA);
    return errors;
  }

  const { first, lastname, username, age, city } = profileEdits;

  if (!first?.trim()) {
    errors.push(ProfileFormErrors.INCORRECT_FIRST_NAME);
  }

  if (!lastname?.trim()) {
    errors.push(ProfileFormErrors.INCORRECT_LAST_NAME);
  }

  if (!username?.trim()) {
    errors.push(ProfileFormErrors.INCORRECT_USERNAME);
  }

  if (!age || !age?.toString()?.trim() || !isNumber(String(age))) {
    errors.push(ProfileFormErrors.INCORRECT_AGE);
  }

  if (!city?.trim()) {
    errors.push(ProfileFormErrors.INCORRECT_CITY);
  }

  return errors;
}
