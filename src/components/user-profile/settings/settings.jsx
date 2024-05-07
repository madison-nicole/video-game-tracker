import {
  Tab, Tabs, TabList, TabPanel, TabPanels,
} from '@chakra-ui/react';
import React from 'react';
import UserInfoSettings from './user-info/user-info';
import JumpToTop from '../../jump-to-top';

function Settings({ user, username }) {
  return (
    <>
      <Tabs colorScheme="gray" marginTop="75px" variant="soft-rounded">
        <TabList display="flex" justifyContent="center" margin={10}>
          <Tab cursor="pointer" fontSize={13.5} fontWeight={700}>EDIT PROFILE</Tab>
          <Tab cursor="pointer" fontSize={13.5} fontWeight={700}>ACCOUNT SETTINGS</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserInfoSettings user={user} username={username} />
          </TabPanel>
          <TabPanel>
            INSERT ACCOUNT SETTINGS HERE
          </TabPanel>
        </TabPanels>
      </Tabs>
      <JumpToTop />
    </>
  );
}

export default Settings;
