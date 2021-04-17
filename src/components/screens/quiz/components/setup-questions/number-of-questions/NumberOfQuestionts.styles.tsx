import { View, Text } from 'react-native';
import styled from 'styled-components';

export const DefaultText = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Medium;
`;

export const NumberQuestionsWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
