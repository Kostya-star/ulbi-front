import { Country, CountrySelect } from 'entities/CountrySelect';
import { Currency, CurrencySelect } from 'entities/CurrencySelect';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
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
  onChangeUsername: (username: string) => void;
  onChangeAvatarUrl: (avatarUrl: string) => void;
  onChangeCurrency: (currency: Currency) => void;
  onChangeCountry: (country: Country) => void;
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
  onChangeCurrency,
  onChangeCountry,
}) => {
  const { t } = useTranslation('profile');

  const mods = useMemo(() => ({
    [cls.editing]: !isReadonly,
  }), [isReadonly]);

  if (isLoading) {
    return (
      <div className={classNames(cls.ProfileCard, mods, [className, cls.loading])}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, mods, [className, cls.error])}>
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
    <div className={classNames(cls.ProfileCard, mods, [className])}>
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

      <CurrencySelect
        value={data?.currency}
        readonly={isReadonly}
        onChange={onChangeCurrency}
      />

      <CountrySelect
        value={data?.country}
        readonly={isReadonly}
        onChange={onChangeCountry}
      />
    </div>
  );
};
