import {View, Text} from 'react-native';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';

export const DEFAULT_BORDER_RADIUS = metrics.smallSize;

export const Wrapper = styled(View)`
  width: ${({theme}) => theme.metrics.width}px;
  justify-content: center;
  align-items: center;
`;

export const CardWrapper = styled(View)`
  width: ${({theme}) => theme.metrics.getWidthFromDP('90%')}px;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  background-color: white;
`;

export const TextWrapper = styled(View)`
  align-items: center;
  padding: ${({theme}) => theme.metrics.extraLargeSize}px;
`;

export const QuestionsIndicatorText = styled(Text)`
  font-family: CircularStd-Bold;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  color: ${({theme}) => theme.colors.buttonText};
`;

export const QuestionText = styled(Text).attrs({
  numberOfLines: 4,
})`
  font-family: CircularStd-Bold;
  font-size: ${({theme}) => theme.metrics.extraLargeSize}px;
  margin-top: ${({theme}) => theme.metrics.largeSize}px;
  color: ${({theme}) => theme.colors.buttonText};
  text-align: center;
`;
