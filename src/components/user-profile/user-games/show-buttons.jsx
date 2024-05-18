import React from 'react';
import { ButtonGroup, IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

// show edit and delete buttons on game card hover
function ShowButtons({ display }) {
  console.log(display);

  return (
    <ButtonGroup
      display={display ? 'block' : 'none'}
      position="absolute"
      zIndex={3}
    >
      <IconButton
        aria-label="Edit the saved game entry"
        icon={<EditIcon />}
        isRound
        variant="ghost"
      />
      <IconButton
        aria-label="Delete the saved game entry"
        icon={<DeleteIcon />}
        isRound
        variant="ghost"
      />
    </ButtonGroup>
  );
}

export default ShowButtons;
