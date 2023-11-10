import { NativeScrollEvent } from 'react-native';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

export const useScrollWithAnimatedHeader = () => {
  const scrollViewPosition = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler((event: NativeScrollEvent) => {
    scrollViewPosition.value = event.contentOffset.y;
  });

  return {
    onScroll: handleScroll,
    scrollViewPosition,
  };
};
