/* eslint-disable global-require */
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    FlatList: View,
    gestureHandlerRootHOC: jest.fn(),
    Directions: {},
  };
});

const MockDate = require('mockdate');

const frameTime = 10;

global.requestAnimationFrame = (callback) => {
  setTimeout(callback, frameTime);
};

global.timeTravel = (time = frameTime) => {
  const tickTravel = () => {
    const now = Date.now();
    MockDate.set(new Date(now + frameTime));
    jest.advanceTimersByTime(frameTime);
  };
  const frames = time / frameTime;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < frames; i++) {
    tickTravel();
  }
};
