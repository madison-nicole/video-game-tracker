import React from 'react';
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
  useDisclosure,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

function GameCard(props) {
  // when clicking on to select an individual game from games
  const game = useSelector((reduxState) => reduxState.posts?.current);

  // Chakra modal setup
  const finalRef = React.useRef(null);

  // set up a hook to open and close game cover modal
  const { isOpenGame, onOpenGame, onCloseGame } = useDisclosure();
  console.log(onOpenGame);

  return (
    <div>
      <Modal blockScrollOnMount={false} finalFocusRef={finalRef} isCentered isOpen={isOpenGame} scrollBehavior="inside" onClose={onCloseGame}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Card maxW="sm">
              <CardBody>
                <Image
                  alt="Game cover"
                  borderRadius="lg"
                  src={game.screenshot.url}
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{game.name}</Heading>
                  <Text>
                    Insert a game description here.
                  </Text>
                  <Text color="blue.600" fontSize="2xl">
                    $450
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
