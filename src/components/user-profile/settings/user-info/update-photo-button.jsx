import React, { useRef } from 'react';
import { InputGroup, Button } from '@chakra-ui/react';

function UpdatePhotoButton({ setPhoto }) {
  const inputRef = useRef(null);

  // upload profile photo functionality
  const handleUpload = (e) => {
    if (e.target.files) {
      setPhoto(e.target.files?.[0]);
    }
  };

  const handleUpdate = () => {
    inputRef.current?.click();
  };

  return (
    <InputGroup onClick={handleUpdate}>
      <input
        accept="image/*"
        hidden
        ref={inputRef}
        type="file"
        onChange={handleUpload}
      />
      <Button>Update</Button>
    </InputGroup>
  );
}

export default UpdatePhotoButton;
