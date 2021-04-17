import React, { memo } from 'react';

import TMDBImage from '@components/common/tmdb-image/TMDBImage';

import * as Styles from './ThumbsGalleryListItem.styles';

type ThumbListItemProps = {
  onPress: () => void;
  isSelected: boolean;
  image: string;
};

const ThumbListItem = ({ isSelected, onPress, image }: ThumbListItemProps) => (
  <Styles.Wrapper
    isSelected={isSelected}
    onPress={onPress}
    testID="thumb-list-item"
  >
    <TMDBImage
      imageType="profile"
      onError={() => {}}
      onLoad={() => {}}
      image={image}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: Styles.BORDER_RADIUS,
      }}
    />
  </Styles.Wrapper>
);

const shouldComponentUpdate = (
  previousState: ThumbListItemProps,
  nextState: ThumbListItemProps,
): boolean => (previousState.isSelected || !nextState.isSelected)
  && (!previousState.isSelected || nextState.isSelected);

export default memo(ThumbListItem, shouldComponentUpdate);
