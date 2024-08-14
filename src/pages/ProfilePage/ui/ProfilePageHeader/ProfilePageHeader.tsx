import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
  className?: string;
  isReadonly?: boolean;
  isSaveAllowed: boolean;
  onEdit?: () => void
  onCancel?: () => void
  onSave?: () => void
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = ({
  isReadonly,
  className,
  isSaveAllowed,
  onEdit,
  onCancel,
  onSave,
}) => {
  const { t } = useTranslation('profile');

  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t('profile')} />
      {
        isReadonly
          ? (
            <Button
              theme={ButtonTheme.OUTLINE}
              className={cls.editBtn}
              onClick={onEdit}
            >
              {t('edit_profile')}
            </Button>
          )
          : (
            <div className={cls.actions}>
              <Button
                theme={ButtonTheme.OUTLINE_RED}
                onClick={onCancel}
              >
                {t('cancel_edit_profile')}
              </Button>
              <Button
                theme={ButtonTheme.OUTLINE}
                disabled={!isSaveAllowed}
                onClick={onSave}
              >
                {t('save_edits_profile')}
              </Button>
            </div>
          )
      }
    </div>
  );
};
