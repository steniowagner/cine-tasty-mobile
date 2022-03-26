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

export const SimplifiedMediaListItem = ({
  voteAverage,
  voteCount,
  onPress,
  image,
  title,
}: SimplifiedMediaListItemProps) => {
  const {isFallbackImageVisible, hasError, onError, opacity, onLoad} =
    useLoadListItemImage({
      image,
    });

  return (
    <Styles.Wrapper testID="simplified-media-list-button" onPress={onPress}>
      <>
        <TMDBImage
          imageType="poster"
          onError={onError}
          onLoad={onLoad}
          image={image}
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
        {isFallbackImageVisible && (
          <Styles.FallbackImageWrapper
            testID="fallback-image-wrapper"
            style={[
              {
                opacity,
              },
            ]}>
            {renderSVGIconConditionally({
              condition: hasError,
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
      <Styles.DefaultText>{title}</Styles.DefaultText>
      <Styles.StarsContentWrapper>
        <SVGIcon
          id="star-full"
          size={metrics.getWidthFromDP('6%')}
          colorThemeRef="primary"
        />
        <Styles.DefaultText withMarginLeft>
          {`${voteAverage.toFixed(1)} (${voteCount})`}
        </Styles.DefaultText>
      </Styles.StarsContentWrapper>
    </Styles.Wrapper>
  );
};
