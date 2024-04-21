import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { IconButton, Input } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { searchGames } from '../actions';

function SearchBar({ search, setSearch }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    dispatch(searchGames(search, navigate));
  };

  return (
    <div className="search-bar">
      <Input
        placeholder="Search for a game"
        size="sm"
        type="text"
        variant="outline"
        width="-moz-min-content"
        onChange={(e) => setSearch(e.target.value)}
      />
      <IconButton
        aria-label="Search database"
        colorScheme="gray"
        icon={<Search2Icon />}
        isRound
        size="sm"
        onClick={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
