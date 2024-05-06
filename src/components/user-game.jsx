import React from 'react';
import { Image, CardBody } from '@chakra-ui/react';

function UserGame({ coverUrl }) {
  return (
    <CardBody>
      <Image
        alt="Game cover"
        borderRadius="lg"
        maxH="280px"
        src={coverUrl}
      />
    </CardBody>
  );
}

export default UserGame;
