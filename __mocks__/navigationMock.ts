export const navigation = {
  navigate: jest.fn(),
  dispatch: jest.fn(),
  goBack: jest.fn(),
  isFocused: jest.fn().mockReturnValue(false),
  reset: jest.fn(),
  canGoBack: jest.fn(),
  dangerouslyGetParent: jest.fn(),
  dangerouslyGetState: jest.fn(),
  setParams: jest.fn(),
  setOptions: jest.fn(),
  addListener: () => () => jest.fn(),
  removeListener: () => () => jest.fn(),
  replace: jest.fn(),
  push: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
};

export type NavigationMock = typeof navigation;
