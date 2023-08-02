import {TouchableOpacity, Text, View} from 'react-native';
import styled from 'styled-components/native';

import {CONSTANTS} from '@utils';

export const Wrapper = styled(View)`
  width: 100%;
  margin-top: ${({theme}) => theme.metrics.mediumSize}px;
`;

export const SectionTextContentWrapper = styled(View)`
  width: 100%;
  margin-bottom: ${({theme}) => theme.metrics.largeSize}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

export const SectionTitle = styled(Text)`
  font-family: CircularStd-Black;
  font-size: ${({theme}) => theme.metrics.getWidthFromDP('6%')}px;
  color: ${({theme}) => theme.colors.text};
`;

export const ViewAllWrapper = styled(TouchableOpacity)`
  padding-vertical: ${({theme}) => theme.metrics.extraSmallSize}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: ${({theme}) => theme.metrics.width}px;
  background-color: ${({theme}) => theme.colors.primary};
`;

export const ViewAllText = styled(Text)`
  margin-left: 12px;
  margin-right: -4px;
  font-family: CircularStd-Bold;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  color: ${({theme}) => theme.colors.buttonText};
`;
