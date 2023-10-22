import styled from 'styled-components/native';

import { Typography } from '..';

export const Wrapper = styled.TouchableOpacity`
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  padding-vertical: ${({ theme }) => theme.metrics.lg}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.metrics.width}px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const ButtonText = styled(Typography.SmallText).attrs(({ theme }) => ({
  color: theme.colors.buttonText,
  alignment: 'center',
}))`
  text-transform: uppercase;
`;
