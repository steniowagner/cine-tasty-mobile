import React, { useState, useEffect, useRef } from 'react';
import { Animated, Image, View } from 'react-native';
import styled from 'styled-components';

import Icon from 'components/common/Icon';

import { imageWrapper } from '../common-styles';

const ImageContent = styled(Image)`
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
  background-color: #cfcfcf;
`;

const FallbackImageIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('14%'),
  color: '#4d4d4d',
}))``;

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
        useNativeDriver: true,
        duration: 400,
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
          ]}>
          <FallbackImageIcon name={isImageWithError ? 'image-off' : 'image'} />
        </FallbackImageWrapper>
      )}
    </View>
  );
};

export default NewsListItemImage;
