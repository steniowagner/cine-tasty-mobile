import React, { useState, useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

import renderSVGIconConditionally from '@components/common/svg-icon/renderSVGIconConditionally';
import metrics from '@styles/metrics';

import * as Styles from './NewsListItemImage.styles';

export const ANIMATION_DURATION = 400;
const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('12%');

type NewsListItemImageProps = {
  image: string;
};

const NewsListItemImage = (props: NewsListItemImageProps) => {
  const [isFallbackImageVisible, setIsFallbackImageVisible] = useState<boolean>(true);
  const [isImageWithError, setIsImageWithError] = useState<boolean>(false);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const fallbackImageWrapperOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isImageLoaded && !isImageWithError) {
      Animated.timing(fallbackImageWrapperOpacity, {
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
        toValue: 0,
      }).start(() => setIsFallbackImageVisible(false));
    }
  }, [isImageLoaded]);

  useEffect(() => {
    if (!props.image) {
      setIsImageWithError(true);
    }
  }, []);

  return (
    <View>
      <Styles.ImageContent
        onError={() => setIsImageWithError(true)}
        onLoad={() => setIsImageLoaded(true)}
        source={{ uri: props.image || undefined }}
        testID="news-image"
      />
      {isFallbackImageVisible && (
        <Styles.FallbackImageWrapper
          testID="fallback-image-wrapper"
          style={[
            {
              opacity: fallbackImageWrapperOpacity,
            },
          ]}
        >
          {renderSVGIconConditionally({
            condition: isImageWithError,
            ifTrue: {
              colorThemeRef: 'fallbackImageIcon',
              size: DEFAULT_ICON_SIZE,
              id: 'image-off',
            },
            ifFalse: {
              colorThemeRef: 'fallbackImageIcon',
              size: DEFAULT_ICON_SIZE,
              id: 'image',
            },
          })}
        </Styles.FallbackImageWrapper>
      )}
    </View>
  );
};

export default NewsListItemImage;
