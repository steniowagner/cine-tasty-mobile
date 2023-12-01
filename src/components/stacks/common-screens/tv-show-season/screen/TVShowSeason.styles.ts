import metrics from '@/styles/metrics';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { borderRadius } from '@/styles/border-radius';

export const IMAGE_LOADING_ICON_SIZE = metrics.xl * 2;
export const STAR_ICON_SIZE = metrics.xl;

export const Header = styled.View`
  width: 100%;
  height: ${({ theme }) => theme.metrics.xl * 8}px;
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.xl}px;
  margin-bottom: ${({ theme }) => theme.metrics.sm}px;
`;

export const SeasonOverviewWrapper = styled.View`
  height: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.md}px;
`;

export const HeaderTextWrapper = styled.View`
  padding-horizontal: ${({ theme }) => theme.metrics.md}px;
  width: ${({ theme }) => theme.metrics.width - theme.metrics.xl * 6}px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const EpisodeItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('10')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.md}px;
`;

export const EpisodeIndexWrapper = styled.View`
  width: ${({ theme }) => theme.metrics.xl * 2}px;
  height: ${({ theme }) => theme.metrics.xl * 2}px;
  margin-right: ${({ theme }) => theme.metrics.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.round}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const LineDivider = styled.View`
  width: 100%;
  height: ${StyleSheet.hairlineWidth}px;
  background-color: ${({ theme }) => theme.colors.subText};
`;

export const sheet = StyleSheet.create({
  headerImage: {
    width: metrics.xl * 6,
    height: metrics.xl * 8,
    borderRadius: borderRadius.xs,
    marginLeft: metrics.md,
  },
  seasonText: {
    marginTop: metrics.xs,
  },
  seasonStarText: {
    marginTop: metrics.xs,
    marginLeft: metrics.xs,
  },
  seasonTitleText: {
    width: '80%',
  },
});
