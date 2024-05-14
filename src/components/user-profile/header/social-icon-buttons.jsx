import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram, faSquareXTwitter, faTwitch,
  faYoutube, faDiscord, faSteam,

} from '@fortawesome/free-brands-svg-icons';
import { Flex, IconButton } from '@chakra-ui/react';

function SocialIconButtons(props) {
  // determine user socials

  return (
    <Flex alignItems="center" direction="row" justifyContent="space-around">
      <IconButton
        aria-label="social media name"
        cursor="pointer"
        icon={<FontAwesomeIcon icon={faTwitch} size="lg" />}
        variant="ghost"
      />
      <IconButton
        aria-label="social media name"
        cursor="pointer"
        icon={<FontAwesomeIcon icon={faInstagram} size="lg" />}
        variant="ghost"
      />
      <IconButton
        aria-label="social media name"
        cursor="pointer"
        icon={<FontAwesomeIcon icon={faSquareXTwitter} size="lg" />}
        variant="ghost"
      />
      <IconButton
        aria-label="social media name"
        cursor="pointer"
        icon={<FontAwesomeIcon icon={faYoutube} size="lg" />}
        variant="ghost"
      />
      <IconButton
        aria-label="social media name"
        cursor="pointer"
        icon={<FontAwesomeIcon icon={faDiscord} size="lg" />}
        variant="ghost"
      />
      <IconButton
        aria-label="social media name"
        cursor="pointer"
        icon={<FontAwesomeIcon icon={faSteam} size="lg" />}
        variant="ghost"
      />
    </Flex>
  );
}

export default SocialIconButtons;
