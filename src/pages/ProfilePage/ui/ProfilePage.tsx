import { FC, memo } from 'react';

import { useParams } from 'react-router-dom';

import { EditableProfileCard, profileReducer } from '@/features/EditableProfileCard';
import { ReducersList, useReduxReducerManager } from '@/shared/hooks/useReduxReducerManager/useReduxReducerManager';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

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
    <Page data-testid="ProfilePage" className={classNames('', {}, [className])}>
      <EditableProfileCard profileId={profileId} withHeader />
    </Page>
  );
};

export default memo(ProfilePage);
