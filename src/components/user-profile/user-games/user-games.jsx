import React, { useCallback } from 'react';
import { Card, SimpleGrid } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { selectGame } from '../../../actions';
import UserGame from './user-game';

function UserGames({ user }) {
  // hooks
  const dispatch = useDispatch();

  console.log(user);

  // store data
  const games = user?.games;

  console.log(games);

  // select game and fetch data
  const onSelectGame = useCallback((game, coverUrl, year) => {
    dispatch(selectGame(game, coverUrl, year));
  }, [dispatch]);

  const renderedGames = games?.map((game, index) => {
    const coverUrl = game?.coverUrl;
    const year = game?.year;

    return (
      <SimpleGrid marginBottom="40px" marginTop="40px" spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
        <Card cursor="pointer" onClick={() => onSelectGame(game, coverUrl, year)} />
        <UserGame coverUrl={coverUrl} />
        <Card />
      </SimpleGrid>
    );
  });

  return renderedGames;
}

export default UserGames;
