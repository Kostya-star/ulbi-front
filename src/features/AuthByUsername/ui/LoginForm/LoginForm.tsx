import { getLoginState } from 'features/AuthByUsername/model/selectors/getLoginState';
import {
  memo, useCallback, useEffect, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { loginByUserName } from '../../model/services/loginByUserName/loginByUserName';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string;
  onCloseModal?: () => void;
}

export const LoginForm = memo(({ className, onCloseModal }: LoginFormProps) => {
  const { t } = useTranslation();

  const { isLoading, error } = useSelector(getLoginState);
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitUserData = useCallback(async () => {
    // @ts-ignore FOR NOW!!!
    await dispatch(loginByUserName({ username, password })).unwrap();
    onCloseModal();
  }, [password, username, onCloseModal, dispatch]);

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text title={t('auth')} />
      {error && <Text text={error} theme={TextTheme.ERROR} />}

      <Input
        value={username}
        className={cls.input}
        placeholder={t('insert_name')}
        autofocus
        onChange={setUsername}
      />
      <Input
        value={password}
        className={cls.input}
        placeholder={t('insert_password')}
        onChange={setPassword}
      />

      <Button
        className={cls.signInBtn}
        disabled={isLoading}
        theme={ButtonTheme.OUTLINE}
        onClick={submitUserData}
      >
        { t('sign_in') }
      </Button>
    </div>
  );
});
