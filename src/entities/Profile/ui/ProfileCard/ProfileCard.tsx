import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text } from 'shared/ui/Text/Text';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
}

export const ProfileCard: FC<ProfileCardProps> = ({ className }) => {
  const { t } = useTranslation('profile');
  const profile = useSelector(getProfileData);

  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.top}>
        <Text title={t('profile')} />
        <Button theme={ButtonTheme.OUTLINE} className={cls.editBtn}>{t('edit_profile')}</Button>
      </div>

      {/* <div className={cls.body}> */}
      <Input value={profile?.first} placeholder={t('profile_name')} />
      <Input value={profile?.lastname} placeholder={t('profile_last_name')} />
      {/* </div> */}
    </div>
  );
};
