import React from 'react';
import {
  Menu, MenuButton, Button, Avatar, MenuList, Center, MenuDivider, MenuItem,
} from '@chakra-ui/react';
import { useUserInfo } from '../../hooks/redux-hooks';

function NavProfileMenu({ handleBrowseGames, signOut }) {
  const userInfo = useUserInfo();
  const username = userInfo?.username;

  return (
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
          <p>{username}</p>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem>Your Profile</MenuItem>
        <MenuItem onClick={handleBrowseGames}>Browse Games</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem onClick={signOut}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default NavProfileMenu;
