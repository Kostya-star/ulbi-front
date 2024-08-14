import { Country } from 'entities/CountrySelect';
import { Currency } from 'entities/CurrencySelect';
import {
  fetchProfileData,
  getProfileData,
  getProfileError,
  getProfileIsLoading,
  updateProfileData,
  Profile,
  ProfileCard,
  profileReducer,
  validateProfileErrors,
} from 'entities/Profile';
import {
  FC, memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { ReducersList, useReduxReducerManager } from 'shared/hooks/useReduxReducerManager/useReduxReducerManager';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { isNumber } from 'shared/util/isNumber/isNumber';
import AvatarImg from 'shared/assets/tests/storybook/storybook-avatar.jpg';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const defaultProfileData = {
  first: 'Constantin',
  lastname: "Danilov",
  age: 24,
  city: "Bender",
  country: Country.Moldova,
  currency: Currency.MD,
  username: 'admin',
  avatar: AvatarImg,
};

const reducers: ReducersList = {
  profile: profileReducer,
};

interface ProfilePageProps {
  className?: string;
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
  const { t } = useTranslation('profile');
  const isStorybookEnvironment = useMemo(() => __PROJECT__ === 'storybook', []);

  useReduxReducerManager(reducers, true);

  const profileData = useSelector(getProfileData);
  const isProfileLoading = useSelector(getProfileIsLoading);
  const profileError = useSelector(getProfileError);

  const [profileEdits, setProfileEdits] = useState<Profile | null>(null);
  const [isProfileReadonly, setProfileReadonly] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isStorybookEnvironment) {
      const fetchProfile = async () => {
        const profile = await dispatch(fetchProfileData()).unwrap();
        if (profile) setProfileEdits({ ...profile });
      };

      fetchProfile();
    }

    if (isStorybookEnvironment) {
      setProfileEdits(defaultProfileData);
    }
  }, [isStorybookEnvironment, dispatch]);

  // validate form for errors
  const formErrors = useMemo(() => validateProfileErrors(profileEdits), [profileEdits]);

  // profile actions
  const onEditProfile = useCallback(() => {
    setProfileReadonly(false);
  }, []);

  const onCancelEditProfile = useCallback(() => {
    setProfileReadonly(true);
    setProfileEdits({ ...profileData });
  }, [profileData]);

  const onSaveEditsProfile = useCallback(() => {
    if (formErrors.length) return;

    setProfileReadonly(true);

    if (isStorybookEnvironment) return;
    dispatch(updateProfileData(profileEdits as Profile));
  }, [profileEdits, formErrors.length, isStorybookEnvironment, dispatch]);

  // profile edition
  const onChangeFirstname = useCallback((val: string) => {
    setProfileEdits((edits) => ({ ...edits, first: val }));
  }, []);

  const onChangeLastname = useCallback((val: string) => {
    setProfileEdits((edits) => ({ ...edits, lastname: val }));
  }, []);

  const onChangeAge = useCallback((age: string) => {
    if (isNumber(age)) {
      setProfileEdits((edits) => ({ ...edits, age: Number(age) }));
    }
  }, []);

  const onChangeCity = useCallback((city: string) => {
    setProfileEdits((edits) => ({ ...edits, city }));
  }, []);

  const onChangeUsername = useCallback((username: string) => {
    setProfileEdits((edits) => ({ ...edits, username }));
  }, []);

  const onChangeAvatarUrl = useCallback((avatar: string) => {
    setProfileEdits((edits) => ({ ...edits, avatar }));
  }, []);

  const onChangeCurrency = useCallback((currency: Currency) => {
    setProfileEdits((edits) => ({ ...edits, currency }));
  }, []);

  const onChangeCountry = useCallback((country: Country) => {
    setProfileEdits((edits) => ({ ...edits, country }));
  }, []);

  const formErrorsList = useMemo(() => (
    formErrors.map((err) => (
      <Text
        key={err}
        text={t(err)}
        theme={TextTheme.ERROR}
      />
    ))
  ), [formErrors, t]);

  return (
    <div className={classNames('', {}, [className])}>
      <ProfilePageHeader
        isReadonly={isProfileReadonly}
        isSaveAllowed={!formErrors.length}
        onEdit={onEditProfile}
        onCancel={onCancelEditProfile}
        onSave={onSaveEditsProfile}
      />
      {
        formErrors.length
          ? (
            <div>
              {formErrorsList}
            </div>
          )
          : null
      }
      <ProfileCard
        data={profileEdits}
        isLoading={isProfileLoading}
        error={profileError}
        isReadonly={isProfileReadonly}
        onChangeFirstname={onChangeFirstname}
        onChangeLastname={onChangeLastname}
        onChangeAge={onChangeAge}
        onChangeCity={onChangeCity}
        onChangeUsername={onChangeUsername}
        onChangeAvatarUrl={onChangeAvatarUrl}
        onChangeCurrency={onChangeCurrency}
        onChangeCountry={onChangeCountry}
      />
    </div>
  );
};

export default memo(ProfilePage);
