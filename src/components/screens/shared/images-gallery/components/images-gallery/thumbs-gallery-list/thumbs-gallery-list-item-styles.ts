import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import metrics from '@styles/metrics';

export const BORDER_RADIUS = metrics.mediumSize;

type WrapeprStyleProps = {
  isSelected: boolean;
};

export const Wrapper = styled(TouchableOpacity)<WrapeprStyleProps>`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('24%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('24%')}px;
  margin-right: ${({ theme }) => theme.metrics.mediumSize}px;
  border: 3px solid
    ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : 'transparent')};
  border-radius: ${BORDER_RADIUS + 4}px;
`;
