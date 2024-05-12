import React, { useState } from 'react';
import {
  Button, Flex, Stack, useColorModeValue, Avatar,
  AvatarBadge, IconButton, Center, Text,
} from '@chakra-ui/react';
import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons';
import UserInfoInput from './user-info-input';
import { useUserInfo } from '../../../../hooks/redux-hooks';
// import UpdatePhotoButton from './update-photo-button';
import UploadProfilePhoto from './upload-profile-photo';

function UserInfoSettings(props) {
  // store data
  const userInfo = useUserInfo();

  // state
  const [photo, setPhoto] = useState('');
  console.log(photo);

  const {
    username, bio, website, avatarUrl,
  } = userInfo;

  // const bio = 'insert bio here';
  // const website = 'www.mylinks.com';
  // const avatarUrl = 'https://bit.ly/sage-adebayo';

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
          <Text fontWeight={600} width="18%">Username</Text>
          <UserInfoInput currentValue={username} height="40px" />
        </Flex>
        <Flex alignItems="center" direction="row" justifyContent="flex-start" margin="0px 0px 30px 30px">
          <Text fontWeight={600} width="18%">Bio</Text>
          <UserInfoInput currentValue={bio} height="80px" />
        </Flex>
        <Flex alignItems="center" direction="row" justifyContent="flex-start" margin="0px 0px 50px 30px">
          <Text fontWeight={600} width="18%">Website</Text>
          <UserInfoInput currentValue={website} height="40px" />
        </Flex>
        <Flex alignItems="center" direction="row" justifyContent="flex-start" margin="0px 0px 0px 30px">
          <Text fontWeight={600} marginBottom="30px" width="18%">Profile Picture</Text>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src={avatarUrl}>
                <AvatarBadge
                  aria-label="remove Image"
                  as={IconButton}
                  colorScheme="pink"
                  icon={<SmallCloseIcon />}
                  rounded="full"
                  size="sm"
                  top="-10px"
                />
              </Avatar>
            </Center>
            <Flex alignItems="center" direction="row">
              <UploadProfilePhoto setPhoto={setPhoto} />
              {/* <UpdatePhotoButton setPhoto={setPhoto} /> */}
            </Flex>
          </Stack>
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

export default UserInfoSettings;
