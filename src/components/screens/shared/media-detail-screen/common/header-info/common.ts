import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';

import CONSTANTS from 'utils/constants';
import metrics from 'styles/metrics';

export const BackgroundImageWrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
`;

export const Wrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('95%')}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const MediaInfoWrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('40%')}px;
  flex-direction: row;
  align-items: center;
  margin: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

export const SmokeShadow = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [
    ...Array(5).fill('transparent'),
    theme.colors.backgroundAlphax4,
    theme.colors.backgroundAlphax3,
    theme.colors.backgroundAlphax2,
    theme.colors.backgroundAlphax1,
    theme.colors.background,
  ],
}))`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const posterImageStyles = {
  width: metrics.getWidthFromDP('30%'),
  height: '100%',
  borderRadius: metrics.extraSmallSize,
};
