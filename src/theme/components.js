import { defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
  variants: {
    solidPink: {
      _hover: {
        bg: 'pink.300',
      },
      as: 'a',
      bg: 'pink.400',
      className: 'new-user-homepage-menu-buttons',
      color: 'white',
      cursor: 'pointer',
      display: { base: 'none', md: 'inline-flex' },
      fontSize: 13.5,
      fontWeight: '700',
    },
    ghostBW: {
      _hover: {
        bg: 'gray.400',
      },
      as: 'a',
      className: 'new-user-homepage-menu-buttons',
      cursor: 'pointer',
      fontSize: 13.5,
      fontWeight: '700',
      variant: 'ghost',
    },
  },
});

export const HStack = defineStyleConfig({
  variants: {
    navButtonRow: {
      justify: 'flex-end',
      spacing: 3,
      flex: { base: 1, md: 0 },
    },
  },
});
