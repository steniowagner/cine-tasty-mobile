import React, {memo} from 'react';

import {renderSVGIconConditionally} from '@components';
import metrics from '@styles/metrics';

import {useThumbsGalleryListItem} from './useThumbsGalleryListItem';
import * as Styles from './ThumbsGalleryListItem.styles';

type ThumbListItemProps = {
  onPress: () => void;
  isSelected: boolean;
  image: string;
};

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('12%');

const ThumbsGalleryListItem = (props: ThumbListItemProps) => {
  const thumbsGalleryListItem = useThumbsGalleryListItem({
    isSelected: props.isSelected,
  });
  return (
    <Styles.Wrapper
      borderColor={thumbsGalleryListItem.borderColor}
      onPress={props.onPress}
      testID="thumb-list-item">
      <Styles.ThumbImage
        onError={thumbsGalleryListItem.onError}
        onLoad={thumbsGalleryListItem.onLoad}
        isSelected={props.isSelected}
        image={props.image}
        testID="thumb-image"
        imageType="profile"
        style={{}}
      />
      {thumbsGalleryListItem.imageStatus !== 'LOADED' && (
        <Styles.FallbackWrapper testID="thumb-fallback-wrapper">
          {renderSVGIconConditionally({
            condition: thumbsGalleryListItem.imageStatus === 'ERROR',
            ifTrue: {
              colorThemeRef: 'fallbackImageBackground',
              size: DEFAULT_ICON_SIZE,
              id: 'image-off',
            },
            ifFalse: {
              colorThemeRef: 'fallbackImageBackground',
              size: DEFAULT_ICON_SIZE,
              id: 'image',
            },
          })}
        </Styles.FallbackWrapper>
      )}
      {props.isSelected && <Styles.DotMarker testID="thumb-dot-marker" />}
    </Styles.Wrapper>
  );
};

const shouldComponentUpdate = (
  previousState: ThumbListItemProps,
  nextState: ThumbListItemProps,
) =>
  (previousState.isSelected || !nextState.isSelected) &&
  (!previousState.isSelected || nextState.isSelected);

export default memo(ThumbsGalleryListItem, shouldComponentUpdate);
