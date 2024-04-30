import React, { useCallback, useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton,
  Heading, Button,
  Text, Image, Stack, ButtonGroup,
  Card, CardBody, CardFooter,
  Slider, SliderTrack, SliderFilledTrack, SliderThumb,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedGame } from '../actions';

function GameCard(props) {
  const dispatch = useDispatch();
  // Chakra modal setup
  const finalRef = React.useRef(null);

  // when clicking on to select an individual game from games
  const game = useSelector((reduxState) => reduxState.igdb?.selectedGame);

  // round the game rating to two decimal places
  const avgRating = game?.rating.toFixed(2);

  // set up user rating
  const [userRating, setUserRating] = useState(0);

  const onCloseGame = useCallback(() => {
    dispatch(clearSelectedGame());
  }, [dispatch]);

  if (!game) {
    return null;
  }

  return (
    <div>
      <Modal blockScrollOnMount={false} finalFocusRef={finalRef} isCentered isOpen scrollBehavior="inside" onClose={onCloseGame}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody padding="0px">
            <Card
              alignItems="center"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <ModalCloseButton />
              <Heading
                marginTop="10px"
                size="md"
                textAlign="center"
              >
                {game.name}
              </Heading>
              <Text
                fontSize="12px"
                textAlign="center"
              >
                *insert release year*
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
                  <Slider aria-label="Your game rating" colorScheme="green" defaultValue={0} onChange={(val) => setUserRating(val)}>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Stack>
              </CardBody>
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button colorScheme="green" variant="solid">
                    Add
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
