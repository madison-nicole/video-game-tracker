import React, { useCallback, useEffect, useState } from 'react';
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
import {
  signUpSuccess, welcome, signInSuccess,
} from '../../utils/text-utils';
import isEmail from '../../utils/input-utils';
import { useAuthenticated } from '../../hooks/redux-hooks';
import { useOnKeyDown, ENTER_KEY } from '../../hooks/event-hooks';

function AuthModal({
  isOpen, onClose, accountStatus, setAccountStatus, username, setUsername,
}) {
  // state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailOrUsername, setEmailOrUsername] = useState('');

  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const authenticated = useAuthenticated();

  useEffect(() => {
    if (authenticated) {
      toast({
        position: 'top',
        title: signInSuccess,
        status: 'success',
        duration: 2500,
        isClosable: true,
      });
    }
  }, [authenticated, toast]);

  // to sign up a user
  const createUser = () => {
    if (!isEmail(email)) {
      // error!
    }

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
  const loginUser = useCallback(() => {
    dispatch(signinUser({ emailOrUsername, password }, navigate));
    onClose();
  }, [dispatch, emailOrUsername, navigate, onClose, password]);

  // also log in when the user presses enter
  const logInOnEnter = useOnKeyDown(loginUser, ENTER_KEY);

  // sign up when the user presses enter
  const signUpOnEnter = useOnKeyDown(createUser, ENTER_KEY);

  // if user is logged in successfully
  // toast({
  //   position: 'top',
  //   title: logInSuccess,
  //   status: 'success',
  //   duration: 3000,
  //   isClosable: true,
  // });

  return (
    <div>
      <Modal blockScrollOnMount={false} isOpen={isOpen} scrollBehavior="inside" onClose={onClose}>
        <ModalOverlay />
        <ModalContent marginTop="150px">
          <ModalHeader> </ModalHeader>
          <ModalCloseButton />
          <AuthModalInputs
            account={accountStatus}
            email={email}
            emailOrUsername={emailOrUsername}
            logInOnEnter={logInOnEnter}
            password={password}
            setEmail={setEmail}
            setEmailOrUsername={setEmailOrUsername}
            setPassword={setPassword}
            setUsername={setUsername}
            signUpOnEnter={signUpOnEnter}
            username={username}
          />
          <ModalFooter>
            <AuthModalButtons account={accountStatus} logIn={loginUser} setAccount={setAccountStatus} signUp={createUser} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AuthModal;
