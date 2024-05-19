import React from 'react';
import { ButtonGroup, IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

// show edit and delete buttons on game card hover
function ShowButtons({ display }) {
  return (
    <ButtonGroup
      alignItems="center"
      display={display ? 'flex' : 'none'}
      height="208px"
      justifyContent="center"
      position="absolute"
      width="158px"
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
