/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useRef, useState } from 'react';
import {
  Grid, GridItem, Image,
} from '@chakra-ui/react';
import { useTrendingGames } from '../../hooks/redux-hooks';
import { getSpan, TILE_INDEX_TO_GAME_INDEX } from '../../utils/masonry-utils';

function getGameStyles(gameIdx, hoveredIdx) {
  if (hoveredIdx === null) return null;

  if (hoveredIdx === gameIdx) {
    return {
      transform: 'scale(1.08)',
      saturate: '20%',
      zIndex: 20,
    };
  }

  return {
    zIndex: 0,
  };
}

function TrendingGames() {
  const [hoveredGameIdx, setHoveredGameIdx] = useState(null);
  const hoverTimeoutRef = useRef();
  const trending = useTrendingGames();

  console.log(trending);

  const onMouseEnterGridItem = useCallback((gameIdx) => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredGameIdx(gameIdx);
    }, 10);
  }, []);

  const onMouseLeaveGridItem = useCallback(() => {
    setHoveredGameIdx(null);
    clearTimeout(hoverTimeoutRef);
  }, []);

  function renderTrendingGames() {
    const renderedGames = [];

    for (let idx = 0; idx < 78; idx += 1) {
      const span = getSpan(idx);
      const gameIdx = TILE_INDEX_TO_GAME_INDEX[idx];
      const game = trending[gameIdx];

      const gameStyles = getGameStyles(gameIdx, hoveredGameIdx);

      if (game) {
        renderedGames.push(
          <GridItem
            colSpan={span}
            key={game.igdb_id}
            rowSpan={span}
            onMouseEnter={() => onMouseEnterGridItem(gameIdx)}
            onMouseLeave={onMouseLeaveGridItem}
          >
            <Image
              {...gameStyles}
              _hover={{
                cursor: 'pointer',
              }}
              alignItems="center"
              alt="game cover photo"
              borderStyle="solid"
              borderWidth={3}
              cursor="pointer"
              objectFit="cover"
              position="relative"
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
    <Grid gap={2} ml={56} mr={56} templateColumns="repeat(18, 1fr)" templateRows="repeat(18, 1fr)">
      {renderTrendingGames()}
    </Grid>
  );
}

export default TrendingGames;
