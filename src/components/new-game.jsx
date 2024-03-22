import React from 'react';
import { Button, Input } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addNewGame } from '../actions';

function NewGame(props) {
  const [value, setValue] = React.useState('');
  const handleChange = (event) => setValue(event.target.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
