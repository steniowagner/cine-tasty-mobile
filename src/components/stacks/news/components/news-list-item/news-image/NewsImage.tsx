import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { renderSVGIconConditionally } from '../../../../../../utils/render-svg-icon-conditionally/render-svg-icon-conditionally';
import * as Styles from './NewsImage.styles';
import { useNewsImage } from './use-news-image';

type NewsImageProps = {
  image?: string;
};

export const NewsImage = (props: NewsImageProps) => {
  const newsImage = useNewsImage({ image: props.image });

  return (
    <View>
      <Styles.ImageContent
        onError={newsImage.onError}
        onLoad={newsImage.onLoad}
        source={{ uri: props.image || undefined }}
        testID="news-image"
      />
      {newsImage.isFallbackImageVisible && (
        <Animated.View
          testID="fallback-image-wrapper"
          style={[
            Styles.AnimatedViewStlyes.fallbackImageWrapper,
            newsImage.fallbackImageOpacityAnimatedStyle,
          ]}>
          {renderSVGIconConditionally({
            condition: newsImage.hasError,
            ifTrue: {
              color: 'fallbackImageIcon',
              size: Styles.DEFAULT_ICON_SIZE,
              id: 'image-off',
            },
            ifFalse: {
              color: 'fallbackImageIcon',
              size: Styles.DEFAULT_ICON_SIZE,
              id: 'image',
            },
          })}
        </Animated.View>
      )}
    </View>
  );
};
