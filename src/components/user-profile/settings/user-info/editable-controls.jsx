/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  useEditableControls, ButtonGroup, IconButton, Flex,
} from '@chakra-ui/react';
import { CheckIcon, EditIcon, CloseIcon } from '@chakra-ui/icons';

function EditableControls(props) {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton icon={<EditIcon />} size="sm" {...getEditButtonProps()} />
    </Flex>
  );
}

export default EditableControls;
