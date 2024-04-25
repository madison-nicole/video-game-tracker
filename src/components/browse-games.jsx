import React from 'react';
import {
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Card, CardBody, CardFooter, Image, Stack, Heading, Text, // Button,
  IconButton, Progress,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { AddIcon, CheckCircleIcon } from '@chakra-ui/icons';

function BrowseGames(props) {
  // fetch the top rated games
  const topRated = useSelector((reduxState) => reduxState.search?.topRated);
  console.log(topRated);

  // determine if the game is in your library
  const gameInLibrary = useSelector((reduxState) => reduxState.posts?.id);
  console.log(gameInLibrary);
  console.log(useSelector((reduxState) => reduxState.posts));

  // determine variant for top rated game cards to alternate colors
  function determineCardColor(index) {
    if (index % 2 === 0) {
      return 'outline';
    } else {
      return 'filled';
    }
  }

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
          variant="solid"
        />
      );
    }
  }

  // render the top rated games as horizontal cards
  function renderTopRatedGames() {
    const topRatedGames = topRated?.map((game, index) => {
      // console.log(game.screenshots);
      return (
        <Card
          direction={{ base: 'column', sm: 'row' }}
          key={game.id}
          ml={40}
          mr={40}
          overflow="hidden"
          variant={determineCardColor(index)}
        >
          <Image
            alt="game cover photo"
            maxW={{ base: '100%', sm: '200px' }}
            objectFit="cover"
            src=""
          />

          <Stack>
            <CardBody>
              <Heading fontSize={18} size="md">{index + 1}. {game.name}</Heading>

              <Text fontSize={14} py="2">
                {Math.round(game.rating)}
              </Text>

              <Progress colorScheme="green" value={game.rating} />
            </CardBody>

            <CardFooter>
              {renderAddButton()}
            </CardFooter>
          </Stack>
        </Card>
      );
    });

    return topRatedGames;
  }

  return (
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
  );
}

export default BrowseGames;
