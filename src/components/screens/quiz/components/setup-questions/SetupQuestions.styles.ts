import {View, Text} from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: space-between;
  padding-horizontal: ${({theme}) => theme.metrics.mediumSize}px;
  padding-bottom: ${({theme}) => theme.metrics.getWidthFromDP('10%')}px;
`;

export const RoundedButtonWrapper = styled(View)`
  align-items: center;
`;

export const SectionWrapper = styled(View)`
  margin-top: ${({theme}) => theme.metrics.getWidthFromDP('8%')}px;
`;

export const SectionTitle = styled(Text)`
  margin-bottom: ${({theme}) => theme.metrics.mediumSize}px;
  font-size: ${({theme}) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Bold;
  color: ${({theme}) => theme.colors.text};
`;
