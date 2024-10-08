import { validateProfileErrors } from './validateProfileErrors';
import { ProfileFormErrors } from '../../const/profileFormErrors';

describe('validateProfileErrors', () => {
  test('no data', () => {
    const errors = validateProfileErrors(null);

    expect(errors).toBeInstanceOf(Array);
    expect(errors).toHaveLength(1);
    expect(errors).toEqual([ProfileFormErrors.NO_DATA]);
  });

  test('all errors', () => {
    const errors = validateProfileErrors({
      first: '',
      lastname: '',
      username: '',
      age: Number(''),
      city: '',
    });

    expect(errors).toBeInstanceOf(Array);
    expect(errors).toHaveLength(5);
    expect(errors).toEqual([
      ProfileFormErrors.INCORRECT_FIRST_NAME,
      ProfileFormErrors.INCORRECT_LAST_NAME,
      ProfileFormErrors.INCORRECT_USERNAME,
      ProfileFormErrors.INCORRECT_AGE,
      ProfileFormErrors.INCORRECT_CITY,
    ]);
  });
});
