import React, { useCallback } from 'react';
import {
  Tabs, TabList, TabPanels, Tab, TabPanel,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import JumpToTop from './jump-to-top';
import { selectGame } from '../actions';
import TopRatedList from './top-rated-list';

function BrowseGames(props) {
  const dispatch = useDispatch();

  // fetch the top 100 rated games
  const topRated = useSelector((reduxState) => reduxState.igdb?.topRated);

  const onSelectGame = useCallback((game, coverUrl, year) => {
    dispatch(selectGame(game, coverUrl, year));
  }, [dispatch]);

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
