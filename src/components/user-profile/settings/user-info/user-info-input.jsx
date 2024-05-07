import React from 'react';
import {
  Editable, EditablePreview, Input, EditableInput,
} from '@chakra-ui/react';
import EditableControls from './editable-controls';

function UserInfoInput({ currentValue }) {
  // custom control
  <EditableControls />;

  return (
    <Editable
      defaultValue={currentValue}
      fontSize="2xl"
      isPreviewFocusable={false}
      textAlign="left"
    >
      <EditablePreview />
      {/* Here is the custom input */}
      <Input as={EditableInput} />
      <EditableControls />
    </Editable>
  );
}

export default UserInfoInput;
