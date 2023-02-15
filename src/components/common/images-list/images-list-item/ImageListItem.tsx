import React from 'react';

import {renderSVGIconConditionally, TMDBImage} from '@components';
import {useImageFallbackView} from '@hooks';
import metrics from '@styles/metrics';

import * as Styles from './ImageListItem.styles';

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('12%');

type ImageListItemProps = Styles.ImageOrientation & {
  onPress: () => void;
  image: string;
};

export const ImageListItem = (props: ImageListItemProps) => {
  const imageFallbackView = useImageFallbackView({
    image: props.image,
  });
  return (
    <Styles.Wrapper
      orientation={props.orientation}
      testID="image-list-item-button"
      onPress={props.onPress}>
      <TMDBImage
        imageType={props.orientation === 'PORTRAIT' ? 'profile' : 'still'}
        onError={imageFallbackView.onError}
        onLoad={imageFallbackView.onLoad}
        style={Styles.TMDBImageStyle}
        image={props.image}
      />
      {imageFallbackView.isFallbackImageVisible && (
        <Styles.FallbackImageWrapper
          testID="fallback-image-wrapper"
          style={[
            {
              opacity: imageFallbackView.opacity,
            },
          ]}>
          {renderSVGIconConditionally({
            condition: imageFallbackView.hasError,
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
