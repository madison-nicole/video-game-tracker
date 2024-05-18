import React from 'react';
import {
  Flex, Tabs, TabList, Tab, TabPanels, TabPanel,
} from '@chakra-ui/react';
import UserGames from './user-games/user-games';
import UserProfileHeader from './header/user-profile-header';
import JumpToTop from '../jump-to-top';
import { useUserInfo } from '../../hooks/redux-hooks';

function UserProfile() {
  const userInfo = useUserInfo();

  return (
    <Flex direction="column">
      <UserProfileHeader userInfo={userInfo} />
      <Tabs colorScheme="gray" marginTop="75px" variant="soft-rounded">
        <TabList display="flex" justifyContent="center" margin={10}>
          <Tab cursor="pointer" fontSize={13.5} fontWeight={700}>GAMES</Tab>
          {/* <Tab cursor="pointer" fontSize={13.5} fontWeight={700}>STATS</Tab> */}
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserGames username={userInfo.username} />
          </TabPanel>
          {/* <TabPanel>
            INSERT STATS HERE
          </TabPanel> */}
        </TabPanels>
      </Tabs>
      <JumpToTop />
    </Flex>
  );
}

export default UserProfile;
