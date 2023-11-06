import {
  getStatusBarHeight,
  IOS_IPHONE_X_AND_ABOVE,
  IOS_BELOW_IPHONE_X,
} from './get-statusbar-height';

describe('Utils/status-bar-height # Android', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe('And "currentHeight" is "defined"', () => {
    it('should return correctly', () => {
      jest.mock(
        '../is-equals-or-larger-than-iphonex/is-equals-or-larger-than-iphonex',
        () => ({
          isEqualsOrLargerThanIphoneX: jest.fn().mockReturnValue(false),
        }),
      );
      jest.mock('react-native/Libraries/Utilities/Platform', () => ({
        OS: 'android',
      }));
      jest.mock(
        'react-native/Libraries/Components/StatusBar/StatusBar',
        () => ({
          currentHeight: 10,
        }),
      );
      const statusBarHeight = getStatusBarHeight();
      expect(statusBarHeight).toEqual(10);
    });
  });

  describe('And "currentHeight" is "undefined"', () => {
    it('should return correctly', () => {
      jest.mock(
        '../is-equals-or-larger-than-iphonex/is-equals-or-larger-than-iphonex',
        () => ({
          isEqualsOrLargerThanIphoneX: jest.fn().mockReturnValue(false),
        }),
      );
      jest.mock('react-native/Libraries/Utilities/Platform', () => ({
        OS: 'android',
      }));
      jest.mock(
        'react-native/Libraries/Components/StatusBar/StatusBar',
        () => ({
          currentHeight: undefined,
        }),
      );
      const statusBarHeight = getStatusBarHeight();
      expect(statusBarHeight).toEqual(0);
    });
  });
});
