import React, { useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import { UseDispatch, useNavigate } from 'react-redux';
import { signinUser } from '../actions';

function SignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = () => {
    dispatch(signinUser({ email, password }, navigate));
  };

  return (
    <div className="login-form">
      <Input
        placeholder="Email"
        size="sm"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        size="sm"
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button colorScheme="green" type="submit" onClick={loginUser}>Log In</Button>
    </div>
  );
}

export default SignIn;
