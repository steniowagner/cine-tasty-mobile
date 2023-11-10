import React, { memo } from 'react';

import { TMDBImage, SVGIcon, Typography } from '@common-components';
import metrics from '@styles/metrics';

import {
  UseMediaListItemParams as MediaListItemProps,
  useMediaListItem,
} from './use-media-list-item';
import * as Styles from './MediaListItem.styles';

export const MediaListItem = memo(
  (props: MediaListItemProps) => {
    const mediaListItem = useMediaListItem(props);

    return (
      <Styles.Wrapper
        testID="media-list-item"
        onPress={mediaListItem.onPressItem}
        layoutSize={props.layoutSize}>
        <TMDBImage
          iconImageLoading="video-vintage"
          iconImageError="image-off"
          imageType="poster"
          testID="media-list-image"
          style={mediaListItem.imageStyles}
          iconSize={metrics.xl * 2}
          image={props.image || ''}
        />
        <Typography.ExtraSmallText testID="media-list-item-title">
          {props.title || '-'}
        </Typography.ExtraSmallText>
        {mediaListItem.canShowVotesData && (
          <Styles.StarsContentWrapper testID="media-list-item-votes-wrapper">
            <SVGIcon id="star-full" size={metrics.xl} color="primary" />
            <Styles.Gap />
            <Typography.ExtraSmallText testID="media-list-item-votes">
              {`${props.voteAverage?.toFixed(1)} (${props.voteCount})`}
            </Typography.ExtraSmallText>
          </Styles.StarsContentWrapper>
        )}
      </Styles.Wrapper>
    );
  },
  () => true,
);
