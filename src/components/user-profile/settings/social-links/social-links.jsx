import React from 'react';
import {
  Button, Flex, Stack, useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
// import { useUserInfo } from '../../../../hooks/redux-hooks';
import UserInfoInput from '../user-info/user-info-input';

function SocialLinksSettings({ username }) {
  // store data
//   const userInfo = useUserInfo();
//   const links = userInfo.socials;

  // store links
  //   const twitchUrl = links.twitch;
  const twitchUrl = '';
  const twitterUrl = '';
  const instagramUrl = '';
  const steamUrl = '';
  const youtubeUrl = '';
  const discordUrl = '';

  return (
    <Flex align="flex-start"
      bg={useColorModeValue('gray.50', 'gray.800')}
      justify="center"
      marginTop="15px"
    >
      <Stack
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow="lg"
        margin={0}
        maxW="60%"
        p={6}
        rounded="lg"
        spacing={4}
        w="full"
      >
        <Flex alignItems="center" direction="row" justifyContent="flex-start" margin="10px 0px 30px 30px">
          <Text fontWeight={600} width="18%">Twitch</Text>
          <UserInfoInput currentValue={twitchUrl} height="40px" />
        </Flex>
        <Flex alignItems="center" direction="row" justifyContent="flex-start" margin="0px 0px 30px 30px">
          <Text fontWeight={600} width="18%">Instagram</Text>
          <UserInfoInput currentValue={instagramUrl} height="40px" />
        </Flex>
        <Flex alignItems="center" direction="row" justifyContent="flex-start" margin="0px 0px 30px 30px">
          <Text fontWeight={600} width="18%">Twitter</Text>
          <UserInfoInput currentValue={twitterUrl} height="40px" />
        </Flex>
        <Flex alignItems="center" direction="row" justifyContent="flex-start" margin="0px 0px 30px 30px">
          <Text fontWeight={600} width="18%">YouTube</Text>
          <UserInfoInput currentValue={youtubeUrl} height="40px" />
        </Flex>
        <Flex alignItems="center" direction="row" justifyContent="flex-start" margin="0px 0px 30px 30px">
          <Text fontWeight={600} width="18%">Steam</Text>
          <UserInfoInput currentValue={steamUrl} height="40px" />
        </Flex>
        <Flex alignItems="center" direction="row" justifyContent="flex-start" margin="0px 0px 50px 30px">
          <Text fontWeight={600} width="18%">Discord</Text>
          <UserInfoInput currentValue={discordUrl} height="40px" />
        </Flex>
        <Flex direction="row" justifyContent="flex-end">
          <Button
            leftIcon={<CheckIcon />}
            variant="solidPink"
            w="80px"
          >
            SAVE
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
}

export default SocialLinksSettings;
