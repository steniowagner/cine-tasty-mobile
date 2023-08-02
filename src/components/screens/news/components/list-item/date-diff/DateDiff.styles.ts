import {Text} from 'react-native';
import styled from 'styled-components/native';

import {dark} from '@styles/themes';

export const DefaultText = styled(Text)`
  font-family: CircularStd-Medium;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  color: ${({theme}) =>
    theme.colors.background === dark.colors.background
      ? 'white'
      : theme.colors.buttonText};
`;
