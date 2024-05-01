import React, { useCallback, useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton,
  Heading, Button,
  Text, Image, Stack, ButtonGroup,
  Card, CardBody, CardFooter,
  Slider, SliderTrack, SliderFilledTrack, SliderThumb,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { clearSelectedGame, addNewGame } from '../actions';

function GameCard({ openAuthModal, isOpenAuthModal }) {
  const dispatch = useDispatch();
  // Chakra modal setup
  const finalRef = React.useRef(null);

  // when clicking on to select an individual game from games
  const game = useSelector((reduxState) => reduxState.igdb?.selectedGame);

  // checking whether or not a user is signed in
  const authenticated = useSelector((reduxState) => reduxState.auth.authenticated);

  // store the game title and navigate for use in addNewGame function
  const title = game?.name;
  const navigate = useNavigate();

  // round the game rating to two decimal places
  const avgRating = game?.rating.toFixed(2);

  console.log(game?.release_dates);

  // set up user rating
  const [userRating, setUserRating] = useState(0);

  const onCloseGame = useCallback(() => {
    setUserRating(0);
    dispatch(clearSelectedGame());
  }, [dispatch]);

  if (!game) {
    return null;
  }

  function logGame(gameTitle, gameNavigate, gameRating) {
    // if not logged in
    if (!authenticated) {
      openAuthModal();
    // if no rating is made
    } else if (userRating === 0) {
      // store the game without a rating
      addNewGame(title, navigate);
      onCloseGame();
    } else {
      // if authenticated and rated, store all
      addNewGame(title, navigate, userRating);
      onCloseGame();
    }
  }

  return (
    <div>
      <Modal blockScrollOnMount={false}
        finalFocusRef={finalRef}
        isCentered
        isOpen
        scrollBehavior="inside"
        onClose={onCloseGame}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody padding="0px">
            <Card
              alignItems="center"
              display={isOpenAuthModal ? 'none' : 'flex'}
              flexDirection="column"
              justifyContent="center"
            >
              <ModalCloseButton />
              <Heading
                marginLeft="5px"
                marginTop="10px"
                size="md"
                textAlign="center"
              >
                {game.name}
              </Heading>
              <Text
                fontSize="12px"
                fontWeight={700}
                mt="10px"
                textAlign="center"
              >
                {game.year}
              </Text>
              <CardBody
                alignItems="center"
                display="flex"
                flexDir="column"
                paddingBottom="0px"
              >
                <Image
                  alt="Game cover"
                  borderRadius="lg"
                  maxH="280px"
                  src={game.coverUrl}
                />
                <Text
                  fontSize="12px"
                  fontWeight={700}
                  mt="5px"
                  textAlign="center"
                >
                  AVG RATING: {avgRating}
                </Text>
                <Stack mt="6" spacing="3">
                  <Text
                    fontSize="14px"
                    ml="15px"
                    mr="15px"
                    textAlign="center"
                  >
                    {game.summary}
                  </Text>
                  <Text
                    fontSize="12px"
                    fontWeight={700}
                    mt="5px"
                    textAlign="center"
                  >
                    MY RATING: {userRating}
                  </Text>
                  <Slider
                    aria-label="Your game rating"
                    colorScheme="green"
                    defaultValue={0}
                    onChange={(val) => setUserRating(val)}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Stack>
              </CardBody>
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button
                    _hover={{
                      bg: '#9ae6b4',
                    }}
                    bgColor="#68d391"
                    color="white"
                    cursor="pointer"
                    display={{ base: 'none', md: 'inline-flex' }}
                    fontSize={13.5}
                    fontWeight="700"
                    variant="solid"
                    onClick={() => logGame(title, navigate, userRating)}
                  >
                    ADD
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default GameCard;
