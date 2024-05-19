import React, { useCallback, useEffect, useState } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { selectGame } from '../../../actions';
import UserGame from './user-game';
import { useUserInfo } from '../../../hooks/redux-hooks';
import { getUserGames } from '../../../api/gamedex';

function UserGames() {
  // hooks
  const { username } = useParams();
  const dispatch = useDispatch();
  const [games, setGames] = useState([]);

  // load user games redux on profile load
  useEffect(() => {
    async function loadUserGames() {
      const userGames = await getUserGames(username);
      setGames(userGames);
    }
    loadUserGames();
  }, [dispatch, username]);

  // store user's saved games
  const userInfo = useUserInfo();

  // select game and fetch data
  const onSelectGame = useCallback((game) => {
    if (userInfo.username === username) {
      const userRating = userInfo?.games?.[game.id];
      const { coverUrl, releaseYear, avgRating } = game;
      dispatch(selectGame(game, coverUrl, releaseYear, avgRating, userRating));
    }
  }, [dispatch, userInfo?.games, userInfo.username, username]);

  if (!games) {
    return null;
  }

  const renderGame = games?.map((game) => {
    const { id } = game;

    return (
      <UserGame game={game} key={id} selectGame={() => onSelectGame(game)} username={username} />
    );
  });

  return (
    <SimpleGrid margin="10px 80px 20px 80px" spacing={2} templateColumns="repeat(auto-fill, minmax(150px, 1fr))">
      {renderGame}
    </SimpleGrid>
  );
}

export default UserGames;
