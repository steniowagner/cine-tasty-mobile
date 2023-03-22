import {StyleSheet, Text} from 'react-native';
import styled from 'styled-components/native';

import {light as theme} from '@styles/themes';
import {CONSTANTS} from '@utils';

export const EpisodeOverview = styled(Text)`
  font-family: CircularStd-Medium;
  font-size: ${theme.metrics.largeSize}px;
  color: ${theme.colors.text};
`;

export const sheet = StyleSheet.create({
  wrapper: {
    paddingHorizontal: CONSTANTS.VALUES.DEFAULT_SPACING,
    paddingVertical: theme.metrics.extraLargeSize,
  },
});
