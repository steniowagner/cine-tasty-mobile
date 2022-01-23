import React from 'react';
import {View} from 'react-native';

import renderSVGIconConditionally from '@components/common/svg-icon/renderSVGIconConditionally';
import metrics from '@styles/metrics';

import * as Styles from './NewsImage.styles';
import useNewsImage from './useNewsImage';

export const ANIMATION_DURATION = 400;
const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('12%');

type NewsImageProps = {
  image: string;
};

const NewsImage = ({image}: NewsImageProps) => {
  const {
    fallbackImageWrapperOpacity,
    isFallbackImageVisible,
    isImageWithError,
    onError,
    onLoad,
  } = useNewsImage({image});

  return (
    <View>
      <Styles.ImageContent
        onError={onError}
        onLoad={onLoad}
        source={{uri: image || undefined}}
        testID="news-image"
      />
      {isFallbackImageVisible && (
        <Styles.FallbackImageWrapper
          testID="fallback-image-wrapper"
          style={[
            {
              opacity: fallbackImageWrapperOpacity,
            },
          ]}>
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

export default NewsImage;
