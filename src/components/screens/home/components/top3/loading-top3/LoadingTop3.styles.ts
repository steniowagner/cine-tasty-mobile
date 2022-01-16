import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';

import * as Top3ListItemStyles from '../top-3-list-item/Top3ListItem.styles';

type ItemWrapperStyleProps = {
  isTheMiddle: boolean;
  width: number;
};

export const RightItemWrapper = styled(View)`
  margin-left: ${({ theme }) => -theme.metrics.getWidthFromDP('67%')}px;
  margin-top: ${Top3ListItemStyles.ITEM_MARGING_TOP}px;
  position: absolute;
`;

export const CenterItemWrapper = styled(View)`
  margin-left: ${({ theme }) => theme.metrics.getWidthFromDP('12.5%')}px;
`;

export const LeftItemWrapper = styled(View)`
  margin-left: ${({ theme }) => theme.metrics.getWidthFromDP('92%')}px;
  margin-top: ${Top3ListItemStyles.ITEM_MARGING_TOP}px;
  position: absolute;
`;

export const LoadingSmokeShadow = styled(LinearGradient).attrs(({ theme }) => ({
  colors: ['transparent', theme.colors.background],
}))`
  width: ${Top3ListItemStyles.ITEM_WIDTH}px;
  height: ${Top3ListItemStyles.ITEM_HEIGHT}px;
  border-radius: ${Top3ListItemStyles.ITEM_BORDER_RADIUS}px;
  position: absolute;
`;

export const SmokeShadow = styled(LinearGradient).attrs(({ theme }) => ({
  colors: ['transparent', theme.colors.backgroundAlphax1, theme.colors.background],
}))<Pick<ItemWrapperStyleProps, 'isTheMiddle'>>`
  width: ${Top3ListItemStyles.ITEM_WIDTH}px;
  height: ${Top3ListItemStyles.ITEM_HEIGHT + 2}px;
  margin-horizontal: ${({ isTheMiddle, theme }) => (isTheMiddle ? theme.metrics.largeSize : 0)}px;
  position: absolute;
`;
