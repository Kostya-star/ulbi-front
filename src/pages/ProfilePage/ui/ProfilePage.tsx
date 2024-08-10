import { fetchProfileData, ProfileCard, profileReducer } from 'entities/Profile';
import { FC, useEffect } from 'react';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { ReducersList, useReduxReducerManager } from 'shared/hooks/useReduxReducerManager/useReduxReducerManager';
import { classNames } from 'shared/lib/classNames/classNames';

const reducers: ReducersList = {
  profile: profileReducer,
};

interface ProfilePageProps {
  className?: string;
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  useReduxReducerManager(reducers, true);

  return (
    <div className={classNames('', {}, [className])}>
      <ProfileCard />
    </div>
  );
};

export default ProfilePage;
