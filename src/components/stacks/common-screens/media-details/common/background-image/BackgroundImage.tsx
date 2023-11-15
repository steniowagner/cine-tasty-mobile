import React from 'react';
import Animated from 'react-native-reanimated';

import { useBackgroundImage } from './use-background-image';
import * as Styles from './BackgroundImage.styles';

type BackgroundImageProps = {
  image: string;
};

export const BackgroundImage = (props: BackgroundImageProps) => {
  const backgroundImage = useBackgroundImage();

  return (
    <Animated.View
      style={backgroundImage.style}
      testID="background-animated-view">
      <Styles.BackgroundImage
        blurRadius={2}
        onLoad={backgroundImage.onLoad}
        testID="background-image"
        source={{ uri: props.image }}
      />
      <Styles.SmokeShadow testID="smoke-shadow" colors={[]} />
    </Animated.View>
  );
};
