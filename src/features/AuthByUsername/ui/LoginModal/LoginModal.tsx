import { FC } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';

interface LoginModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal lazy isOpen={isOpen} onClose={onClose}>
      <LoginForm onCloseModal={onClose} />
    </Modal>
  );
};
