import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalCloseButton,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { signinUser, signupUser } from '../../actions';
import AuthModalButtons from './auth-modal-buttons';
import AuthModalInputs from '../auth-modal-inputs';

function AuthModal({
  isOpen, onClose, accountStatus, setAccountStatus, username, setUsername,
}) {
  // state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // to sign up a user
  const createUser = () => {
    dispatch(signupUser({ username, email, password }, navigate));
    onClose();
  };

  // to log in a user
  const loginUser = () => {
    dispatch(signinUser({ emailOrUsername: username, password }, navigate));
    onClose();
  };

  return (
    <div>
      <Modal blockScrollOnMount={false} isOpen={isOpen} scrollBehavior="inside" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> </ModalHeader>
          <ModalCloseButton />
          <AuthModalInputs account={accountStatus} email={email} password={password} setEmail={setEmail} setPassword={setPassword} setUsername={setUsername} username={username} />
          <ModalFooter>
            <AuthModalButtons account={accountStatus} logIn={loginUser} setAccount={setAccountStatus} signUp={createUser} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AuthModal;
