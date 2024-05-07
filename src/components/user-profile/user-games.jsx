import React, { useCallback } from 'react';
import { Card, SimpleGrid } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { selectGame } from '../../actions';
import UserGame from './user-game';

function UserGames({ user }) {
  // hooks
  const dispatch = useDispatch();

  // store data
  const { games } = user;

  // select game and fetch data
  const onSelectGame = useCallback((game, coverUrl, year) => {
    dispatch(selectGame(game, coverUrl, year));
  }, [dispatch]);

  const renderedGames = games?.map((game, index) => {
    console.log('cover url');
    console.log(game.coverUrl);
    // const year = years[game?.release_dates?.[0]];
    const year = '1995';
    // const title = game.name?.toUpperCase();

    return (
      <SimpleGrid marginBottom="40px" marginTop="40px" spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
        <Card onClick={() => onSelectGame(game, game.coverUrl, year)} />
        <UserGame coverUrl={game.coverUrl} />
        <Card />
        <Card>
          {renderedGames()}
          <UserGame cover={game.coverUrl} />
        </Card>
      </SimpleGrid>
    );
  });
}

export default UserGames;
