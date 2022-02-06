import React from 'react';
import {View} from 'react-native';

import renderSVGIconConditionally from '@components/common/svg-icon/renderSVGIconConditionally';
import metrics from '@styles/metrics';

import * as Styles from './NewsImage.styles';
import useNewsImage from './useNewsImage';

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('12%');
export const ANIMATION_DURATION = 400;

type NewsImageProps = {
  image: string;
};

const NewsImage = (props: NewsImageProps) => {
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
        <Styles.FallbackImageWrapper
          testID="fallback-image-wrapper"
          style={[
            {
              opacity: newsImage.fallbackImageWrapperOpacity,
            },
          ]}>
          {renderSVGIconConditionally({
            condition: newsImage.hasError,
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
