import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import * as Top3ListItemStyles from '../top3/top-3-list-item/Top3ListItem.styles';

type ItemWrapperStyleProps = {
  isTheMiddle: boolean;
  width: number;
};

export const Wrapper = styled(View)`
  flex-direction: row;
  left: -${({theme}) => {
      const horizontalMargin =
        theme.metrics.width - Top3ListItemStyles.ITEM_WIDTH;
      return Top3ListItemStyles.ITEM_WIDTH - horizontalMargin / 2;
    }}px;
`;

export const RightItemWrapper = styled(View)`
  margin-top: ${Top3ListItemStyles.ITEM_MARGING_TOP}px;
  right: -${({theme}) => theme.metrics.extraLargeSize}px;
`;

export const LeftItemWrapper = styled(View)`
  margin-top: ${Top3ListItemStyles.ITEM_MARGING_TOP}px;
  left: -${({theme}) => theme.metrics.extraLargeSize}px;
`;

export const LoadingSmokeShadow = styled(LinearGradient).attrs(({theme}) => ({
  colors: ['transparent', theme.colors.background],
}))`
  width: ${Top3ListItemStyles.ITEM_WIDTH}px;
  height: ${Top3ListItemStyles.ITEM_HEIGHT}px;
  border-radius: ${Top3ListItemStyles.ITEM_BORDER_RADIUS}px;
  position: absolute;
`;

export const SmokeShadow = styled(LinearGradient).attrs(({theme}) => ({
  colors: [
    'transparent',
    theme.colors.backgroundAlphax1,
    theme.colors.background,
  ],
}))<Pick<ItemWrapperStyleProps, 'isTheMiddle'>>`
  width: ${Top3ListItemStyles.ITEM_WIDTH}px;
  height: ${Top3ListItemStyles.ITEM_HEIGHT + 2}px;

  position: absolute;
`;

export const sheet = StyleSheet.create({
  loading: {
    borderRadius: Top3ListItemStyles.ITEM_BORDER_RADIUS,
    height: Top3ListItemStyles.ITEM_HEIGHT,
    width: Top3ListItemStyles.ITEM_WIDTH,
  },
});
