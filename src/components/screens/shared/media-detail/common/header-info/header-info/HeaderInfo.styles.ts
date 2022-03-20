import styled from 'styled-components/native';
import {Text, View} from 'react-native';

import {CONSTANTS} from '@utils';

export const MediaInfoWrapper = styled(View)`
  width: 100%;
  height: ${({theme}) => theme.metrics.getWidthFromDP('40%')}px;
  flex-direction: row;
  align-items: center;
  margin: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

export const Wrapper = styled(View)`
  width: 100%;
  height: ${({theme}) => theme.metrics.getWidthFromDP('95%')}px;
  background-color: ${({theme}) => theme.colors.background};
`;

export const TextContentWrapper = styled(View)`
  width: ${({theme}) => theme.metrics.getWidthFromDP('64%')}px;
  justify-content: center;
  height: 100%;
  padding: ${({theme}) => theme.metrics.smallSize}px;
`;

export const MediaTitleText = styled(Text).attrs({
  numberOfLines: 3,
})`
  font-size: ${({theme}) => theme.metrics.getWidthFromDP('6%')}px;
  color: ${({theme}) => theme.colors.text};
  font-family: CircularStd-Black;
  letter-spacing: 0.5px;
`;

export const VotesWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const NumberOfVotesText = styled(Text)`
  margin-right: ${({theme}) => theme.metrics.extraSmallSize}px;
  font-size: ${({theme}) => theme.metrics.getWidthFromDP('4%')}px;
  color: ${({theme}) => theme.colors.subText};
  font-family: CircularStd-Bold;
  letter-spacing: 0.5px;
`;

export const VotesText = styled(Text)`
  margin-top: ${({theme}) => theme.metrics.extraSmallSize / 2.5}px;
  font-size: ${({theme}) => theme.metrics.getWidthFromDP('3.5%')}px;
  color: ${({theme}) => theme.colors.subText};
  font-family: CircularStd-Black;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const VotesValueText = styled(Text)`
  margin-left: ${({theme}) => theme.metrics.smallSize}px;
  font-size: ${({theme}) => theme.metrics.getWidthFromDP('10%')}px;
  color: ${({theme}) => theme.colors.text};
  font-family: CircularStd-Medium;
`;

export const Row = styled(View)`
  flex-direction: row;
  align-items: center;
`;
