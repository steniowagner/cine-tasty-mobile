import { View, Text } from 'react-native';
import styled from 'styled-components';

import CONSTANTS from '@utils/constants';

type ExtraTagStyleProp = {
  isExtra: boolean;
};

export const Wrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  padding-horizontal: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
  margin-bottom: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

export const TagWrapper = styled(View)<ExtraTagStyleProp>`
  margin-right: ${({ theme }) => theme.metrics.smallSize}px;
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ isExtra, theme }) => (isExtra ? theme.colors.contrast : theme.colors.primary)};
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

export const TagText = styled(Text)<ExtraTagStyleProp>`
  font-family: CircularStd-Medium;
  color: ${({ isExtra, theme }) => (isExtra ? 'white' : theme.colors.buttonText)};
  text-align: center;
`;
