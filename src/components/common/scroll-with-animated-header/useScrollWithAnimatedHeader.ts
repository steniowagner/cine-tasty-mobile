import {useMemo} from 'react';
import {NativeScrollEvent} from 'react-native';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

type UseScrollWithAnimatedHeaderProps = {
  isLoading: boolean;
  hasError: boolean;
};

export const useScrollWithAnimatedHeader = (
  props: UseScrollWithAnimatedHeaderProps,
) => {
  const scrollViewPosition = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler((event: NativeScrollEvent) => {
    scrollViewPosition.value = event.contentOffset.y;
  });

  const canScrollViewBounce = useMemo(
    () => !props.hasError && !props.isLoading,
    [props.hasError, props.isLoading],
  );

  return {
    onScroll: handleScroll,
    canScrollViewBounce,
    scrollViewPosition,
  };
};
