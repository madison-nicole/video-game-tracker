import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { CheckIcon, AddIcon } from '@chakra-ui/icons';
import { useUserGames } from '../../hooks/redux-hooks';

function GameListButton({ onAdd, onEdit, id }) {
  // check if game is in your logged games library
  const userGames = useUserGames();
  const gameInLibrary = userGames.find((game) => Number(game.id) === id);

  // if game is logged, show a check button which can edit the entry
  if (gameInLibrary) {
    return (
      <IconButton
        aria-label="Game is in your library"
        color="#9ae6b4"
        fontSize="30px"
        fontWeight={800}
        icon={<CheckIcon />}
        isRound
        size="sm"
        variant="outline"
        onClick={onEdit}
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
