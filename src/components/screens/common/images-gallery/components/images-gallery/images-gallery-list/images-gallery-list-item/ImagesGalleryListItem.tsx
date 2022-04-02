import React, {memo} from 'react';

import {useTMDBImage} from '@components';

import useImagesGalleryListItem from './useImagesGalleryListItem';
import * as Styles from './ImagesGalleryListItem.styles';

type ImagesGalleryListItemProps = {
  isAllowedToBeShowed: boolean;
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
      <Styles.Image
        height={imagesGalleryListItem.imageHeight}
        testID="image-gallery-item"
        image={props.imageURL}
        imageType="backdrop"
        style={{}}
      />
    </Styles.Wrapper>
  );
};

const shouldComponentUpdate = (
  previousState: ImagesGalleryListItemProps,
  nextState: ImagesGalleryListItemProps,
): boolean =>
  (previousState.isAllowedToBeShowed || !nextState.isAllowedToBeShowed) &&
  (!previousState.isAllowedToBeShowed || nextState.isAllowedToBeShowed);

export default memo(ImagesGalleryListItem, shouldComponentUpdate);
