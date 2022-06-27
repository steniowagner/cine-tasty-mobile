import {ScrollView, FlatList} from 'react-native';
import styled from 'styled-components/native';

import {CONSTANTS} from '@utils';

export const ScrollViewSection = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    paddingLeft: CONSTANTS.VALUES.DEFAULT_SPACING,
  },
}))``;

export const FlatListSection = styled(FlatList).attrs(() => ({
  contentContainerStyle: {
    paddingLeft: CONSTANTS.VALUES.DEFAULT_SPACING,
  },
}))``;
