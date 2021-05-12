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

const ImageListItem = (props: ImageListItemProps) => {
  const loadListItemImage = useLoadListItemImage({
    image: props.image,
  });

  return (
    <Styles.Wrapper
      onPress={props.onPress}
      isFirst={props.isFirst}
    >
      <TMDBImage
        imageType="profile"
        onError={loadListItemImage.onError}
        onLoad={loadListItemImage.onLoad}
        image={props.image}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: metrics.extraSmallSize,
        }}
      />
      {loadListItemImage.isFallbackImageVisible && (
        <Styles.FallbackImageWrapper
          testID="fallback-image-wrapper"
          style={[
            {
              opacity: loadListItemImage.opacity,
            },
          ]}
        >
          {renderSVGIconConditionally({
            condition: loadListItemImage.hasError,
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
