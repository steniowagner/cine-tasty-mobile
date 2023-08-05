import React, {useMemo} from 'react';

import metrics from '@styles/metrics';
import {TMDBImageWithFallback, SVGIcon} from '@components';

import * as Styles from './MediaListItem.styles';

type MediaListItemProps = {
  layoutSize: Styles.LayoutSize;
  onPress: () => void;
  testID?: string;
  voteAverage?: number;
  voteCount?: number;
  image: string;
  title: string;
};

export const MediaListItem = (props: MediaListItemProps) => {
  const imageStyles = useMemo(
    () => Styles.makeImageStyles(props.layoutSize).image,
    [],
  );

  return (
    <Styles.Wrapper
      testID={props.testID || 'simplified-media-list-button'}
      onPress={props.onPress}
      layoutSize={props.layoutSize}>
      <TMDBImageWithFallback
        iconImageLoading="video-vintage"
        iconImageError="image-off"
        imageType="poster"
        style={imageStyles}
        iconSize={Styles.IMAGE_LOADING_ICON_SIZE}
        image={props.image}
        testID="simplified-media-list-image"
      />
      <Styles.DefaultText
        layoutSize={props.layoutSize}
        testID="simplified-media-list-title">
        {props.title}
      </Styles.DefaultText>
      {typeof props.voteAverage === 'number' &&
        typeof props.voteCount === 'number' && (
          <Styles.StarsContentWrapper>
            <SVGIcon
              id="star-full"
              size={metrics.extraLargeSize}
              colorThemeRef="primary"
            />
            <Styles.Gap />
            <Styles.DefaultText
              layoutSize={props.layoutSize}
              testID="simplified-media-list-votes">
              {`${props.voteAverage.toFixed(1)} (${props.voteCount})`}
            </Styles.DefaultText>
          </Styles.StarsContentWrapper>
        )}
    </Styles.Wrapper>
  );
};
