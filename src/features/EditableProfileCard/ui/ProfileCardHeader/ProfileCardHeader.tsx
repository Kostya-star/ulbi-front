import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import cls from './ProfileCardHeader.module.scss';

interface ProfileCardHeaderProps {
  className?: string;
  isReadonly?: boolean;
  isSaveAllowed: boolean;
  canEdit: boolean;
  onEdit?: () => void
  onCancel?: () => void
  onSave?: () => void
}

export const ProfileCardHeader: FC<ProfileCardHeaderProps> = ({
  isReadonly,
  className,
  isSaveAllowed,
  canEdit,
  onEdit,
  onCancel,
  onSave,
}) => {
  const { t } = useTranslation('profile');

  return (
    <HStack
      justifyContent='between'
      alignItems='center'
      className={classNames(cls.ProfilePageHeader, {}, [className])}
    >
      <Text title={t('profile')} />
      {
        // eslint-disable-next-line no-nested-ternary
        canEdit
          ? (
            isReadonly
              ? (
                <Button
                  data-testid='ProfileCardHeader.EditButton'
                  theme={ButtonTheme.OUTLINE}
                  onClick={onEdit}
                >
                  {t('edit_profile')}
                </Button>
              )
              : (
                <HStack gap='8'>
                  <Button
                    data-testid='ProfileCardHeader.CancelButton'
                    theme={ButtonTheme.OUTLINE_RED}
                    onClick={onCancel}
                  >
                    {t('cancel_edit_profile')}
                  </Button>
                  <Button
                    data-testid='ProfileCardHeader.SaveButton'
                    theme={ButtonTheme.OUTLINE}
                    disabled={!isSaveAllowed}
                    onClick={onSave}
                  >
                    {t('save_edits_profile')}
                  </Button>
                </HStack>
              ))
          : null
      }
    </HStack>
  );
};
