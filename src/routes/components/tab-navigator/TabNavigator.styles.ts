import {View} from 'react-native';
import styled from 'styled-components/native';

import {isEqualsOrLargestThanIphoneX} from '@utils';
import metrics from '@styles/metrics';

export const WRAPPER_HEIGHT =
  metrics.getWidthFromDP('18%') + (isEqualsOrLargestThanIphoneX() ? 30 : 0);

export const Wrapper = styled(View)`
  width: ${({theme}) => theme.metrics.width}px;
  height: ${WRAPPER_HEIGHT}px;
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.secondary};
  padding-bottom: ${isEqualsOrLargestThanIphoneX() ? 30 : 0}px;
`;
