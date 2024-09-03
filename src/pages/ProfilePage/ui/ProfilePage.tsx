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
  FC, memo, useCallback, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { ReducersList, useReduxReducerManager } from 'shared/hooks/useReduxReducerManager/useReduxReducerManager';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { isNumber } from 'shared/util/isNumber/isNumber';
import { useParams } from 'react-router-dom';
import { useConditionalEffect } from 'shared/hooks/useConditionalEffect/useConditionalEffect';
import { getAuthUserData } from 'entities/User';
import { Page } from 'widgets/Page';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
  profile: profileReducer,
};

interface ProfilePageProps {
  className?: string;
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
  const { t } = useTranslation('profile');

  useReduxReducerManager(reducers, true);

  const { id: profileId } = useParams<{ id: string }>();

  const profileData = useSelector(getProfileData);
  const isProfileLoading = useSelector(getProfileIsLoading);
  const profileError = useSelector(getProfileError);

  const authData = useSelector(getAuthUserData);

  const [profileEdits, setProfileEdits] = useState<Profile | null>(null);
  const [isProfileReadonly, setProfileReadonly] = useState(true);

  const dispatch = useAppDispatch();

  useConditionalEffect(() => {
    if (!profileId) return;

    const fetchProfile = async () => {
      const profile = await dispatch(fetchProfileData(profileId)).unwrap();
      if (profile) setProfileEdits({ ...profile });
    };

    fetchProfile();
  }, [profileId, dispatch]);

  // validate form for errors
  const formErrors = useMemo(() => validateProfileErrors(profileEdits), [profileEdits]);
  const canEdit = useMemo(() => {
    return authData?.id === profileData?.id;
  }, [authData?.id, profileData?.id]);

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
    dispatch(updateProfileData(profileEdits as Profile));
  }, [profileEdits, formErrors.length, dispatch]);

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
    <Page className={classNames('', {}, [className])}>
      <ProfilePageHeader
        isReadonly={isProfileReadonly}
        isSaveAllowed={!formErrors.length}
        canEdit={canEdit}
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
    </Page>
  );
};

export default memo(ProfilePage);
