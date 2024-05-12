import React from 'react';
import { Grid, GridItem, Image } from '@chakra-ui/react';
import { useTrendingGames } from '../../hooks/redux-hooks';
import { getSpan, TILE_INDEX_TO_GAME_INDEX } from '../../utils/masonry-utils';

function TrendingGames() {
  const trending = useTrendingGames();

  function renderTrendingGames() {
    const renderedGames = [];

    for (let idx = 0; idx < 78; idx += 1) {
      const span = getSpan(idx);
      const gameIdx = TILE_INDEX_TO_GAME_INDEX[idx];
      const game = trending[gameIdx];
      if (game) {
        renderedGames.push(
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
          </GridItem>,
        );
      }
    }

    return renderedGames;
  }

  if (!trending) {
    return null;
  }

  return (
    <Grid gap={2} ml={16} mr={16} templateColumns="repeat(18, 1fr)" templateRows="repeat(18, 1fr)">
      {renderTrendingGames()}
    </Grid>
  );
}

export default TrendingGames;
