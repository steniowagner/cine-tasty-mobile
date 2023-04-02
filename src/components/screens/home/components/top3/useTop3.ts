import {NativeScrollEvent} from 'react-native';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import * as Styles from './Top3.styles';

export const useTop3 = () => {
  const scrollViewPosition = useSharedValue(Styles.INITIAL_SCROLL_POSITION);

  const handleScroll = useAnimatedScrollHandler((event: NativeScrollEvent) => {
    scrollViewPosition.value = event.contentOffset.x;
  });

  return {
    scrollViewPosition,
    handleScroll,
  };
};
