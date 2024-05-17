import React from 'react';
import { Image, CardBody, Card } from '@chakra-ui/react';

function UserGame({ coverUrl, selectGame }) {
  return (
    <div className="gray-on-hover">
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
            transition="opacity 0.3s"
          />
        </CardBody>
      </Card>
    </div>
  );
}

export default UserGame;
