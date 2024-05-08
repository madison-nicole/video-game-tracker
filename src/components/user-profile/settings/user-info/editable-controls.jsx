/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  useEditableControls, IconButton, Flex,
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
    <Flex justifyContent="flex-end" size="sm">
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
    </Flex>
  ) : (
    <Flex justifyContent="flex-end">
      <IconButton icon={<EditIcon />} size="sm" {...getEditButtonProps()} />
    </Flex>
  );
}

export default EditableControls;
