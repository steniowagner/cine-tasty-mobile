import {useCallback} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {useTMDBImage} from '@components';

import * as Styles from './BackgroundImage.styles';

type UseBackgroundImageProps = {
  image: string;
};

export const useBackgroundImage = (props: UseBackgroundImageProps) => {
  const tmdbImage = useTMDBImage({
    isThumbnail: true,
    imageType: 'poster',
    image: props.image,
  });

  const backgroundImageOpacity = useSharedValue(0);

  const style = useAnimatedStyle(
    () => ({
      opacity: backgroundImageOpacity.value,
      width: Styles.DEFAULT_WIDTH,
      height: Styles.DEFAULT_HEIGHT,
      position: 'absolute',
    }),
    [backgroundImageOpacity],
  );

  const handleLoadBackgroundImage = useCallback(() => {
    backgroundImageOpacity.value = withTiming(1, {
      duration: Styles.DEFAULT_ANIMATION_TIMING,
    });
  }, []);

  return {
    onLoadBackgroundImage: handleLoadBackgroundImage,
    uri: tmdbImage.uri,
    style,
  };
};
