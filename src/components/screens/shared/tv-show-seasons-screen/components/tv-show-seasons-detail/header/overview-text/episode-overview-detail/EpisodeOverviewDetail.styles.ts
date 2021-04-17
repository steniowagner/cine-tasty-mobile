import { Text, View } from 'react-native';
import styled from 'styled-components';

export const Wrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('85%')}px;
  max-height: ${({ theme }) => theme.metrics.getHeightFromDP('70%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: white;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

export const DescriptionText = styled(Text)`
  padding-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.1}px;
  color: ${({ theme }) => theme.colors.buttonText};
  font-family: CircularStd-Book;
`;
