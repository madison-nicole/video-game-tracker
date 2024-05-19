import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram, faSquareXTwitter, faTwitch,
  faYoutube, faDiscord, faSteam,

} from '@fortawesome/free-brands-svg-icons';
import { Flex, IconButton } from '@chakra-ui/react';

function SocialIconButtons({ socials }) {
  // determine user socials

  if (!socials) {
    return null;
  }

  function renderSocialButtons() {
    return Object.entries(socials)?.map((entry) => {
      const social = entry[0];
      const url = entry[1];
      if (social === 'twitch') {
        return (
          <IconButton
            aria-label="twitch"
            cursor="pointer"
            icon={<FontAwesomeIcon icon={faTwitch} size="lg" />}
            src={url}
            variant="ghost"
          />
        );
      }
      if (social === 'instagram') {
        return (
          <IconButton
            aria-label="instagram"
            cursor="pointer"
            icon={<FontAwesomeIcon icon={faInstagram} size="lg" />}
            src={url}
            variant="ghost"
          />
        );
      }
      if (social === 'twitter') {
        return (
          <IconButton
            aria-label="twitter"
            cursor="pointer"
            icon={<FontAwesomeIcon icon={faSquareXTwitter} size="lg" />}
            src={url}
            variant="ghost"
          />
        );
      }
      if (social === 'youtube') {
        return (
          <IconButton
            aria-label="youtube"
            cursor="pointer"
            icon={<FontAwesomeIcon icon={faYoutube} size="lg" />}
            src={url}
            variant="ghost"
          />
        );
      }
      if (social === 'steam') {
        return (
          <IconButton
            aria-label="steam"
            cursor="pointer"
            icon={<FontAwesomeIcon icon={faSteam} size="lg" />}
            src={url}
            variant="ghost"
          />
        );
      }
      if (social === 'discord') {
        return (
          <IconButton
            aria-label="discord"
            cursor="pointer"
            icon={<FontAwesomeIcon icon={faDiscord} size="lg" />}
            src={url}
            variant="link"
          />
        );
      }
      return null;
    });
  }

  return (
    <Flex alignItems="center" direction="row" justifyContent="space-around">
      {renderSocialButtons()}
    </Flex>
  );
}

export default SocialIconButtons;
