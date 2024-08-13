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
} from 'entities/Profile';
import {
  FC, useCallback, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { ReducersList, useReduxReducerManager } from 'shared/hooks/useReduxReducerManager/useReduxReducerManager';
import { classNames } from 'shared/lib/classNames/classNames';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
  profile: profileReducer,
};

interface ProfilePageProps {
  className?: string;
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
  useReduxReducerManager(reducers, true);

  const profileData = useSelector(getProfileData);
  const isProfileLoading = useSelector(getProfileIsLoading);
  const profileError = useSelector(getProfileError);

  const [profileEdits, setProfileEdits] = useState<Profile>({});
  const [isProfileReadonly, setProfileReadonly] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await dispatch(fetchProfileData()).unwrap();
      if (profile) setProfileEdits({ ...profile });
    };

    fetchProfile();
  }, [dispatch]);

  // profile actions
  const onEditProfile = useCallback(() => {
    setProfileReadonly(false);
  }, []);

  const onCancelEditProfile = useCallback(() => {
    setProfileReadonly(true);
    setProfileEdits({ ...profileData });
  }, [profileData]);

  const onSaveEditsProfile = useCallback(() => {
    setProfileReadonly(true);
    dispatch(updateProfileData(profileEdits));
  }, [profileEdits, dispatch]);

  // profile edition
  const onChangeFirstname = useCallback((val: string) => {
    setProfileEdits((edits) => ({ ...edits, first: val }));
  }, []);

  const onChangeLastname = useCallback((val: string) => {
    setProfileEdits((edits) => ({ ...edits, lastname: val }));
  }, []);

  const onChangeAge = useCallback((age: string) => {
    const ageIsNumber = /^[0-9]*$/.test(age);
    if (!ageIsNumber) return;

    setProfileEdits((edits) => ({ ...edits, age: Number(age) }));
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

  return (
    <div className={classNames('', {}, [className])}>
      <ProfilePageHeader
        isReadonly={isProfileReadonly}
        onEdit={onEditProfile}
        onCancel={onCancelEditProfile}
        onSave={onSaveEditsProfile}
      />
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

export default ProfilePage;
