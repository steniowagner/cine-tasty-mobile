import {ScrollView} from 'react-native';
import styled from 'styled-components/native';

import {CONSTANTS} from '@utils';

export const Wrapper = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    paddingLeft: CONSTANTS.VALUES.DEFAULT_SPACING,
  },
}))`
  margin-bottom: ${({theme}) => theme.metrics.extraLargeSize}px;
`;
