/* eslint-disable react/display-name */
import { View } from 'react-native';
import styled from 'styled-components';

import CONSTANTS from '@utils/constants';

export const Wrapper = styled(View)`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

export const SectionTextContentWrapper = styled(View)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;
