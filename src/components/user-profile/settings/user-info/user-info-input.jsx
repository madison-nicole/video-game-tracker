import React, { useCallback, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Flex } from '@chakra-ui/react';
import EditableButtons from './editable-buttons';
import EditableUserInput from './editable-user-input';

function UserInfoInput({ currentValue, height }) {
  // hooks
//   const dispatch = useDispatch();

  // state
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState(currentValue);

  // display game title changes
  const onTextChange = (event) => {
    setText(event.target.value);
  };

  // update game card
  const onSave = useCallback(() => {
    setText(text);
    // dispatch(updateGame(selectedGame.id, navigate, title));
    setEditMode(false);
  }, [text]);

  // cancel edits with the cancel button
  const onCancel = useCallback(() => {
    // setText(selectedGame.title);
    setEditMode(false);
    setText(currentValue);
  }, [currentValue]);

  return (
    <Flex direction="row">
      <EditableUserInput currentValue={currentValue} editMode={editMode} height={height} setEditMode={setEditMode} text={text} onTextChange={onTextChange} />
      <EditableButtons editMode={editMode} setEditMode={setEditMode} onCancel={onCancel} onSave={onSave} />
    </Flex>
  );
}

export default UserInfoInput;
