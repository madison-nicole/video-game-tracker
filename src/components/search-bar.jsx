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
import { searchGames, searchGamesPreview } from '../actions';

function SearchBar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resultsPreview = useSelector((reduxState) => reduxState.igdb?.resultsPreview);
  const [search, setSearch] = useState('');
  const [resultsCache, setResultsCache] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearchPreview = useCallback(() => {
    dispatch(searchGamesPreview(search));
  }, [dispatch, search]);

  // create a new debounced search function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(handleSearchPreview, 100), [handleSearchPreview]);

  const onSearchButtonClick = useCallback(() => {
    dispatch(searchGames(search));
    navigate('/results');
    onClose();
  }, [dispatch, navigate, onClose, search]);

  // Search games when the user presses enter
  const onInputKeydown = useCallback((e) => {
    console.log(e);
    if (e.keyCode === 13) {
      onSearchButtonClick();
    }
  }, [onSearchButtonClick]);

  const onInputFocus = useCallback(() => {
    if (resultsCache.length > 0) {
      onOpen();
    }
  }, [onOpen, resultsCache.length]);

  useEffect(() => {
    debouncedSearch();
  }, [debouncedSearch]);

  useEffect(() => {
    // if we have results, open the popover, and update results cache
    if (resultsPreview?.length > 0) {
      setResultsCache(resultsPreview);
      onOpen();
      return;
    }

    // if the user has cleared the input, close the popover, and update results cache
    if (search?.length === 0) {
      setResultsCache(resultsPreview);
      onClose();
    }

    // otherwise, continue displaying the previous search results (stored in results cache)
  }, [onClose, onOpen, resultsPreview, search?.length]);

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
                onFocus={onInputFocus}
                onKeyDown={onInputKeydown}
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
          {resultsCache.map((result, idx) => {
            return <div key={`${result.id}`}>{result.name}</div>;
          })}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default SearchBar;
