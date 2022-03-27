import React from 'react';

import {renderSVGIconConditionally, TMDBImage, SVGIcon} from '@components';
import {useLoadListItemImage} from '@hooks';
import metrics from '@styles/metrics';

import * as Styles from './SimplifiedMediaListItem.styles';

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('14%');

type SimplifiedMediaListItemProps = {
  onPress: () => void;
  voteAverage: number;
  voteCount: number;
  image: string;
  title: string;
};

export const SimplifiedMediaListItem = (
  props: SimplifiedMediaListItemProps,
) => {
  const loadListImage = useLoadListItemImage({
    image: props.image,
  });
  return (
    <Styles.Wrapper
      testID="simplified-media-list-button"
      onPress={props.onPress}>
      <>
        <TMDBImage
          imageType="poster"
          onError={loadListImage.onError}
          onLoad={loadListImage.onLoad}
          image={props.image}
          testID="simplified-media-list-image"
          style={{
            width: Styles.MEDIA_IMAGE_DEFAULT_WIDTH,
            height: Styles.MEDIA_IMAGE_DEFAULT_HEIGHT,
            marginBottom: metrics.getWidthFromDP(
              Styles.MEDIA_IMAGE_DEFAULT_MARGIN_BOTTOM,
            ),
            borderRadius: metrics.getWidthFromDP(
              Styles.MEDIA_IMAGE_DEFAULT_BORDER_RADIUS,
            ),
          }}
        />
        {loadListImage.isFallbackImageVisible && (
          <Styles.FallbackImageWrapper
            testID="fallback-image-wrapper"
            style={[
              {
                opacity: loadListImage.opacity,
              },
            ]}>
            {renderSVGIconConditionally({
              condition: loadListImage.hasError,
              ifTrue: {
                colorThemeRef: 'fallbackImageIcon',
                size: DEFAULT_ICON_SIZE,
                id: 'image-off',
              },
              ifFalse: {
                colorThemeRef: 'fallbackImageIcon',
                size: DEFAULT_ICON_SIZE,
                id: 'video-vintage',
              },
            })}
          </Styles.FallbackImageWrapper>
        )}
      </>
      <Styles.DefaultText testID="simplified-media-list-title">
        {props.title}
      </Styles.DefaultText>
      <Styles.StarsContentWrapper>
        <SVGIcon
          id="star-full"
          size={metrics.getWidthFromDP('6%')}
          colorThemeRef="primary"
        />
        <Styles.DefaultText testID="simplified-media-list-votes" withMarginLeft>
          {`${props.voteAverage.toFixed(1)} (${props.voteCount})`}
        </Styles.DefaultText>
      </Styles.StarsContentWrapper>
    </Styles.Wrapper>
  );
};
