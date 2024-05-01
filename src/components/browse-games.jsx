import React from 'react';
import {
  Tabs, TabList, TabPanels, Tab, TabPanel,
} from '@chakra-ui/react';
import JumpToTop from './jump-to-top';
import TopRatedList from './top-rated-list';
import { useTopRated } from '../hooks/redux-hooks';

function BrowseGames({ onSelectGame }) {
  // hooks
  const topRated = useTopRated(); // fetch the top 100 rated games

  return (
    <div>
      <Tabs colorScheme="gray" variant="soft-rounded">
        <TabList display="flex" justifyContent="center" margin={10}>
          <Tab cursor="pointer" fontSize={13.5} fontWeight={700}>TRENDING</Tab>
          <Tab cursor="pointer" fontSize={13.5} fontWeight={700}>TOP RATED</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            insert trending here
          </TabPanel>
          <TabPanel>
            <TopRatedList gamesData={topRated} onSelectGame={onSelectGame} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <JumpToTop />
    </div>
  );
}

export default BrowseGames;
