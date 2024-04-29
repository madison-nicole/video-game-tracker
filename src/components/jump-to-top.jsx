import React, { useState } from 'react';
import { IconButton } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';

function JumpToTop() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <IconButton
      _hover={{
        bg: 'pink.300',
      }}
      aria-label="Jump to top"
      bg="pink.400"
      borderRadius="6px"
      bottom={5}
      cursor="pointer"
      icon={<ArrowUpIcon />}
      left="96%"
      mb="20px"
      position="sticky"
      style={{ display: visible ? 'inline' : 'none' }}
      variant="solid"
      onClick={scrollToTop}
    />
  );
}

export default JumpToTop;
