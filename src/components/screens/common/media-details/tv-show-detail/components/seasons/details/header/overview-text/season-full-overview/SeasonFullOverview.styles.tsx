import {Text} from 'react-native';
import styled from 'styled-components/native';

export const FullOverviewText = styled(Text)`
  margin: ${({theme}) => theme.metrics.mediumSize}px;
  padding-bottom: ${({theme}) => theme.metrics.largeSize}px;
  color: ${({theme}) => theme.colors.buttonText};
  font-family: CircularStd-Book;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
`;
