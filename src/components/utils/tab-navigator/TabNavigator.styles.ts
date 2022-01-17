import {View} from 'react-native';
import styled from 'styled-components/native';

import isEqualsOrLargestThanIphoneX from '@utils/is-equals-or-largest-than-iphonex/isEqualsOrLargestThanIphoneX';

export const Wrapper = styled(View)`
  width: ${({theme}) => theme.metrics.width}px;
  height: ${({theme}) =>
    theme.metrics.getWidthFromDP('18%') +
    (isEqualsOrLargestThanIphoneX() ? 30 : 0)}px;
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.secondary};
  padding-bottom: ${isEqualsOrLargestThanIphoneX() ? 30 : 0}px;
`;
