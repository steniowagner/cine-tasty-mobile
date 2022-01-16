import { Text, View } from 'react-native';
import styled from 'styled-components';

export const ContentWrapper = styled(View)`
  width: 100%;
`;

export const ReviewsText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('6%')}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const AuthorText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.subText};
`;

export const Separator = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('0.5%')}px;
  margin-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.contrast};
`;
