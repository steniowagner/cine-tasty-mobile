import {View} from 'react-native';
import styled from 'styled-components/native';

import {LoadingPlaceholder} from '@components';
import {CONSTANTS} from '@utils';

export const Wrapper = styled(View)`
  padding-horizontal: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

export const Loading = styled(LoadingPlaceholder)`
  width: 100%;
  height: ${({theme}) => theme.metrics.largeSize}px,
  marginBottom: ${({theme}) => theme.metrics.mediumSize}px,
  borderRadius: ${({theme}) => theme.metrics.extraLargeSize / 2}px,
`;
