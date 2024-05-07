import React from 'react';
import {
  Flex, Tabs, TabList, Tab, TabPanels, TabPanel,
} from '@chakra-ui/react';
import UserGames from './user-games';
import UserProfileHeader from './user-profile-header';
import JumpToTop from '../jump-to-top';

function UserProfile({ user, username }) {
  return (
    <Flex direction="row">
      <UserProfileHeader username={username} />
      <Tabs colorScheme="gray" variant="soft-rounded">
        <TabList display="flex" justifyContent="center" margin={10}>
          <Tab cursor="pointer" fontSize={13.5} fontWeight={700}>GAMES</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserGames user={user} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <JumpToTop />
    </Flex>
  );
}

export default UserProfile;
