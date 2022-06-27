import {TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components/native';

export const DescriptionText = styled(Text)`
  font-size: ${({theme}) => theme.metrics.largeSize * 1.1}px;
  color: ${({theme}) => theme.colors.text};
  font-family: CircularStd-Book;
`;

export const ExpandableReadText = styled(Text)`
  font-size: ${({theme}) => theme.metrics.largeSize * 1.2}px;
  color: ${({theme}) => theme.colors.text};
  font-family: CircularStd-Black;
`;

export const ExpandableReadButton = styled(TouchableOpacity)`
  margin-top: ${({theme}) => theme.metrics.largeSize}px;
  align-self: flex-end;
`;
