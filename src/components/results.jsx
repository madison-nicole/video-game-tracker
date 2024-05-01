/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router';
import { selectGame } from '../actions';
import ResultsList from './results-list';

function Results({ search }) {
  const results = useSelector((reduxState) => reduxState.igdb?.results);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // function for loading the individual game page
  const onSelectGame = useCallback((game, coverUrl, year) => {
    dispatch(selectGame(game, coverUrl, year));
  }, [dispatch]);

  console.log(results);

  if (!results) {
    return <div />;
  }

  return (
    <div className="results-page">
      <ResultsList gamesData={results} onSelectGame={onSelectGame} />
    </div>
  );
}

export default Results;
