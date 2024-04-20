import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { searchGames } from '../actions';

function SearchBar(props) {
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = dispatch(searchGames(search, navigate));

  return (
    <div className="search-bar">
      <input placeholder="Search for a game" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      <button type="submit" onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
