import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { selectGame } from '../actions';
import ResultsList from './results-list';
import JumpToTop from './jump-to-top';
import { useSearchResults } from '../hooks/redux-hooks';

function Results({ search }) {
  // hooks
  const results = useSearchResults();
  const dispatch = useDispatch();

  // function for loading the individual game page
  const onSelectGame = useCallback((game, coverUrl, year) => {
    dispatch(selectGame(game, coverUrl, year));
  }, [dispatch]);

  if (!results) {
    return <div />;
  }

  return (
    <div className="results-page">
      <ResultsList gamesData={results} onSelectGame={onSelectGame} />
      <JumpToTop />
    </div>
  );
}

export default Results;
