import React, { useCallback } from 'react';
import { Card, SimpleGrid } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { selectGame } from '../actions';
import UserGame from './user-game';

function UserGames(props) {
  // hooks
  const dispatch = useDispatch();

  // select game and fetch data
  const onSelectGame = useCallback((game, coverUrl, year) => {
    dispatch(selectGame(game, coverUrl, year));
  }, [dispatch]);

  return (
    <SimpleGrid marginBottom="40px" marginTop="40px" spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
      <Card onClick={() => onSelectGame(game, coverUrl, year)} />
      <UserGame coverUrl={game.coverUrl} />
      <Card />
      <Card>
        <UserGame />
      </Card>
    </SimpleGrid>
  );
}

export default UserGames;
