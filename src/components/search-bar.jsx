import React, {
  useState, useCallback, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  IconButton,
  Input,
  useDisclosure,
  Popover,
  PopoverContent,
  PopoverAnchor,
  Flex,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

import { Search2Icon } from '@chakra-ui/icons';
import debounce from 'lodash.debounce';
import { searchGames } from '../actions';

function SearchBar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const results = useSelector((reduxState) => reduxState.igdb?.results);
  const [search, setSearch] = useState('');
  const [resultsCache, setResultsCache] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = useCallback(() => {
    dispatch(searchGames(search));
  }, [dispatch, search]);

  // create a new debounced search function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(handleSearch, 100), [handleSearch]);

  const onSearchButtonClick = useCallback(() => {
    handleSearch();
    onClose();
    navigate('/results');
  }, [handleSearch, navigate, onClose]);

  useEffect(() => {
    debouncedSearch();
  }, [debouncedSearch]);

  useEffect(() => {
    // if we have results, open the popover, and update results cache
    if (results?.length > 0) {
      setResultsCache(results);
      onOpen();
      return;
    }

    // if the user has cleared the input, close the popover, and update results cache
    if (search?.length === 0) {
      setResultsCache(results);
      onClose();
    }

    // otherwise, continue displaying the previous search results (stored in results cache)
  }, [onClose, onOpen, results, search?.length]);

  return (
    <div className="search-bar">
      <Popover autoFocus={false} closeOnBlur isOpen={isOpen} matchWidth onClose={onClose}>
        <PopoverAnchor>
          <Flex alignItems="center" pl="40px" pr="40px">
            <InputGroup>
              <Input
                minWidth="230px"
                ml="15px"
                placeholder="Search for a game"
                size="sm"
                type="text"
                variant="outline"
                width="-moz-min-content"
                onBlur={onClose}
                onChange={(e) => setSearch(e.target.value)}
              />
              <InputRightElement h="100%">
                <IconButton
                  aria-label="Search database"
                  colorScheme="gray"
                  h="90%"
                  icon={<Search2Icon />}
                  size="sm"
                  variant="ghost"
                  onClick={onSearchButtonClick}
                />
              </InputRightElement>
            </InputGroup>
          </Flex>
        </PopoverAnchor>
        <PopoverContent
          fontSize={14}
          width="385px"
        >
          {resultsCache.map((result) => {
            return <div key={result.id}>{result.name}</div>;
          })}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default SearchBar;
