import styled from 'styled-components/native';

import { Typography } from '@/components/common';
import { ThemeId } from '@/types';

export const DefaultText = styled(Typography.ExtraSmallText).attrs(
  ({ theme }) => ({
    color:
      theme.id === ThemeId.DARK
        ? theme.colors.subText
        : theme.colors.buttonText,
  }),
)``;
