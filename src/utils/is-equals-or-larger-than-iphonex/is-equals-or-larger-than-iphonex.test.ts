describe('Utils/is-equals-or-larger-than-iphonex', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('When the OS is Android', () => {
    it('should return "false"', () => {
      jest.mock('react-native', () => ({
        Platform: {
          OS: 'android',
        },
        Dimensions: {
          get: jest.fn().mockReturnValueOnce({ width: 100, height: 100 }),
        },
      }));
      const {
        isEqualsOrLargerThanIphoneX,
      } = require('./is-equals-or-larger-than-iphonex');
      expect(isEqualsOrLargerThanIphoneX()).toEqual(false);
    });
  });

  describe('When the OS is iOS', () => {
    it('should return the result correctly when the device is smaller than iPhoneX', () => {
      jest.mock('react-native', () => ({
        Platform: {
          OS: 'ios',
        },
        Dimensions: {
          get: jest.fn().mockReturnValueOnce({ width: 100, height: 100 }),
        },
      }));
      const {
        isEqualsOrLargerThanIphoneX,
      } = require('./is-equals-or-larger-than-iphonex');
      expect(isEqualsOrLargerThanIphoneX()).toEqual(false);
    });

    it('should return the result correctly when the device is the "iPhoneX"', () => {
      jest.mock('react-native', () => ({
        Platform: {
          OS: 'ios',
        },
        Dimensions: {
          get: jest.fn().mockReturnValueOnce({ width: 375, height: 812 }),
        },
      }));
      const {
        isEqualsOrLargerThanIphoneX,
      } = require('./is-equals-or-larger-than-iphonex');
      expect(isEqualsOrLargerThanIphoneX()).toEqual(true);
    });

    it('should return the result correctly when the device is larger than "iPhoneX"', () => {
      jest.mock('react-native', () => ({
        Platform: {
          OS: 'ios',
        },
        Dimensions: {
          get: jest.fn().mockReturnValueOnce({ width: 376, height: 813 }),
        },
      }));
      const {
        isEqualsOrLargerThanIphoneX,
      } = require('./is-equals-or-larger-than-iphonex');
      expect(isEqualsOrLargerThanIphoneX()).toEqual(true);
    });
  });
});
