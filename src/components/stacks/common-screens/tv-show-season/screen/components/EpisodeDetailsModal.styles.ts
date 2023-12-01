import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { borderRadius } from '@/styles/border-radius';
import { Typography } from '@common-components';
import metrics from '@/styles/metrics';

export const IMAGE_ICON_SIZE = metrics.xl;

export const Wrapper = styled.View`
  padding-top: ${({ theme }) => theme.metrics.md}px;
  padding-horizontal: ${({ theme }) => theme.metrics.md}px;
`;

export const EpisodeTitle = styled(Typography.SmallText).attrs(({ theme }) => ({
  color: theme.colors.buttonText,
  bold: true,
}))`
  margin-bottom: ${({ theme }) => theme.metrics.xs}px;
`;

export const Row = styled.View`
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.metrics.md}px;
`;

export const TextWrapper = styled.View`
  width: 60%;
  justify-content: center;
  padding-horizontal: ${({ theme }) => theme.metrics.sm}px;
`;

export const sheet = StyleSheet.create({
  image: {
    width: metrics.xl * 7,
    height: metrics.xl * 5,
    borderRadius: borderRadius.sm,
  },
});
