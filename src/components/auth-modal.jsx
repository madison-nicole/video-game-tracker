import React, { useState } from 'react';
import {
  Input, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { signinUser, signupUser } from '../actions';
import AuthModalButtons from './auth-modal-buttons';

function AuthModal({
  isOpen, onClose, accountStatus, setAccountStatus,
}) {
  // state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Chakra modal setup
  const finalRef = React.useRef(null);

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
            <AuthModalButtons account={accountStatus} login={loginUser} setAccount={setAccountStatus} signup={createUser} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AuthModal;
