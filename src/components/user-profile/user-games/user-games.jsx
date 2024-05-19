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
  const { username: usernameParam } = useParams();
  const dispatch = useDispatch();
  const [games, setGames] = useState([]);

  // load user games redux on profile load
  useEffect(() => {
    async function loadUserGames() {
      const userGames = await getUserGames(usernameParam);
      console.log(userGames);
      setGames(userGames);
    }
    loadUserGames();
  }, [dispatch, usernameParam]);

  // browsing user
  const userInfo = useUserInfo();

  // own profile page or someone else's
  const isUserPage = userInfo.username === usernameParam;

  // select game and fetch data
  const onSelectGame = useCallback((game) => {
    if (isUserPage) {
      const userRating = userInfo?.games?.[game.id];
      const { coverUrl, releaseYear, avgRating } = game;
      dispatch(selectGame(game, coverUrl, releaseYear, avgRating, userRating));
    }
  }, [isUserPage, userInfo?.games, dispatch]);

  if (!games) {
    return null;
  }

  const renderGame = games?.map((game) => {
    const { id } = game;

    return (
      <UserGame game={game} isUserPage={isUserPage} key={id} selectGame={() => onSelectGame(game)} username={usernameParam} />
    );
  });

  return (
    <SimpleGrid margin="10px 80px 20px 80px" spacing={2} templateColumns="repeat(auto-fill, minmax(150px, 1fr))">
      {renderGame}
    </SimpleGrid>
  );
}

export default UserGames;
