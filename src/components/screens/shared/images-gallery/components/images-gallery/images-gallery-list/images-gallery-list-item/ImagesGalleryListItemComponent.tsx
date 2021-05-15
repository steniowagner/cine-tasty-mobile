import React from 'react';

import useTMDBImage from '@components/common/tmdb-image/useTMDBImage';
import TMDBImage from '@components/common/tmdb-image/TMDBImage';
import SVGIcon from '@components/common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';

import useImagesGalleryListItem from './useImagesGalleryListItem';
import * as Styles from './ImagesGalleryListItem.styles';

type ImagesGalleryListItemComponentProps = {
  imageURL: string;
};

const ImagesGalleryListItemComponent = (props: ImagesGalleryListItemComponentProps) => {
  const tmdbImage = useTMDBImage({
    image: props.imageURL,
    imageType: 'backdrop',
    isThumbnail: false,
  });

  const imagesGalleryListItem = useImagesGalleryListItem({
    imageURL: tmdbImage.uri,
  });

  if (imagesGalleryListItem.isLoading) {
    return (
      <Styles.Wrapper
        testID="images-gallery-list-item-loading"
      >
        <Styles.CustomActivityIndicator />
      </Styles.Wrapper>
    );
  }

  if (imagesGalleryListItem.hasError) {
    return (
      <Styles.ImageOffWrapper
        testID="image-error-wrapper"
      >
        <SVGIcon
          size={metrics.getWidthFromDP('25%')}
          colorThemeRef="white"
          id="image-off"
        />
      </Styles.ImageOffWrapper>
    );
  }

  if (imagesGalleryListItem.isLandscape || imagesGalleryListItem.isPortrait) {
    let height = '0%';

    if (imagesGalleryListItem.isLandscape) {
      height = '50%';
    }

    if (imagesGalleryListItem.isPortrait) {
      height = '65%';
    }

    return (
      <Styles.Wrapper
        testID="images-gallery-list-item"
      >
        <TMDBImage
          style={{ width: '100%', height }}
          image={props.imageURL}
          imageType="backdrop"
        />
      </Styles.Wrapper>
    );
  }

  return null;
};

export default ImagesGalleryListItemComponent;
