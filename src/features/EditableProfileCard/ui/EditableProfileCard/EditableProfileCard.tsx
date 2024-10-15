import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Country } from '@/entities/CountrySelect';
import { Currency } from '@/entities/CurrencySelect';
import { Profile, ProfileCard } from '@/entities/Profile';
import { getAuthUserData } from '@/entities/User';
import AvatarImg from '@/shared/assets/tests/storybook/storybook-avatar.jpg';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { useConditionalEffect } from '@/shared/hooks/useConditionalEffect/useConditionalEffect';
import { Text, TextTheme } from '@/shared/ui/Text';
import { isNumber } from '@/shared/util/isNumber/isNumber';

import { validateProfileErrors } from '../../model/lib/validateProfileErrors/validateProfileErrors';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { ProfileCardHeader } from '../ProfileCardHeader/ProfileCardHeader';

interface EditableProfileCardProps {
  className?: string;
  profileId?: string;
  withHeader?: boolean;
}

const mockProfileData: Profile = {
  first: 'Constantin',
  lastname: 'Danilov',
  age: 24,
  city: 'Bender',
  country: Country.Moldova,
  currency: Currency.MD,
  username: 'admin',
  avatar: AvatarImg,
};

export const EditableProfileCard = memo(
  ({ className, profileId, withHeader }: EditableProfileCardProps) => {
    const { t } = useTranslation('profile');

    const authData = useSelector(getAuthUserData);

    const dispatch = useAppDispatch();

    const profileData = useSelector(getProfileData);
    const isProfileLoading = useSelector(getProfileIsLoading);
    const profileError = useSelector(getProfileError);

    const [profileEdits, setProfileEdits] = useState<Profile | null>(null);
    const [isProfileReadonly, setProfileReadonly] = useState(true);

    const formErrors = useMemo(
      () => validateProfileErrors(profileEdits),
      [profileEdits],
    );

    const formErrorsList = useMemo(
      () =>
        formErrors.map((err) => (
          <Text
            key={err}
            text={t(err)}
            theme={TextTheme.ERROR}
            data-testid="EditableProfileCard.Error"
          />
        )),
      [formErrors, t],
    );

    useConditionalEffect(() => {
      if (!profileId) return;

      const fetchProfile = async () => {
        const profile = await dispatch(fetchProfileData(profileId)).unwrap();
        if (profile) setProfileEdits({ ...profile });
      };

      fetchProfile();
    }, [profileId, dispatch]);

    useEffect(() => {
      if (__PROJECT__ === 'storybook') {
        setProfileEdits(mockProfileData);
      }
    }, []);

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
    }, [formErrors.length, dispatch, profileEdits]);

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

    // const onChangeUsername = useCallback((username: string) => {
    //   setProfileEdits((edits) => ({ ...edits, username }));
    // }, []);

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
      <>
        {withHeader && (
          <ProfileCardHeader
            isReadonly={isProfileReadonly}
            isSaveAllowed={!formErrors.length}
            canEdit={canEdit}
            onEdit={onEditProfile}
            onCancel={onCancelEditProfile}
            onSave={onSaveEditsProfile}
          />
        )}
        {formErrors.length ? <div>{formErrorsList}</div> : null}
        <ProfileCard
          data={profileEdits}
          isLoading={isProfileLoading}
          error={profileError}
          isReadonly={isProfileReadonly}
          onChangeFirstname={onChangeFirstname}
          onChangeLastname={onChangeLastname}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          // onChangeUsername={onChangeUsername}
          onChangeAvatarUrl={onChangeAvatarUrl}
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
        />
      </>
    );
  },
);
