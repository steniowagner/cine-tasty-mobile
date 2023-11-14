import React from 'react';

import { TMDBImage } from '@common-components';
import metrics from '@/styles/metrics';

import * as Styles from './ThumbsListItem.styles';

type ThumbsListItemProps = {
  onPress: () => void;
  isSelected: boolean;
  image: string;
};

export const ThumbsListItem = (props: ThumbsListItemProps) => (
  <Styles.Wrapper
    testID="thumbs-list-item"
    onPress={props.onPress}
    isSelected={props.isSelected}>
    <TMDBImage
      imageType="profile"
      style={Styles.sheet.thumb}
      image={props.image}
      iconImageLoading="image"
      iconImageError="image-off"
      iconSize={metrics.xl}
      isThumbnail
    />
    {props.isSelected && <Styles.DotMarker testID="thumb-dot-marker" />}
  </Styles.Wrapper>
);
