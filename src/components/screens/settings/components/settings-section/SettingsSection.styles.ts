import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';

export const Wrapper = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
`;

export const SectionTitle = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const SectionDescription = styled(Text)`
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.subText};
`;

export const TextWrapper = styled(View)`
  width: 85%;
`;
