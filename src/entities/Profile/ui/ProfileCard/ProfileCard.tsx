import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Currency } from 'shared/const/common';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Select } from 'shared/ui/Select/Select';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
  data?: Profile | null;
  isLoading?: boolean;
  error?: string | null;
  isReadonly?: boolean;
  onChangeFirstname: (val: string) => void;
  onChangeLastname: (val: string) => void;
  onChangeAge: (age: string) => void;
  onChangeCity: (city: string) => void;
  onChangeUsername: (username: string) => void
  onChangeAvatarUrl: (avatarUrl: string) => void
}

export const ProfileCard: FC<ProfileCardProps> = ({
  data,
  isLoading,
  error,
  className,
  isReadonly,
  onChangeFirstname,
  onChangeLastname,
  onChangeAge,
  onChangeCity,
  onChangeUsername,
  onChangeAvatarUrl,
}) => {
  const { t } = useTranslation('profile');

  if (isLoading) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          title={t('profile_loading_error')}
          text={t('profile_refresh_page')}
          theme={TextTheme.ERROR}
          align={TextAlign.CENTER}
        />
      </div>
    );
  }

  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.avatarWrapper}>
        <Avatar src={data?.avatar} />
      </div>

      <Input
        value={data?.first || ''}
        placeholder={t('profile_name')}
        readonly={isReadonly}
        onChange={onChangeFirstname}
      />
      <Input
        value={data?.lastname || ''}
        placeholder={t('profile_last_name')}
        readonly={isReadonly}
        onChange={onChangeLastname}
      />
      <Input
        value={data?.age || ''}
        placeholder={t('profile_age')}
        readonly={isReadonly}
        onChange={onChangeAge}
      />
      <Input
        value={data?.city || ''}
        placeholder={t('profile_city')}
        readonly={isReadonly}
        onChange={onChangeCity}
      />
      <Input
        value={data?.username || ''}
        placeholder={t('profile_username')}
        readonly={isReadonly}
        onChange={onChangeUsername}
      />
      <Input
        value={data?.avatar || ''}
        placeholder={t('profile_avatar')}
        readonly={isReadonly}
        onChange={onChangeAvatarUrl}
      />

      <Select
        label='Curreny'
        options={[
          { value: Currency.EUR, text: Currency.EUR },
          { value: Currency.MD, text: Currency.MD },
          { value: Currency.RUB, text: Currency.RUB },
          { value: Currency.USD, text: Currency.USD },
        ]}
      />
    </div>
  );
};
