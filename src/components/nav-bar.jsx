// import React, { ReactNode } from 'react';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import {
  IconButton, Box, Flex, Avatar, Button,
  Menu, MenuButton, MenuList, MenuItem, MenuDivider,
  useColorModeValue, HStack, useColorMode, Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, BellIcon } from '@chakra-ui/icons';
import SearchBar from './search-bar';
import { signoutUser } from '../actions';
import { useAuthenticated, useSearchResultsPreview } from '../hooks/redux-hooks';

function NavBar({ onOpen, setAccountStatus }) {
  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const { colorMode, toggleColorMode } = useColorMode();
  const authenticated = useAuthenticated();
  const resultsPreview = useSearchResultsPreview();

  const signOut = () => {
    dispatch(signoutUser(navigate));
  };

  const handleSignUp = useCallback(() => {
    onOpen();
    setAccountStatus(false);
  }, [onOpen, setAccountStatus]);

  const handleLogIn = useCallback(() => {
    onOpen();
    setAccountStatus(true);
  }, [onOpen, setAccountStatus]);

  const handleBrowseGames = useCallback(() => {
    navigate('/browse');
  }, [navigate]);

  const handleHomeButton = useCallback(() => {
    navigate('/');
  }, [navigate]);

  // if signed in, render a different menu than new users
  function renderMenu() {
    if (authenticated) {
      return (
        <HStack variant="navButtonRow">
          <Flex alignItems="center">
            <HStack spacing={3}>
              <IconButton
                aria-label="View notifications"
                colorScheme="gray"
                icon={<BellIcon />}
                size="lg"
              />
            </HStack>
          </Flex>
          <Menu className="profile-menu">
            <MenuButton
              as={Button}
              cursor="pointer"
              minW={0}
              rounded="full"
              variant="link"
            >
              <Avatar
                size="sm"
                src="https://avatars.dicebear.com/api/male/username.svg"
              />
            </MenuButton>
            <MenuList alignItems="center">
              <br />
              <Center>
                <Avatar
                  size="2xl"
                  src="https://avatars.dicebear.com/api/male/username.svg"
                />
              </Center>
              <br />
              <Center>
                <p>Username</p>
              </Center>
              <br />
              <MenuDivider />
              <MenuItem>Your Profile</MenuItem>
              <MenuItem onClick={handleBrowseGames}>Browse Games</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem onClick={signOut}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      );
    } else {
      return (
        <HStack variant="navButtonRow">
          <Button variant="ghostBW" onClick={handleBrowseGames}>
            BROWSE GAMES
          </Button>
          <Button variant="ghostBW" onClick={handleLogIn}>
            LOG IN
          </Button>
          <Button variant="solidPink" onClick={handleSignUp}>
            SIGN UP
          </Button>
        </HStack>
      );
    }
  }

  // render a search bar when not on the home page
  function renderSearchBar() {
    if (location === '/') {
      return null;
    } else {
      return (
        <SearchBar gamesData={resultsPreview} />
      );
    }
  }

  return (
    <div className="home-nav-bar">
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex alignItems="center" h={16} justifyContent="space-between">
          <Flex justifyContent="flex-start" width="100%">
            <Button cursor="pointer" onClick={handleHomeButton}>insert logo here</Button>
          </Flex>

          <Flex alignItems="center" justifyContent="center" width="100%">
            {renderSearchBar()}
          </Flex>
          <Flex alignItems="center" justifyContent="flex-end" width="100%">
            <HStack spacing={3}>
              <Button id="light-dark-mode-button" onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              {renderMenu()}
            </HStack>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
}

export default NavBar;
