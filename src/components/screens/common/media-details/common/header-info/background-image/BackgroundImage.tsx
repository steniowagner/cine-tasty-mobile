import React from 'react';
import Animated from 'react-native-reanimated';

import {useBackgroundImage} from './useBackgroundImage';
import * as Styles from './BackgroundImage.styles';

type BackgroundImageProps = {
  image: string;
};

export const BackgroundImage = (props: BackgroundImageProps) => {
  const backgroundImage = useBackgroundImage({
    image: props.image,
  });

  return (
    <Animated.Image
      blurRadius={Styles.DEFAULT_BLUR_RADIUS}
      onLoad={backgroundImage.onLoadBackgroundImage}
      testID="background-image"
      source={{uri: backgroundImage.uri}}
      style={backgroundImage.style}
    />
  );
};
