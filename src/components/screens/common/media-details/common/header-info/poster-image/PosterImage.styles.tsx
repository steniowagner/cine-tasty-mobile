import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import {TMDBImage} from '@components';
import metrics from '@styles/metrics';

const DEFAULT_WIDTH = metrics.getWidthFromDP('70%');
const DEFAULT_HEIGHT = metrics.getHeightFromDP('50%');
const DEFAULT_BORDER_RADIUS = metrics.mediumSize;

export const FallbackImageWrapper = styled(Animated.View)`
  width: ${DEFAULT_WIDTH}px;
  height: ${DEFAULT_HEIGHT}
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  background-color: ${({theme}) => theme.colors.fallbackImageBackground};
`;

export const TMDBImageStyled = styled(TMDBImage)`
  width: ${DEFAULT_WIDTH}px;
  height: ${DEFAULT_HEIGHT}px;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
`;
