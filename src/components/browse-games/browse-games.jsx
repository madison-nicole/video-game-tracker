import React from 'react';
import {
  Tabs, TabList, TabPanels, Tab, TabPanel, Image,
} from '@chakra-ui/react';
import JumpToTop from '../jump-to-top';
import TopRatedList from './top-rated-list';
import { useTopRated, useTrendingGames } from '../../hooks/redux-hooks';

function BrowseGames(props) {
  // hooks
  const topRated = useTopRated(); // fetch the top 100 rated games
  const trending = useTrendingGames();

  function renderTrendingGames() {
    const renderedGames = trending.map((game, index) => {
      let maxH;
      switch (true) {
        case index < 5:
          maxH = 450;
          break;
        case index < 10:
          maxH = 300;
          break;
        case index < 20:
          maxH = 200;
          break;
        default:
          maxH = 140;
      }
      return (
        <Image
          alignItems="center"
          alt="game cover photo"
          borderRadius={6}
          borderStyle="solid"
          borderWidth={3}
          cursor="pointer"
          maxH={maxH}
          mb={3.5}
          mr={5}
          mt={3.5}
          objectFit="cover"
          src={game.box_art_url}
        />
      );
    });
    return renderedGames;
  }

  return (
    <div>
      <Tabs colorScheme="gray" variant="soft-rounded">
        <TabList display="flex" justifyContent="center" margin={10}>
          <Tab cursor="pointer" fontSize={13.5} fontWeight={700}>TRENDING</Tab>
          <Tab cursor="pointer" fontSize={13.5} fontWeight={700}>TOP RATED</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {renderTrendingGames()}
          </TabPanel>
          <TabPanel>
            <TopRatedList gamesData={topRated} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <JumpToTop />
    </div>
  );
}

export default BrowseGames;
