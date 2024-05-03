import React from 'react';
import { ModalBody } from '@chakra-ui/react';
import isEmail from '../../utils/input-utils';
import AuthModalInput from './auth-modal-input';
import PasswordInput from './password-input';

function AuthModalInputs({
  email, username, password, setEmail, setPassword, account, setUsername,
}) {
  // check if input is username or email
  const emailOrUsername = (e) => {
    if (isEmail(e)) {
      setEmail(e);
    } else {
      setUsername(e);
    }
  };

  // if logging in (account already exists)
  if (account) {
    return (
      <ModalBody className="auth-form">
        <AuthModalInput placeholder="Email or Username" value={isEmail ? email : username} onChange={emailOrUsername} />
        <AuthModalInput placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </ModalBody>
    );
  } else {
    return (
      <ModalBody className="auth-form">
        <AuthModalInput placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <AuthModalInput placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <PasswordInput password={password} setPassword={setPassword} />
      </ModalBody>
    );
  }
}

export default AuthModalInputs;
