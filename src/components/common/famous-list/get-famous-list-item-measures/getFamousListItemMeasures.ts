import {Platform} from 'react-native';

import * as Styles from '../FamousList.styles';
import {NUMBER_OF_COLUMNS} from '../FamousList';

const makeMarginHorizontal = (famousListItemIndex: number) => {
  const withMargin = famousListItemIndex % NUMBER_OF_COLUMNS === 1;
  return withMargin
    ? Platform.select({
        ios: Styles.IOS_DEFAULT_LIST_ITEM_MARGIN_HORIZONTAL,
        android: Styles.ANDROID_DEFAULT_LIST_ITEM_MARGIN_HORIZONTAL,
      })
    : 0;
};

export const getFamousListItemMeasures = (famousListItemIndex: number) => ({
  width: Styles.DEFAULT_LIST_ITEM_WIDTH,
  height: Styles.DEFAULT_LIST_ITEM_HEIGHT,
  marginHorizontal: makeMarginHorizontal(famousListItemIndex),
});
