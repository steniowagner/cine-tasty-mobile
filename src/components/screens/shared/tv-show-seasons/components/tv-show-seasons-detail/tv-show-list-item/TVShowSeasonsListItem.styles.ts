import {TouchableOpacity, Text, View} from 'react-native';
import styled from 'styled-components/native';

import CONSTANTS from '@utils/constants';

export const ListItemWrapper = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

export const EpisodeNameText = styled(Text).attrs({
  numberOfLines: 2,
})`
  width: 75%;
  margin-left: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
  font-size: ${({theme}) => theme.metrics.largeSize * 1.1}px;
  color: ${({theme}) => theme.colors.text};
  font-family: CircularStd-Bold;
`;

export const EpisodeIndexText = styled(Text)`
  font-size: ${({theme}) => theme.metrics.getWidthFromDP('6%')}px;
  color: ${({theme}) => theme.colors.buttonText};
  font-family: CircularStd-Black;
`;

export const EpisodeIndexWrapper = styled(View)`
  width: ${({theme}) => theme.metrics.getWidthFromDP('12%')}px;
  height: ${({theme}) => theme.metrics.getWidthFromDP('12%')}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({theme}) => theme.metrics.getWidthFromDP('6%')}px;
  background-color: ${({theme}) => theme.colors.primary};
`;

export const Row = styled(View)`
  flex-direction: row;
  align-items: center;
`;
