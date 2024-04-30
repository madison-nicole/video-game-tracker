import React, { useCallback } from 'react';
import {
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text,
  IconButton, Progress,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { AddIcon, CheckCircleIcon } from '@chakra-ui/icons';
import JumpToTop from './jump-to-top';
import { selectGame } from '../actions';

function BrowseGames(props) {
  const dispatch = useDispatch();

  // fetch the top rated games
  const topRatedGames = useSelector((reduxState) => reduxState.igdb?.topRatedGames);
  const topRatedCovers = useSelector((reduxState) => reduxState.igdb?.topRatedCovers);

  // determine if the game is in your library
  const gameInLibrary = useSelector((reduxState) => reduxState.posts?.id);

  // determine variant for top rated game cards to alternate colors
  function determineCardColor(index) {
    if (index % 2 === 0) {
      return 'outline';
    } else {
      return 'filled';
    }
  }

  const onSelectGame = useCallback((game, coverUrl) => {
    dispatch(selectGame(game, coverUrl));
  }, [dispatch]);

  // render an add button if game is not added to library, else checkmark
  function renderAddButton() {
    // check if game is in your logged games library
    if (gameInLibrary) {
      return (
        <IconButton
          aria-label="Game is in your library"
          icon={<CheckCircleIcon />}
          variant="unstyled"
        />
      );
    } else {
      return (
        <IconButton
          aria-label="Add game to your games"
          icon={<AddIcon />}
          isRound
          size="md"
          variant="solid"
        />
      );
    }
  }

  // render the top rated games as horizontal cards
  function renderTopRatedGames() {
    const renderedGames = topRatedGames?.map((game, index) => {
      const coverUrl = `https:${topRatedCovers.get(game.cover)}`.replace('thumb', 'cover_big');
      const title = game.name;
      const { rating } = game;
      return (
        <Card
          direction={{ base: 'column', sm: 'row' }}
          key={game.id}
          ml={40}
          mr={40}
          overflow="hidden"
          variant={determineCardColor(index)}
        >
          <CardHeader>
            <Heading
              alignItems="center"
              className="number-rankings"
              color="#cccccc"
              colorScheme="lightgray"
              display="flex"
              fontSize={56}
              fontWeight={700}
              height="100%"
              justifyContent="center"
              size="lg"
              textAlign="center"
              width={20}
            >
              {index + 1}
            </Heading>
          </CardHeader>

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
            onClick={() => onSelectGame(game, coverUrl)}
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
              onClick={() => onSelectGame(game, coverUrl)}
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
                {rating.toFixed(2)}
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
            {renderAddButton()}
          </CardFooter>
        </Card>
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
          <TabPanel>insert trending here</TabPanel>
          <TabPanel>
            {renderTopRatedGames()}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <JumpToTop />
    </div>
  );
}

export default BrowseGames;
