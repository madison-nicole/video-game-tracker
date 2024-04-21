/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { searchGames } from '../actions';

function Results({ search }) {
  const results = useSelector((reduxState) => reduxState.search?.results);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // function for loading the individual game page
  const loadResult = (id) => {
    dispatch(searchGames(search, navigate));
  };

  function renderResults() {
    const resultItems = results.map((result) => {
      return <li key={result.id} title={result.name} onClick={() => loadResult(result.id)}> {result.name} </li>;
    });

    return resultItems;
  }

  if (!results) {
    return <div />;
  }

  return (
    <div>
      <ul className="results-list">
        {renderResults()}
      </ul>
    </div>
  );
}

export default Results;
