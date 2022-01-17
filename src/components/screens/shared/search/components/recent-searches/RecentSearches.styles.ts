import {Text} from 'react-native';
import styled from 'styled-components/native';

export const RecentText = styled(Text)`
  margin-bottom: ${({theme}) => theme.metrics.extraLargeSize}px;
  font-size: ${({theme}) => theme.metrics.extraLargeSize}px;
  color: ${({theme}) => theme.colors.text};
  font-family: CircularStd-Bold;
`;
