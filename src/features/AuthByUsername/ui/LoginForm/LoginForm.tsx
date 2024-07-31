import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string;
}

export const LoginForm: FC<LoginFormProps> = ({ className }) => {
  const { t } = useTranslation();
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Input
        value={userName}
        className={cls.input}
        placeholder={t('insert_name')}
        autofocus
        onChange={setUserName}
      />
      <Input
        value={userPassword}
        className={cls.input}
        placeholder={t('insert_password')}
        onChange={setUserPassword}
      />

      <Button className={cls.signInBtn}>
        { t('sign_in') }
      </Button>
    </div>
  );
};
