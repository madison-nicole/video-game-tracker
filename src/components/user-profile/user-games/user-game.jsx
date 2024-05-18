import React, { useState } from 'react';
import { Image, CardBody, Card } from '@chakra-ui/react';
import ShowButtons from './show-buttons';

function UserGame({ coverUrl, selectGame }) {
  // state to display hover buttons
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={(e) => {
        setHovered(true);
      }}
      onMouseLeave={(e) => {
        setHovered(false);
      }}
    >
      <ShowButtons display={hovered} />
      <Card
        alignItems="center"
        className={hovered ? 'gray-on-hover' : 'not-gray-on-hover'}
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
