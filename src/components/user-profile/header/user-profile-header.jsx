import {
  Avatar, Button, Flex, Text,
} from '@chakra-ui/react';
import React from 'react';
import SocialIconButtons from './social-icon-buttons';

function UserProfileHeader({ userInfo }) {
  // store user data
  const following = 85;
  const followers = 550;
  const profileLink = 'linktr.ee/xgigglypuff';

  const username = userInfo?.username;

  return (
    <Flex alignItems="center" direction="row" justifyContent="flex-start" marginLeft="100px" marginRight="100px" marginTop="50px">
      <Avatar
        size="2xl"
        src="https://avatars.dicebear.com/api/male/username.svg"
      />
      <Flex alignItems="flex-start" direction="column" justifyContent="center" marginLeft="25px" marginRight="25px" width="250px">
        <Text fontSize="24px" fontWeight={700} marginTop="20px">
          {username}
        </Text>
        <Text fontSize="14px" marginTop="10px">
          insert user bio here
        </Text>
      </Flex>
      <Flex alignItems="flex-end" direction="column" justifyContent="flex-end" width="100%">
        <Text>
          {following} Following
        </Text>
        <Text>
          {followers} Followers
        </Text>
        <Button src={`https://${profileLink}`} variant="link">
          {profileLink}
        </Button>
        <SocialIconButtons />
      </Flex>
    </Flex>
  );
}

export default UserProfileHeader;
