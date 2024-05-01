import React from 'react';
import { useSelector } from 'react-redux';
import { IconButton } from '@chakra-ui/react';
import { CheckCircleIcon, AddIcon } from '@chakra-ui/icons';

function GameListButton({ onAdd }) {
  // check if game is in your logged games library
  const gameInLibrary = useSelector((reduxState) => reduxState.posts?.id);

  // if game is logged, show a check button which can edit the entry
  if (gameInLibrary) {
    return (
      <IconButton
        aria-label="Game is in your library"
        icon={<CheckCircleIcon />}
        variant="unstyled"
      />
    );
    // else show a plus button to add the game to your gamedex
  } else {
    return (
      <IconButton
        aria-label="Add game to your games"
        cursor="pointer"
        fontSize="10px"
        fontWeight={800}
        icon={<AddIcon />}
        isRound
        size="sm"
        variant="outline"
        onClick={onAdd}
      />
    );
  }
}

export default GameListButton;
