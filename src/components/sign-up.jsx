import React, { useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import { useDispatch, useNavigate } from 'react-redux';
import { signupUser } from '../actions';

function SignUp(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createUser = () => {
    dispatch(signupUser({ email, password }, navigate));
  };

  return (
    <div className="signup-form">
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
      <Button colorScheme="green" type="submit" onClick={createUser}>Sign Up</Button>
    </div>
  );
}

export default SignUp;
