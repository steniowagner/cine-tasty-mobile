import React from 'react';
import {View} from 'react-native';
import Animated from 'react-native-reanimated';

import {renderSVGIconConditionally} from '@components';

import * as Styles from './NewsImage.styles';
import useNewsImage from './useNewsImage';

type NewsImageProps = {
  image: string;
};

export const NewsImage = (props: NewsImageProps) => {
  const newsImage = useNewsImage({image: props.image});

  return (
    <View>
      <Styles.ImageContent
        onError={newsImage.onError}
        onLoad={newsImage.onLoad}
        source={{uri: props.image || undefined}}
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
              colorThemeRef: 'fallbackImageIcon',
              size: Styles.DEFAULT_ICON_SIZE,
              id: 'image-off',
            },
            ifFalse: {
              colorThemeRef: 'fallbackImageIcon',
              size: Styles.DEFAULT_ICON_SIZE,
              id: 'image',
            },
          })}
        </Animated.View>
      )}
    </View>
  );
};
