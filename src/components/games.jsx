/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchGame, fetchGames, searchGames } from '../actions';

function Games(props) {
  const games = useSelector((reduxState) => reduxState.posts?.all);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchGames());
    console.log('search');
    dispatch(searchGames('Zelda'));
  }, [dispatch]);

  // function for loading the individual game page
  const loadGame = (id) => {
    dispatch(fetchGame(id, navigate));
  };

  function renderGames() {
    const gameItems = games.map((game, index) => {
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      return <div key={game.title + index} title={game.title} onClick={() => loadGame(game.id)}> {game.title} </div>;
    });

    return gameItems;
  }

  if (!games) {
    return <div />;
  }

  return (
    <div className="games-list">
      {renderGames()}
    </div>
  );
}

export default Games;
