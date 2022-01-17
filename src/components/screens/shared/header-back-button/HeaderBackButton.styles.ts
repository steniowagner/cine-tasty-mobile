import {TouchableOpacity, Platform} from 'react-native';
import styled from 'styled-components/native';

export const IconWrapper = styled(TouchableOpacity)`
  width: ${({theme}) => theme.metrics.getWidthFromDP('10%')}px;
  height: ${({theme}) => theme.metrics.getWidthFromDP('10%')}px;
  justify-content: center;
  align-items: center;
  margin-left: ${({theme}) =>
    Platform.select({
      android: theme.metrics.mediumSize,
      ios: theme.metrics.extraSmallSize,
    })}px;
  border-radius: ${({theme}) => theme.metrics.getWidthFromDP('5%')}px;
  background-color: rgba(0, 0, 0, 0.8);
`;
