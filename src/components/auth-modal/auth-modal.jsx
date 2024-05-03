import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalCloseButton,
  useToast,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { signinUser, signupUser } from '../../actions';
import AuthModalButtons from './auth-modal-buttons';
import AuthModalInputs from './auth-modal-inputs';
import { signUpSuccess, welcome, logInSuccess } from '../../utils/text-utils';

function AuthModal({
  isOpen, onClose, accountStatus, setAccountStatus, username, setUsername,
}) {
  // state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  // to sign up a user
  const createUser = () => {
    dispatch(signupUser({ username, email, password }, navigate));
    onClose();

    // if account is created successfully
    toast({
      position: 'top',
      title: signUpSuccess,
      description: welcome,
      status: 'success',
      duration: 4500,
      isClosable: true,
    });
  };

  // to log in a user
  const loginUser = () => {
    dispatch(signinUser({ emailOrUsername: username, password }, navigate));
    onClose();

    // if user is logged in successfully
    toast({
      position: 'top',
      title: logInSuccess,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <div>
      <Modal blockScrollOnMount={false} isOpen={isOpen} scrollBehavior="inside" onClose={onClose}>
        <ModalOverlay />
        <ModalContent marginTop="150px">
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
