// import React, { ReactNode } from 'react';
import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import {
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
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { signoutUser } from '../actions';

function NavBar({ onOpen, setAccountStatus }) {
  const authenticated = useSelector((reduxState) => reduxState.auth.authenticated);

  // function that signs out the user
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const { colorMode, toggleColorMode } = useColorMode(); // for dark and light mode
  // const { isOpenProfileBar, onOpenProfileBar, onCloseProfileBar } = useDisclosure(); // for opening and closing account modal

  // if signed in, render a different menu than new users
  function renderMenu() {
    if (authenticated) {
      return (
        <Menu className="profile-menu">
          <MenuButton
            as={Button}
            cursor="pointer"
            minW={0}
            rounded="full"
            variant="link"
            // onClick={onOpenProfileBar}
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
            <MenuItem>Settings</MenuItem>
            <MenuItem onClick={signOut}>Sign Out</MenuItem>
          </MenuList>
        </Menu>
      );
    } else {
      return (
        <Stack
          direction="row"
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          spacing={6}
        >
          <Button
            as="a"
            fontSize="sm"
            fontWeight={400}
            href="#"
            variant="link"
            onClick={handleLogIn}
          >
            Log In
          </Button>
          <Button
            _hover={{
              bg: 'pink.300',
            }}
            as="a"
            bg="pink.400"
            color="white"
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize="sm"
            fontWeight={600}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </Stack>
      );
    }
  }

  return (
    <div className="home-nav-bar">
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex alignItems="center" h={16} justifyContent="space-between">
          <Box>insert logo here</Box>

          <Flex alignItems="center">
            <Stack direction="row" spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              {renderMenu()}

            </Stack>
          </Flex>
        </Flex>
      </Box>
      <ul>
        {authenticated
          ? (<li className="auth-links" onClick={signOut}>Sign Out</li>)
          : null }

        <li><NavLink to="/">Games</NavLink></li>
        <li><NavLink to="/games/new">New Game</NavLink></li>
      </ul>
    </div>
  );
}

export default NavBar;
