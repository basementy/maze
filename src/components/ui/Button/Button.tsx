import { styled } from '@/theme';

export const Button = styled('button', {
  border: '1px solid',

  minWidth: '100px',

  fontSize: '$md',
  fontWeight: '500',
  paddingInline: '$md',
  paddingBlock: '$sm',
  borderRadius: '$sm',
  cursor: 'pointer',

  '&:focus': {
    outline: '1.5px solid',
    outlineOffset: '2px',
    outlineColor: '$gray300',
  },

  '&:disabled': {
    cursor: 'not-allowed',
    opacity: '0.5',
  },

  variants: {
    variant: {
      primary: {
        borderColor: '$white',
        backgroundColor: '$white',
        color: '$gray900',
      },
      secondary: {
        borderColor: '$gray500',
        backgroundColor: '$transparent',
        color: '$gray300',

        '&:hover': {
          borderColor: '$gray300',
          color: '$gray100',
        },
      },
    },
  },
});
