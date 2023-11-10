import { StyleSheet, Platform } from 'react-native';
import styled from 'styled-components/native';

import { Typography } from '@/components/common';
import metrics from '@styles/metrics';

export const PROFILE_IMAGE_ICON_SIZE = metrics.xl * 3;
export const DEFAULT_MARGIN_TOP = Platform.select({
  android: metrics.xl * 4,
  ios: metrics.xl * 6,
});
export const Wrapper = styled.View`
  width: 100%;
  justify-content: flex-end;
  margin-top: ${DEFAULT_MARGIN_TOP}px;
  margin-bottom: ${({ theme }) => theme.metrics.lg * 2}px;
  margin-horizontal: ${({ theme }) => theme.metrics.md}px;
`;

export const InfoWrapper = styled.View`
  flex-direction: row;
  margin-top: ${({ theme }) => theme.metrics.lg}px;
`;

export const InfoTextWrapper = styled.View`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('60')}px;
`;

export const TextContentWrapper = styled.View`
  justify-content: center;
  padding-left: ${({ theme }) => theme.metrics.md}px;
`;

export const sheet = StyleSheet.create({
  profileImage: {
    width: metrics.xl * 5,
    height: metrics.xl * 5,
    borderRadius: metrics.xs,
  },
});

export const PlaceOfBirthText = styled(Typography.ExtraSmallText)`
  margin-top: ${({ theme }) => theme.metrics.sm}px;
  margin-bottom: ${({ theme }) => theme.metrics.md}px;
`;

export const KnownForDepartmentWrapper = styled.View`
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  border-radius: ${({ theme }) => theme.borderRadius.xs}px;
  padding-vertical: ${({ theme }) => theme.metrics.sm}px;
  padding-horizontal: ${({ theme }) => theme.metrics.sm}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;
