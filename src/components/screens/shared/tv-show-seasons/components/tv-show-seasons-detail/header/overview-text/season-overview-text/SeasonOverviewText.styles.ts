import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';

type WrapperStyleProps = {
  shouldShowReadMoreButton: boolean | undefined;
};

export const Wrapper = styled(View)<WrapperStyleProps>`
  opacity: ${({ shouldShowReadMoreButton }) => (typeof shouldShowReadMoreButton === 'boolean' ? 1 : 0)};
  align-items: flex-end;
`;

export const OverviewText = styled(Text)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('61%')}px;
  color: ${({ theme }) => theme.colors.text};
  margin-left: ${({ theme }) => theme.metrics.smallSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
`;

export const ReadMoreText = styled(Text)`
  color: ${({ theme }) => theme.colors.buttonText};
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
`;

export const ReadMoreButton = styled(TouchableOpacity)`
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;
