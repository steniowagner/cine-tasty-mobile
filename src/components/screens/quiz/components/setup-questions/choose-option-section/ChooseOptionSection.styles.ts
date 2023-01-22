import {Text} from 'react-native';
import styled from 'styled-components/native';

export const Label = styled(Text)`
  margin-top: ${({theme}) => theme.metrics.getWidthFromDP('6.5%')}px;
  margin-bottom: ${({theme}) => theme.metrics.mediumSize}px;
  font-size: ${({theme}) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Bold;
  color: ${({theme}) => theme.colors.text};
`;
