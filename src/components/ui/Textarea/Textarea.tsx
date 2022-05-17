import { styled } from '@/theme';

export const Textarea = styled('textarea', {
  border: '1px solid',
  borderColor: '$gray800',
  backgroundColor: '$700',
  color: '$gray500',
  fontSize: '$md',
  fontWeight: '500',
  paddingInline: '$md',
  paddingBlock: '$sm',
  borderRadius: '$sm',
  width: '100%',

  '&:focus': {
    outline: '1px solid',
    outlineOffset: '2px',
    outlineColor: '$gray200',
  },
});
