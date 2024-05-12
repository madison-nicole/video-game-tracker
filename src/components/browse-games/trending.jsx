import React from 'react';
import { Grid, GridItem, Image } from '@chakra-ui/react';
import { useTrendingGames } from '../../hooks/redux-hooks';

function pattern1(index) {
  if (index === 0) {
    return 6;
  }
  if (index === 1 || index === 2) {
    return 3;
  }
  if (index === 3 || index === 4) {
    return 6;
  }
  if (index > 4 && index <= 8) {
    return 3;
  }

  return 3;
}

function pattern2(index) {
  if (index <= 2) {
    return 2;
  }
  if (index === 3 || index === 4) {
    return 3;
  }
  if (index > 4 && index <= 7) {
    return 2;
  }
  if (index > 7 && index <= 11) {
    return 3;
  }
  if (index > 11 && index <= 14) {
    return 2;
  }
  return 2;
}

function getSpan(index) {
  // Pattern 1
  if (index < 9) {
    return pattern1(index);
  }
  if (index < 18) {
    return pattern1(index - 9);
  }
  if (index < 34) {
    return pattern2(index - 18);
  }
  if (index < 49) {
    return pattern2(index - 33);
  }
  if (index < 64) {
    return pattern2(index - 48);
  }
  if (index < 79) {
    return pattern2(index - 63);
  }

  return 2;
}

function TrendingGames(props) {
  const trending = useTrendingGames();

  function renderTrendingGames() {
    const renderedGames = trending.map((game, index) => {
      const span = getSpan(index);
      return (
        <GridItem colSpan={span} key={game.igdb_id} rowSpan={span}>
          <Image
            _hover={{
              cursor: 'pointer',
            }}
            alignItems="center"
            alt="game cover photo"
            borderStyle="solid"
            borderWidth={3}
            cursor="pointer"
            objectFit="cover"
            src={game.box_art_url}
          />
        </GridItem>
      );
    });
    return renderedGames;
  }

  return (
    <Grid gap={2} ml={16} mr={16} templateColumns="repeat(18, 1fr)" templateRows="repeat(18, 1fr)">
      {renderTrendingGames()}
    </Grid>
  );
}

export default TrendingGames;
