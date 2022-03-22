import {ScrollView} from 'react-native';
import styled from 'styled-components/native';

import {CONSTANTS} from '@utils';

export const Wrapper = styled(ScrollView)`
  margin-bottom: ${({theme}) => theme.metrics.extraLargeSize}px;
  padding-left: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;
