import {
  fetchProfileData, getProfileData, getProfileError, getProfileIsLoading, ProfileCard, profileReducer,
} from 'entities/Profile';
import { FC, useEffect } from 'react';
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

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  return (
    <div className={classNames('', {}, [className])}>
      <ProfilePageHeader />
      <ProfileCard
        data={profileData}
        isLoading={isProfileLoading}
        error={profileError}
      />
    </div>
  );
};

export default ProfilePage;
