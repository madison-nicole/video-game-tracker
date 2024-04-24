// import React, { ReactNode } from 'react';
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import {
  IconButton,
  Box,
  Flex,
  Avatar,
  // Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  // useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';

import { MoonIcon, SunIcon, BellIcon } from '@chakra-ui/icons';
import SearchBar from './search-bar';
import { signoutUser } from '../actions';

function NavBar({ onOpen, setAccountStatus }) {
  const authenticated = useSelector((reduxState) => reduxState.auth.authenticated);

  // function that signs out the user
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname;

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

  const { colorMode, toggleColorMode } = useColorMode(); // for dark and light mode
  // const { isOpenProfileBar, onOpenProfileBar, onCloseProfileBar } = useDisclosure(); // for opening and closing account modal

  // if signed in, render a different menu than new users
  function renderMenu() {
    if (authenticated) {
      return (
        <Stack
          direction="row"
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          spacing={3}
        >
          <Flex alignItems="center">
            <Stack direction="row" spacing={3}>
              <IconButton
                aria-label="View notifications"
                colorScheme="gray"
                icon={<BellIcon />}
                size="lg"
              />
            </Stack>
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
        </Stack>
      );
    } else {
      return (
        <Stack
          direction="row"
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          spacing={3}
        >
          <Button
            _hover={{
              bg: 'gray.300',
            }}
            as="a"
            className="new-user-homepage-menu-buttons"
            cursor="pointer"
            fontSize={13.5}
            fontWeight="700"
            variant="ghost"
            onClick={handleBrowseGames}
          >
            BROWSE GAMES
          </Button>
          <Button
            _hover={{
              bg: 'gray.300',
            }}
            as="a"
            className="new-user-homepage-menu-buttons"
            cursor="pointer"
            fontSize={13.5}
            fontWeight="700"
            variant="ghost"
            onClick={handleLogIn}
          >
            LOG IN
          </Button>
          <Button
            _hover={{
              bg: 'pink.300',
            }}
            as="a"
            bg="pink.400"
            className="new-user-homepage-menu-buttons"
            color="white"
            cursor="pointer"
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={13.5}
            fontWeight="700"
            onClick={handleSignUp}
          >
            SIGN UP
          </Button>
        </Stack>
      );
    }
  }

  // render a search bar when not on the home page
  function renderSearchBar() {
    if (location === '/') {
      return null;
    } else {
      return (
        <SearchBar />
      );
    }
  }

  return (
    <div className="home-nav-bar">
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex alignItems="center" h={16} justifyContent="space-between">
          <Button cursor="pointer" onClick={handleHomeButton}>insert logo here</Button>

          {renderSearchBar()}

          <Flex alignItems="center">
            <Stack direction="row" spacing={3}>
              <Button id="light-dark-mode-button" onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              {renderMenu()}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
}

export default NavBar;
