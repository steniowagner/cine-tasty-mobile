import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

import { isEqualsOrLargerThanIphoneX } from '@utils';
import metrics from '@styles/metrics';

export const WRAPPER_HEIGHT =
  metrics.getWidthFromDP('18%') +
  (isEqualsOrLargerThanIphoneX() ? metrics.getWidthFromDP('8%') : 0);

export const Wrapper = styled(Animated.View)`
  width: ${({ theme }) => theme.metrics.width}px;
  height: ${WRAPPER_HEIGHT}px;
  position: absolute;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding-bottom: ${isEqualsOrLargerThanIphoneX() ? 30 : 0}px;
  bottom: 0px;
  right: 0px;
`;
