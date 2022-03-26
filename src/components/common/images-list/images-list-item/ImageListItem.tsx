import React from 'react';

import {renderSVGIconConditionally, TMDBImage} from '@components/common';
import {useLoadListItemImage} from '@hooks';
import metrics from '@styles/metrics';

import * as Styles from './ImageListItem.styles';

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('12%');

type ImageListItemProps = {
  onPress: () => void;
  image: string;
};

export const ImageListItem = (props: ImageListItemProps) => {
  const loadListItemImage = useLoadListItemImage({
    image: props.image,
  });
  return (
    <Styles.Wrapper testID="image-list-item-button" onPress={props.onPress}>
      <TMDBImage
        onError={loadListItemImage.onError}
        onLoad={loadListItemImage.onLoad}
        style={Styles.TMDBImageStyle}
        imageType="profile"
        image={props.image}
      />
      {loadListItemImage.isFallbackImageVisible && (
        <Styles.FallbackImageWrapper
          testID="fallback-image-wrapper"
          style={[
            {
              opacity: loadListItemImage.opacity,
            },
          ]}>
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
