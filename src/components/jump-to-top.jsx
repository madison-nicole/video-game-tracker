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
      aria-label="Jump to top"
      colorScheme="pink"
      icon={<ArrowUpIcon />}
      style={{ display: visible ? 'inline' : 'none' }}
      variant="outline"
      onClick={scrollToTop}
    />
  );
}

export default JumpToTop;
