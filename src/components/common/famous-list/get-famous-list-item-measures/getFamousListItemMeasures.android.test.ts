import {getFamousListItemMeasures} from './getFamousListItemMeasures';
import * as Styles from '../FamousList.styles';

jest.mock('../FamousList', () => ({
  NUMBER_OF_COLUMNS: 3,
}));

jest.mock('react-native', () => {
  return {
    Platform: {
      OS: 'android',
      select: ({android}) => android,
    },
    Dimensions: {
      get: () => ({width: 100, height: 100}),
    },
    PixelRatio: {
      roundToNearestPixel: () => 1,
    },
    StyleSheet: {
      create: jest.fn(),
    },
  };
});

describe('getFamousListItemMeasures', () => {
  describe('Whent the OS is Android', () => {
    describe('When it should have margin-horizontal', () => {
      it('should return the measures correctly', () => {
        const famousListItemIndex = 1;
        const measures = getFamousListItemMeasures(famousListItemIndex);
        expect(measures).toEqual({
          width: Styles.DEFAULT_LIST_ITEM_WIDTH,
          height: Styles.DEFAULT_LIST_ITEM_HEIGHT,
          marginHorizontal: Styles.ANDROID_DEFAULT_LIST_ITEM_MARGIN_HORIZONTAL,
        });
      });
    });

    describe('When it should not have margin-horizontal', () => {
      it('should return the measures correctly', () => {
        const famousListItemIndex = 3;
        const measures = getFamousListItemMeasures(famousListItemIndex);
        expect(measures).toEqual({
          width: Styles.DEFAULT_LIST_ITEM_WIDTH,
          height: Styles.DEFAULT_LIST_ITEM_HEIGHT,
          marginHorizontal: 0,
        });
      });
    });
  });
});
