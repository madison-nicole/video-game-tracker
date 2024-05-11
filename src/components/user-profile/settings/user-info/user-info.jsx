import React from 'react';
import {
  Button, Flex, Stack, useColorModeValue, Avatar,
  AvatarBadge, IconButton, Center, Text,
  // Editable, EditablePreview, EditableInput,
} from '@chakra-ui/react';
import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons';
import UserInfoInput from './user-info-input';

function UserInfoSettings({ username }) {
  // store data

  const bio = 'insert bio here';
  const website = 'www.mylinks.com';

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
              <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                <AvatarBadge
                  aria-label="remove Image"
                  as={IconButton}
                  colorScheme="red"
                  icon={<SmallCloseIcon />}
                  rounded="full"
                  size="sm"
                  top="-10px"
                />
              </Avatar>
            </Center>
            <Flex alignItems="center" direction="row">
              <Button>Update</Button>
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
