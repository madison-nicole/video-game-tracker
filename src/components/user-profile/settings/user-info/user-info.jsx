import React from 'react';
import {
  Button, Flex, FormControl, FormLabel, Heading, Input, Stack,
  useColorModeValue, Avatar, AvatarBadge, IconButton, Center, Text,
  // Editable, EditablePreview, EditableInput,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import UserInfoInput from './user-info-input';

function UserInfoSettings({ user, username }) {
  // store data
  const email = user?.email;
  //   const password = user?.password;
  //   const avatar = user?.avatar;

  return (
    <Flex
      align="flex-start"
      bg={useColorModeValue('gray.50', 'gray.800')}
      justify="center"
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
        <Heading fontSize="24px" fontWeight={700} lineHeight={1.1}>
          User Information
        </Heading>
        <Flex alignItems="center" direction="row" justifyContent="space-between" width="70%">
          <Text fontWeight={600}>Username</Text>
          <UserInfoInput currentValue={username} />
        </Flex>
        <Flex alignItems="center" direction="row" justifyContent="space-between" width="70%">
          <Text fontWeight={600}>Email</Text>
          <UserInfoInput currentValue={email} />
        </Flex>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            _placeholder={{ color: 'gray.500' }}
            placeholder="password"
            type="password"
          />
        </FormControl>
        <FormControl id="ProfilePic">
          <FormLabel>Profile Picture</FormLabel>
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
        </FormControl>
        <Flex direction="row" justifyContent="flex-end">
          <Button
            variant="solidPink"
            w="10%"
          >
            SAVE
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
}

export default UserInfoSettings;
