/* eslint-disable global-require */

describe('Testing isEqualsOrLargestThanIphoneX() fucntion', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('Testing when the device uses Android OS', () => {
    it('should return false when the device is using Android OS', () => {
      jest.mock('react-native', () => ({
        Platform: {
          OS: 'android',
        },
        Dimensions: {
          get: jest.fn().mockReturnValueOnce({ width: 100, height: 100 }),
        },
      }));

      const isEqualsOrLargestThanIphoneX = require('./isEqualsOrLargestThanIphoneX');

      expect(isEqualsOrLargestThanIphoneX.default()).toBe(false);
    });
  });

  describe('Testing when the device uses iOS', () => {
    it('should return the result correctly when the device is smaller than iPhoneX', () => {
      jest.mock('react-native', () => ({
        Platform: {
          OS: 'ios',
        },
        Dimensions: {
          get: jest.fn().mockReturnValueOnce({ width: 100, height: 100 }),
        },
      }));

      const isEqualsOrLargestThanIphoneX = require('./isEqualsOrLargestThanIphoneX');

      expect(isEqualsOrLargestThanIphoneX.default()).toBe(false);
    });

    it('should return the result correctly when the device is equal to iPhoneX', () => {
      jest.mock('react-native', () => ({
        Platform: {
          OS: 'ios',
        },
        Dimensions: {
          get: jest.fn().mockReturnValueOnce({ width: 375, height: 812 }),
        },
      }));

      const isEqualsOrLargestThanIphoneX = require('./isEqualsOrLargestThanIphoneX');

      expect(isEqualsOrLargestThanIphoneX.default()).toBe(true);
    });

    it('should return the result correctly when the device is greater than iPhoneX', () => {
      jest.mock('react-native', () => ({
        Platform: {
          OS: 'ios',
        },
        Dimensions: {
          get: jest.fn().mockReturnValueOnce({ width: 376, height: 813 }),
        },
      }));

      const isEqualsOrLargestThanIphoneX = require('./isEqualsOrLargestThanIphoneX');

      expect(isEqualsOrLargestThanIphoneX.default()).toBe(true);
    });
  });
});
