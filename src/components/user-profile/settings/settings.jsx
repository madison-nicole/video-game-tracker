import {
  Tab, Tabs, TabList, TabPanel, TabPanels, Heading, Flex,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import UserInfoSettings from './user-info/user-info';
import JumpToTop from '../../jump-to-top';
import { getUserInfo } from '../../../actions';

function Settings({ user, username }) {
  // hooks
  const dispatch = useDispatch();

  // load user info to redux on profile load
  useEffect(() => {
    if (username) {
      dispatch(getUserInfo(username));
    }
  }, [dispatch, username]);

  return (
    <>
      <Tabs colorScheme="gray" marginTop="75px" variant="soft-rounded">
        <TabList display="flex" justifyContent="center" margin={10}>
          <Tab cursor="pointer" fontSize={13.5} fontWeight={700}>EDIT PROFILE</Tab>
          <Tab cursor="pointer" fontSize={13.5} fontWeight={700}>ACCOUNT SETTINGS</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex justify="center">
              <Heading fontSize="17px" fontWeight={700} maxW="60%" textAlign="left">
                USER INFORMATION
              </Heading>
            </Flex>
            <UserInfoSettings username={username} />
            <Flex justify="center" marginTop="60px">
              <Heading fontSize="17px" fontWeight={700} maxW="60%" textAlign="left">
                SOCIAL LINKS
              </Heading>
            </Flex>
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
