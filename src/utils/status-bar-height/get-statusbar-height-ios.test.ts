import {
  getStatusBarHeight,
  IOS_IPHONE_X_AND_ABOVE,
  IOS_BELOW_IPHONE_X,
} from './get-statusbar-height';

const mockIsEqualsOrLargerThanIphoneX = jest.fn();

jest.mock(
  '../is-equals-or-larger-than-iphonex/is-equals-or-larger-than-iphonex',
  () => ({
    isEqualsOrLargerThanIphoneX: () => mockIsEqualsOrLargerThanIphoneX(),
  }),
);

describe('Utils/status-bar-height # iOS', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should return correctly when the "device has iPhoneX dimensions or above"', () => {
    mockIsEqualsOrLargerThanIphoneX.mockReturnValue(true);
    const statusBarHeight = getStatusBarHeight();
    expect(statusBarHeight).toEqual(IOS_IPHONE_X_AND_ABOVE);
  });

  it('should return correctly hen the "device is below iPhoneX dimensions"', () => {
    mockIsEqualsOrLargerThanIphoneX.mockReturnValue(false);
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'ios',
    }));
    const statusBarHeight = getStatusBarHeight();
    expect(statusBarHeight).toEqual(IOS_BELOW_IPHONE_X);
  });
});
