import React, { useCallback } from 'react';
import { ModalBody, HStack } from '@chakra-ui/react';
import AuthModalInput from './auth-modal-input';
import PasswordInput from './password-input';
import VerifyInputIcon from './verify-input-icon';
import { isUsernameTaken } from '../../api/gamedex';

function AuthModalInputs({
  email, username, emailOrUsername, password, setEmail, setPassword,
  account, setUsername, setEmailOrUsername, logInOnEnter, signUpOnEnter,
}) {
  // check if username is taken
  const onUsernameBlur = useCallback(async () => {
    if (username.length > 0) {
      const isTaken = await isUsernameTaken(username);
      console.log(isTaken);
    }
  }, [username]);

  // if logging in (account already exists)
  if (account) {
    return (
      <ModalBody className="auth-form">
        <HStack>
          <AuthModalInput
            placeholder="Email or Username"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
          />
          <VerifyInputIcon />
        </HStack>
        <PasswordInput password={password} setPassword={setPassword} onEnter={logInOnEnter} />
      </ModalBody>
    );
  } else {
    return (
      <ModalBody className="auth-form">
        <AuthModalInput placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <AuthModalInput placeholder="Username" value={username} onBlur={onUsernameBlur} onChange={(e) => setUsername(e.target.value)} />
        <PasswordInput password={password} setPassword={setPassword} onEnter={signUpOnEnter} />
      </ModalBody>
    );
  }
}

export default AuthModalInputs;
