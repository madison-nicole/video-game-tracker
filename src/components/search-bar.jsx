import React, { useEffect } from 'react';

import { useNavigate } from 'react-router';
import { searchGames } from '../actions';

function SearchBar() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('searching!');
    searchGames('Super Mario 64', navigate);
  }, [navigate]);

  return <div>Search bar here</div>;
}

export default SearchBar;
