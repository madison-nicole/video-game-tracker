import React, { useCallback } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
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
          <ModalHeader>
            <Heading size="md">{game.name}</Heading>
            <Text fontSize="2xl">
              *insert release year*
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Card maxW="sm">
              <CardBody>
                <Image
                  alt="Game cover"
                  borderRadius="lg"
                  src={game.cover}
                />
                <Stack mt="6" spacing="3">
                  <Text>
                    {game.summary}
                  </Text>
                  <Text fontSize="2xl">
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

          <ModalFooter>
            insert modal footer
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default GameCard;
