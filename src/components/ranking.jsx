import React from 'react';
import { CardHeader, Heading } from '@chakra-ui/react';

function Ranking({ index }) {
  return (
    <CardHeader>
      <Heading
        alignItems="center"
        className="number-rankings"
        color="#cccccc"
        colorScheme="lightgray"
        display="flex"
        fontSize={56}
        fontWeight={700}
        height="100%"
        justifyContent="center"
        size="lg"
        textAlign="center"
        width={20}
      >
        {index + 1}
      </Heading>
    </CardHeader>
  );
}

export default Ranking;
