import React, {memo} from 'react';

import {useTMDBImage, ProgressiveImage} from '@components';

import {useImagesGalleryListItem} from './useImagesGalleryListItem';
import * as Styles from './ImagesGalleryListItem.styles';

type ImagesGalleryListItemProps = {
  isAllowedToBeShown: boolean;
  imageURL: string;
};

const ImagesGalleryListItem = (props: ImagesGalleryListItemProps) => {
  const tmdbImage = useTMDBImage({
    imageType: 'backdrop',
    isThumbnail: false,
    image: props.imageURL,
  });

  const imagesGalleryListItem = useImagesGalleryListItem({
    imageURL: tmdbImage.uri,
  });

  if (imagesGalleryListItem.isLoading) {
    return (
      <Styles.Wrapper testID="images-gallery-list-item-loading">
        <Styles.CustomActivityIndicator />
      </Styles.Wrapper>
    );
  }

  if (imagesGalleryListItem.hasError) {
    return (
      <Styles.Wrapper testID="image-error-wrapper">
        <Styles.ImageOffIcon />
      </Styles.Wrapper>
    );
  }

  return (
    <Styles.Wrapper testID="images-gallery-list-item">
      <ProgressiveImage
        height={imagesGalleryListItem.imageHeight}
        removeBackgroundColor
        imageType="backdrop"
        image={props.imageURL}
      />
    </Styles.Wrapper>
  );
};

const shouldComponentUpdate = (
  previousState: ImagesGalleryListItemProps,
  nextState: ImagesGalleryListItemProps,
): boolean =>
  (previousState.isAllowedToBeShown || !nextState.isAllowedToBeShown) &&
  (!previousState.isAllowedToBeShown || nextState.isAllowedToBeShown);

export default memo(ImagesGalleryListItem, shouldComponentUpdate);
