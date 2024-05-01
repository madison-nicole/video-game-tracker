import React from 'react';

import {
  Card, CardBody, CardFooter, Image, Stack, Heading, Text,
  Progress,
} from '@chakra-ui/react';
import alternateCardColor from '../utils/style-utils';
import GameListButton from './game-list-button';
import Ranking from './ranking';

function TopRatedList({ gamesData, onSelectGame }) {
  const { games, covers, years } = gamesData;

  const renderedGames = games?.map((game, index) => {
    const coverUrl = `https:${covers.get(game.cover)}`.replace('thumb', 'cover_big');
    const year = years?.get(game?.release_dates?.[0]);
    const title = game.name;
    const { rating } = game;
    return (
      <Card
        direction={{ base: 'column', sm: 'row' }}
        key={game.id}
        ml={40}
        mr={40}
        overflow="hidden"
        variant={alternateCardColor(index)}
      >
        <Ranking index={index} />

        <Image
          alignItems="center"
          alt="game cover photo"
          borderRadius={6}
          borderStyle="solid"
          borderWidth={3}
          cursor="pointer"
          maxH="140px"
          mb={3.5}
          mr={5}
          mt={3.5}
          objectFit="cover"
          src={coverUrl}
          onClick={() => onSelectGame(game, coverUrl, year)}
        />

        <CardBody
          display="flex"
          flexDirection="row"
          padding="0px"
        >
          <Heading
            alignItems="center"
            cursor="pointer"
            display="flex"
            fontSize={18}
            fontWeight="700"
            width="100%"
            onClick={() => onSelectGame(game, coverUrl, year)}
          >
            {title.toUpperCase()}
          </Heading>

          <Stack
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mb="40px"
            ml="25px"
            mr="50px"
            width="80%"
          >
            <Text
              fontSize={18}
              fontWeight={700}
              mt="25px"
              py="2"
              textAlign="right"
            >
              {rating?.toFixed(2)}
            </Text>

            <Progress
              colorScheme="green"
              value={game.rating}
            />
          </Stack>
        </CardBody>

        <CardFooter
          alignItems="center"
          display="flex"
          justifyContent="flex-end"
          mr="20px"
        >
          <GameListButton onAdd={() => onSelectGame(game, coverUrl, year)} />
        </CardFooter>
      </Card>
    );
  });

  return renderedGames;
}

export default TopRatedList;
