import {
  Avatar, Flex, IconButton, Text,
} from '@chakra-ui/react';
import React from 'react';

function UserProfileHeader({ username }) {
  // store user data
  const following = 85;
  const followers = 550;
  const profileLink = 'https://linktr.ee/xgigglypuff';

  return (
    <Flex alignItems="flex-start" direction="column">
      <Avatar
        size="2xl"
        src="https://avatars.dicebear.com/api/male/username.svg"
      />
      <Flex direction="row" justifyContent="flex-start">
        <Text>
          {username}
        </Text>
        <Text>
          insert user bio here
        </Text>
      </Flex>
      <Flex alignItems="flex-end" direction="row" justifyContent="flex-start">
        <Text>
          {following} Following
        </Text>
        <Text>
          {followers} Followers
        </Text>
        <Text>
          {profileLink}
        </Text>
        <Flex alignItems="space-around" direction="column" justifyContent="center">
          <IconButton cursor="pointer" />
          <IconButton cursor="pointer" />
          <IconButton cursor="pointer" />
          <IconButton cursor="pointer" />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default UserProfileHeader;
