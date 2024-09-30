import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { ReducersList, useReduxReducerManager } from '@/shared/hooks/useReduxReducerManager/useReduxReducerManager';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import { profileReducer } from '@/features/EditableProfileCard/model/slices/profileSlice';

const reducers: ReducersList = {
  profile: profileReducer,
};

interface ProfilePageProps {
  className?: string;
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
  useReduxReducerManager(reducers, true);

  const { id: profileId } = useParams<{ id: string }>();

  return (
    <Page className={classNames('', {}, [className])}>
      <EditableProfileCard
        profileId={profileId}
        withHeader
      />
    </Page>
  );
};

export default memo(ProfilePage);
