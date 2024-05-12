import React from 'react';
import { Button, Input } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addNewGame } from '../actions';

function NewGame(props) {
  // state
  const [value, setValue] = React.useState('');

  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => setValue(event.target.value);

  const addGame = () => {
    dispatch(addNewGame(value, navigate));
  };

  return (
    <div className="new-game-bar">
      <div className="new-game-input">
        <Input
          placeholder="Enter new game title here..."
          size="sm"
          value={value}
          onChange={handleChange}
        />
      </div>
      <Button colorScheme="green" onClick={addGame}>Add</Button>
    </div>
  );
}

export default NewGame;
