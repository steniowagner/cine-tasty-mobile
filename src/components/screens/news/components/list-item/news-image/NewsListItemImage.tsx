import React, { useState, useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import styled from 'styled-components';
import FastImage from 'react-native-fast-image';

import renderSVGIconConditionally from 'components/common/svg-icon/renderSVGIconConditionally';
import metrics from 'styles/metrics';

import { imageWrapper } from '../common-styles';

const ImageContent = styled(FastImage)`
  width: ${imageWrapper.width}px;
  height: ${imageWrapper.height}px;
  border-radius: ${imageWrapper.borderRadius}px;
`;

const FallbackImageWrapper = styled(Animated.View)`
  width: ${imageWrapper.width}px;
  height: ${imageWrapper.height}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${imageWrapper.borderRadius}px;
  background-color: ${({ theme }) => theme.colors.fallbackImageBackground};
`;

export const ANIMATION_DURATION = 400;
const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('12%');

type Props = {
  image: string;
};

const NewsListItemImage = ({ image }: Props) => {
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
    if (!image) {
      setIsImageWithError(true);
    }
  }, []);

  return (
    <View>
      <ImageContent
        onError={() => setIsImageWithError(true)}
        onLoad={() => setIsImageLoaded(true)}
        source={{ uri: image || undefined }}
        testID="news-image"
      />
      {isFallbackImageVisible && (
        <FallbackImageWrapper
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
        </FallbackImageWrapper>
      )}
    </View>
  );
};

export default NewsListItemImage;
