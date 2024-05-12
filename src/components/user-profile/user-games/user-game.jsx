import React from 'react';
import { Image, CardBody, Card } from '@chakra-ui/react';

function UserGame({ coverUrl, selectGame }) {
  return (
    <Card
      alignItems="center"
      cursor="pointer"
      justifyContent="center"
      maxW="fit-content"
      onClick={selectGame}
    >
      <CardBody padding="4px">
        <Image
          alt="Game cover"
          borderRadius="lg"
          maxH="200px"
          src={coverUrl}
        />
      </CardBody>
    </Card>
  );
}

export default UserGame;
