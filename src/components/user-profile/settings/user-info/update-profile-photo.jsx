import React, { useRef, useState } from 'react';
import {
  InputGroup, Button, Flex, Center, Avatar,
  Stack, AvatarBadge, IconButton,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';

function UpdateProfilePhoto({ userInfo }) {
//   <img id="preview" alt="preview" src={img.preview} />
  // <input type="file" name="coverImage" onChange={onImageUpload} />

  // state
  const [img, setImg] = useState('');

  // upload new profile photo
  function handleUpload(event) {
    const file = event.target.files[0];
    // Get url of the file and set it to the src of preview
    if (file) {
      setImg({ preview: window.URL.createObjectURL(file), file });
    }
  }

  const inputRef = useRef(null);

  const handleUpdate = () => {
    inputRef.current?.click();
  };

  return (
    <Stack direction={['column', 'row']} spacing={6}>
      <Center>
        <Avatar
          size="xl"
          src={img.preview}
        >
          <AvatarBadge
            aria-label="remove Image"
            as={IconButton}
            colorScheme="pink"
            icon={<SmallCloseIcon />}
            rounded="full"
            size="sm"
            top="-10px"
          />
        </Avatar>
      </Center>
      <Flex alignItems="center" direction="row">
        <InputGroup onClick={handleUpdate}>
          <input
            accept="image/*"
            hidden
            ref={inputRef}
            type="file"
            onChange={handleUpload}
          />
          <Button
            fontSize="13.5px"
            fontWeight={700}
          >UPDATE
          </Button>
        </InputGroup>
      </Flex>
    </Stack>
  );
}

export default UpdateProfilePhoto;
