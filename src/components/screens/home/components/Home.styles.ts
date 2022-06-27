import {Platform, View} from 'react-native';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';

export const PopupAdviceWrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: ${Platform.select({
    android: metrics.getWidthFromDP('18%'),
    ios: metrics.getWidthFromDP('26%'),
  })}px;
`;
