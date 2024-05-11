import React, { useCallback, useEffect } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { fetchUserGames, selectGame } from '../../../actions';
import UserGame from './user-game';
import { useUserGames } from '../../../hooks/redux-hooks';

function UserGames({ username }) {
  // hooks
  const dispatch = useDispatch();

  // load user games redux on profile load
  useEffect(() => {
    if (username) {
      dispatch(fetchUserGames(username));
    }
  }, [dispatch, username]);

  // store user's saved games
  const games = useUserGames();

  // select game and fetch data
  const onSelectGame = useCallback((game, coverUrl, year) => {
    dispatch(selectGame(game, coverUrl, year));
  }, [dispatch]);

  if (!games) {
    return null;
  }

  const renderGame = games?.map((game) => {
    const { id, coverUrl, year } = game;

    return (
      <UserGame coverUrl={coverUrl} key={id} selectGame={() => onSelectGame(game, coverUrl, year)} />
    );
  });

  return (
    <SimpleGrid margin="10px 80px 20px 80px" spacing={2} templateColumns="repeat(auto-fill, minmax(150px, 1fr))">
      {renderGame}
    </SimpleGrid>
  );
}

export default UserGames;
