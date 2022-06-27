import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';

export const RestartQuizButton = styled(TouchableOpacity).attrs(({theme}) => ({
  hitSlop: {
    top: theme.metrics.largeSize,
    bottom: theme.metrics.largeSize,
    left: theme.metrics.largeSize,
    right: theme.metrics.largeSize,
  },
}))`
  margin-right: ${({theme}) => theme.metrics.smallSize}px;
`;

export const ErrorWrapper = styled(View)`
  width: 100%;
  height: 90%;
  justify-content: center;
`;
