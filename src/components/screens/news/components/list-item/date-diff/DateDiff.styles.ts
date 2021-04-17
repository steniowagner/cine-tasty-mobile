import { Text } from 'react-native';
import styled from 'styled-components';

import * as Types from '@local-types';

export const DefaultText = styled(Text)`
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => (theme.id === Types.ThemeId.DARK ? 'white' : theme.colors.buttonText)};
`;
