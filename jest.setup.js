global.ReanimatedDataMock = {
  now: () => 0,
};
require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: key => key, i18n: {language: 'en'}}),
  getI18n: () => ({language: 'en'}),
}));

jest.mock('react-native-status-bar-height', () => ({
  getStatusBarHeight: () => 10,
  isIPhoneWithMonobrow: jest.fn(),
}));

jest.mock('react-native-fast-image', () => {
  const {View} = require('react-native');

  const FastImageComponent = View;

  FastImageComponent.displayName = 'FastImage';

  const FastImage = FastImageComponent;

  FastImage.resizeMode = {
    contain: 'contain',
    cover: 'cover',
    stretch: 'stretch',
    center: 'center',
  };

  return FastImage;
});

jest.mock('react-native-reanimated', () => {
  const {View} = require('react-native');
  return {
    Value: jest.fn(),
    event: jest.fn(),
    add: jest.fn(),
    eq: jest.fn(),
    set: jest.fn(),
    cond: jest.fn(),
    interpolate: jest.fn(),
    View,
    Extrapolate: {CLAMP: jest.fn()},
    Transition: {
      Together: 'Together',
      Out: 'Out',
      In: 'In',
    },
    Easing: {
      in: jest.fn(),
      out: jest.fn(),
      inOut: jest.fn(),
    },
  };
});

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  const FlatList = require('react-native/Libraries/Lists/FlatList');

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
    gestureHandlerRootHOC: c => c,
    Directions: {},
    FlatList,
  };
});

const MockDate = require('mockdate');
const FRAME_TIME = 10;

global.requestAnimationFrame = cb => {
  setTimeout(cb, FRAME_TIME);
};

global.timeTravel = (time = FRAME_TIME) => {
  const tickTravel = () => {
    const now = Date.now();
    MockDate.set(new Date(now + FRAME_TIME));
    jest.advanceTimersByTime(FRAME_TIME);
  };
  const frames = time / FRAME_TIME;
  let framesEllapsed;
  for (framesEllapsed = 0; framesEllapsed < frames; framesEllapsed++) {
    tickTravel();
  }
};
