import React, { useCallback } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Heading, Button,
  Text, Image, Stack, Divider, ButtonGroup,
  Card, CardBody, CardFooter,
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
  const rating = game?.rating.toFixed(2);

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
              <CardBody>
                <Image
                  alt="Game cover"
                  borderRadius="lg"
                  maxH="300px"
                  src={game.coverUrl}
                />
                <Stack mt="6" spacing="3">
                  <Text
                    fontSize="14px"
                    textAlign="center"
                  >
                    {game.summary}
                  </Text>
                  <Text
                    fontSize="2xl"
                    textAlign="center"
                  >
                    {rating} / 100
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
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
