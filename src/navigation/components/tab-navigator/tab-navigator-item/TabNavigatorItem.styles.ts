import { Platform } from 'react-native';
import styled from 'styled-components/native';

import { Typography } from '@common-components';
import metrics from '@styles/metrics';
import { dark } from '@styles/themes';

import items from '../tabs';

export const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('8%');

type ItemTextStyleProps = {
  isSelected: boolean;
};

export const Wrapper = styled.TouchableOpacity`
  width: ${({ theme }) => theme.metrics.width / items.length}px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const ItemText = styled(
  Typography.ExtraSmallText,
).attrs<ItemTextStyleProps>(({ isSelected, theme }) => {
  const selectedTabColor =
    // Didn't use the theme.id because we would need to
    // also check the cases of dark/light when "theme" is "system"
    theme.colors.background === dark.colors.background
      ? theme.colors.primary
      : theme.colors.text;
  return {
    color: isSelected ? selectedTabColor : theme.colors.inactiveWhite,
  };
})<ItemTextStyleProps>`
  margin-top: ${({ theme }) =>
    Platform.OS === 'android' ? theme.metrics.sm : theme.metrics.xs}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.5%')}px;
`;
