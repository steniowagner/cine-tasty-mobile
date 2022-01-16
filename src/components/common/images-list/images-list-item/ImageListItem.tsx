import React from 'react';

import renderSVGIconConditionally from '@components/common/svg-icon/renderSVGIconConditionally';
import TMDBImage from '@components/common/tmdb-image/TMDBImage';
import { useLoadListItemImage } from '@hooks';
import metrics from '@styles/metrics';

import * as Styles from './ImageListItem.styles';

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('12%');

type ImageListItemProps = {
  onPress: () => void;
  isFirst: boolean;
  image: string;
};

const ImageListItem = ({ onPress, isFirst, image }: ImageListItemProps) => {
  const {
    isFallbackImageVisible,
    hasError,
    onError,
    opacity,
    onLoad,
  } = useLoadListItemImage({
    image,
  });

  return (
    <Styles.Wrapper
      onPress={onPress}
      isFirst={isFirst}
    >
      <TMDBImage
        imageType="profile"
        onError={onError}
        onLoad={onLoad}
        image={image}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: metrics.extraSmallSize,
        }}
      />
      {isFallbackImageVisible && (
        <Styles.FallbackImageWrapper
          testID="fallback-image-wrapper"
          style={[
            {
              opacity,
            },
          ]}
        >
          {renderSVGIconConditionally({
            condition: hasError,
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
    </Styles.Wrapper>
  );
};

export default ImageListItem;
