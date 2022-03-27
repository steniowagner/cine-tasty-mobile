import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';

import {CONSTANTS} from '@utils';

export const VideoListItemWrapper = styled(TouchableOpacity)`
  width: ${({theme}) => theme.metrics.getWidthFromDP('48%')}px;
  height: ${({theme}) => theme.metrics.getWidthFromDP('36%')}px;
  margin-right: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
  border-radius: ${({theme}) => theme.metrics.smallSize}px;
`;

export const IconWrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: ${({theme}) => theme.metrics.smallSize}px;
`;