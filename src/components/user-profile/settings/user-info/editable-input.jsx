import React from 'react';
import { Input } from '@chakra-ui/react';

function EditableUserInput({
  editMode, setEditMode, onTextChange, currentValue, text, height,
}) {
  if (editMode) {
    return (
      <Input
        alignItems="center"
        display="flex"
        focusBorderColor="#68d391"
        fontSize="14px"
        height={height}
        mr="5px"
        placeholder={currentValue}
        textAlign="left"
        value={text}
        variant="outline"
        width="500px"
      />
    );
  } else {
    return (
      <Input
        alignItems="center"
        color="#5f6774"
        cursor="default"
        defaultValue={currentValue}
        display="flex"
        fontSize="14px"
        height={height}
        isDisabled
        mr="5px"
        placeholder={currentValue}
        textAlign="left"
        value={text}
        variant="filled"
        width="500px"
        onChange={onTextChange}
        // onClick={setEditMode(true)}
      />
    );
  }
}

export default EditableUserInput;
