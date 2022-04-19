import {ScrollView, FlatList} from 'react-native';
import styled from 'styled-components/native';

import {CONSTANTS} from '@utils';

export const ScrollViewSection = styled(ScrollView)`
  padding-left: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

export const FlatListSection = styled(FlatList).attrs(() => ({
  contentContainerStyle: {
    paddingLeft: CONSTANTS.VALUES.DEFAULT_SPACING,
  },
}))``;
