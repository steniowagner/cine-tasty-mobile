import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

export const ReloadButton = styled(TouchableOpacity).attrs(({theme}) => ({
  hitSlop: {
    top: theme.metrics.largeSize,
    bottom: theme.metrics.largeSize,
    left: theme.metrics.largeSize,
    right: theme.metrics.largeSize,
  },
}))`
  align-self: center;
  margin-top: ${({theme}) => theme.metrics.largeSize}px;
`;
