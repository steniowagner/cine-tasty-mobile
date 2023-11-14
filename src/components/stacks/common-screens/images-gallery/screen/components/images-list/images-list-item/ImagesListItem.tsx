import React, { memo } from 'react';

import { TMDBImage } from '@common-components';
import metrics from '@/styles/metrics';

import { useImagesListItem } from './use-images-list-item';
import * as Styles from './ImagesListItem.styles';

type ImagesListItemProps = {
  isAllowedToBeShown: boolean;
  image: string;
};

export const ImagesListItem = memo(
  (props: ImagesListItemProps) => {
    const imagesListItem = useImagesListItem({ image: props.image });

    return (
      <Styles.Wrapper testID="images-gallery-list-item">
        <Styles.ImageWrapper>
          <TMDBImage
            imageType="backdrop"
            style={imagesListItem.sheet.image}
            image={props.image}
            iconImageLoading="image"
            iconImageError="image-off"
            iconSize={metrics.xl * 5}
          />
        </Styles.ImageWrapper>
      </Styles.Wrapper>
    );
  },
  (
    previousState: ImagesListItemProps,
    nextState: ImagesListItemProps,
  ): boolean =>
    (previousState.isAllowedToBeShown || !nextState.isAllowedToBeShown) &&
    (!previousState.isAllowedToBeShown || nextState.isAllowedToBeShown),
);
