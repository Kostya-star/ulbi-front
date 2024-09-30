import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { Country } from '@/entities/CountrySelect';
import { Currency } from '@/entities/CurrencySelect';
import { renderComponent } from '@/shared/lib/tests/renderComponent/renderComponent';
import { Profile } from '@/entities/Profile';
import { $api } from '@/shared/api/api';
import { profileReducer } from '../../model/slices/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
  id: '1',
  first: 'Const',
  lastname: 'Dan',
  age: 24,
  currency: Currency.EUR,
  country: Country.Holland,
  city: 'Bender',
  username: 'lol',
  avatar: 'kek',
};

const options = {
  initialState: {
    profile: {
      data: profile,
    },
    user: {
      authData: { id: '1' },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
};

describe('EditableProfileCard.test', () => {
  test('readonly mode is expected to turn into non-readonly', async () => {
    renderComponent(<EditableProfileCard withHeader profileId='1' />, options);

    const editBtn = screen.getByTestId('ProfileCardHeader.EditButton');
    await userEvent.click(editBtn);

    const cancelBtn = screen.getByTestId('ProfileCardHeader.CancelButton');
    expect(cancelBtn).toBeInTheDocument();
  });

  test('change input credentials', async () => {
    renderComponent(<EditableProfileCard withHeader profileId='1' />, options);

    const editBtn = screen.getByTestId('ProfileCardHeader.EditButton');
    await userEvent.click(editBtn);

    const firstNameInput = screen.getByTestId('ProfileCard.firstname');
    const lastNameInput = screen.getByTestId('ProfileCard.lastname');

    await userEvent.clear(firstNameInput);
    await userEvent.clear(lastNameInput);

    await userEvent.type(firstNameInput, 'Costya');
    await userEvent.type(lastNameInput, 'Danilov');

    expect(firstNameInput).toHaveValue('Costya');
    expect(lastNameInput).toHaveValue('Danilov');

    const cancelBtn = screen.getByTestId('ProfileCardHeader.CancelButton');
    await userEvent.click(cancelBtn);

    expect(firstNameInput).toHaveValue('Const');
    expect(lastNameInput).toHaveValue('Dan');
  });

  test('error should appear', async () => {
    renderComponent(<EditableProfileCard withHeader profileId='1' />, options);

    const editBtn = screen.getByTestId('ProfileCardHeader.EditButton');
    await userEvent.click(editBtn);

    const firstNameInput = screen.getByTestId('ProfileCard.firstname');
    await userEvent.clear(firstNameInput);

    const error = screen.getByTestId('EditableProfileCard.Error.Paragraph');

    expect(error).toBeInTheDocument();
  });

  // test('request to edit profile has been sent', async () => {
  //   const mockPatchRequest = jest.spyOn($api, 'put');

  //   renderComponent(<EditableProfileCard withHeader profileId='1' />, options);

  //   await userEvent.click(screen.getByTestId('ProfileCardHeader.EditButton'));

  //   await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'Costya');

  //   await userEvent.click(screen.getByTestId('ProfileCardHeader.SaveButton'));

  //   expect(mockPatchRequest).toHaveBeenCalled();
  // });
});
