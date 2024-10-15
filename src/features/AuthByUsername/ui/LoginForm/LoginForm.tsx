import { memo, useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { useReduxReducerManager } from '@/shared/hooks/useReduxReducerManager/useReduxReducerManager';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Text, TextTheme } from '@/shared/ui/Text';

import cls from './LoginForm.module.scss';
import { getLoginState } from '../../model/selectors/getLoginState';
import { loginByUserName } from '../../model/services/loginByUserName/loginByUserName';
import { loginReducer } from '../../model/slice/loginSlice';

export interface LoginFormProps {
  className?: string;
  onSuccess?: () => void;
}

const asyncReducers = { login: loginReducer };

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  useReduxReducerManager(asyncReducers, true);
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const { isLoading = false, error = null } = useSelector(getLoginState);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitUserData = useCallback(async () => {
    const resp = await dispatch(loginByUserName({ username, password }));

    if (resp.meta.requestStatus === 'fulfilled') onSuccess?.();
  }, [password, username, onSuccess, dispatch]);

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text title={t('auth')} />
      {error && <Text text={t('wrong_auth_data')} theme={TextTheme.ERROR} />}

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
        {t('sign_in')}
      </Button>
    </div>
  );
});

export default LoginForm;
