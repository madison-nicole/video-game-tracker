import React, { useCallback, useEffect, useState } from 'react';
import {
  Button, Flex, Stack, useColorModeValue, Text,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import UserInfoInput from './user-info-input';
import { useUserInfo } from '../../../../hooks/redux-hooks';
import uploadImage from '../../../../api/s3';
import UploadProfilePhoto from './update-profile-photo';
import { updateUser } from '../../../../actions';

function UserInfoSettings(props) {
  // hooks
  const userInfo = useUserInfo();
  const dispatch = useDispatch();

  // state
  const [username, setUsername] = useState(userInfo?.username);
  const [bio, setBio] = useState(userInfo?.bio ?? '');
  const [website, setWebsite] = useState(userInfo?.website ?? '');
  const [img, setImg] = useState('');

  // upload new profile photo
  const handleUpload = useCallback((e) => {
    const file = e.target.files[0];
    // Get url of the file and set it to the src of preview
    if (file) {
      setImg({ preview: window.URL.createObjectURL(file), file });
    }
  }, []);

  const onSaveUser = useCallback(async (e) => {
    e.preventDefault();

    // save new image url
    const avatarUrl = await uploadImage(img.file);

    const newUser = {
      ...userInfo,
      username,
      bio,
      website,
      avatarUrl,
    };
    dispatch(updateUser(userInfo.username, newUser));
  }, [bio, dispatch, img.file, userInfo, username, website]);

  // initialize user info fields
  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username);
      setBio(userInfo.bio ?? '');
      setWebsite(userInfo.website ?? '');
    }
  }, [userInfo]);

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
          <UserInfoInput defaultValue={userInfo.username} height="40px" setText={setUsername} text={username} />
        </Flex>
        <Flex alignItems="center" direction="row" justifyContent="flex-start" margin="0px 0px 30px 30px">
          <Text fontWeight={600} width="18%">Bio</Text>
          <UserInfoInput defaultValue={userInfo.bio} height="80px" setText={setBio} text={bio} />
        </Flex>
        <Flex alignItems="center" direction="row" justifyContent="flex-start" margin="0px 0px 50px 30px">
          <Text fontWeight={600} width="18%">Website</Text>
          <UserInfoInput defaultValue={userInfo.website} height="40px" setText={setWebsite} text={website} />
        </Flex>
        <Flex alignItems="center" direction="row" justifyContent="flex-start" margin="0px 0px 0px 30px">
          <Text fontWeight={600} marginBottom="30px" width="18%">Profile Picture</Text>
          <UploadProfilePhoto handleUpload={handleUpload} img={img} userInfo={userInfo} />
        </Flex>
        <Flex direction="row" justifyContent="flex-end">
          <Button
            leftIcon={<CheckIcon />}
            variant="solidPink"
            w="80px"
            onClick={onSaveUser}
          >
            SAVE
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
}

export default UserInfoSettings;
