import {View} from 'react-native';
import styled from 'styled-components/native';

import CONSTANTS from '@utils/constants';

export const MediaItemDescriptionWrapper = styled(View)`
  padding-horizontal: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
  margin-bottom: ${({theme}) => theme.metrics.extraLargeSize * 2}px;
`;
