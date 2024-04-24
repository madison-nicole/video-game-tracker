import React from 'react';
import {
  Tabs, TabList, TabPanels, Tab, TabPanel,
} from '@chakra-ui/react';

function BrowseGames(props) {
  return (
    <Tabs colorScheme="gray" variant="soft-rounded">
      <TabList display="flex" justifyContent="center" margin={10}>
        <Tab cursor="pointer" fontSize={13.5} fontWeight={700}>TRENDING</Tab>
        <Tab cursor="pointer" fontSize={13.5} fontWeight={700}>TOP RATED</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default BrowseGames;
