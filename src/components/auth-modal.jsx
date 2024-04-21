import React, { useState } from 'react';
import {
  Button, Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { signinUser, signupUser } from '../actions';

function AuthModal({
  isOpen, onClose, accountStatus, setAccountStatus,
}) {
  // Chakra modal setup
  const finalRef = React.useRef(null);

  // set prompt text for buttons
  const signUpPrompt = 'Don\'t have an account? Sign Up.';
  const signInPrompt = 'Already a user? Log in.';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // to sign up a user
  const createUser = () => {
    dispatch(signupUser({ email, password }, navigate));
    onClose();
  };

  // to log in a user
  const loginUser = () => {
    dispatch(signinUser({ email, password }, navigate));
    onClose();
  };

  // a function to render modal buttons according to sign up / sign in
  function renderModalButtons() {
    if (accountStatus) {
      return (
        <div className="auth-buttons">
          <Button colorScheme="green" type="submit" onClick={loginUser}>Log In</Button>
          <Button colorScheme="gray" fontSize="small" variant="link" onClick={() => setAccountStatus(false)}>{signUpPrompt}</Button>
        </div>
      );
    } else {
      return (
        <div className="auth-buttons">
          <Button colorScheme="green" type="submit" onClick={createUser}>Sign Up</Button>
          <Button colorScheme="gray" fontSize="small" variant="link" onClick={() => setAccountStatus(true)}>{signInPrompt}</Button>
        </div>
      );
    }
  }

  return (
    <div>
      <Modal blockScrollOnMount={false} finalFocusRef={finalRef} isOpen={isOpen} scrollBehavior="inside" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="auth-form">
            <Input
              className="auth-input"
              placeholder="Email"
              size="sm"
              type="text"
              value={email}
              width="-moz-fit-content"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              className="auth-input"
              placeholder="Password"
              size="sm"
              type="text"
              value={password}
              width="-moz-fit-content"
              onChange={(e) => setPassword(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            {renderModalButtons()}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AuthModal;
