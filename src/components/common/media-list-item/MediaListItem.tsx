import React from 'react';

import {renderSVGIconConditionally, SVGIcon} from '@components';
import {useImageFallbackView} from '@hooks';
import metrics from '@styles/metrics';

import * as Styles from './MediaListItem.styles';

type MediaListItemProps = {
  layoutSize: Styles.LayoutSize;
  marginLeft?: number;
  onPress: () => void;
  testID?: string;
  voteAverage?: number;
  voteCount?: number;
  image: string;
  title: string;
};

export const MediaListItem = (props: MediaListItemProps) => {
  const imageFallbackView = useImageFallbackView({
    image: props.image,
  });

  return (
    <Styles.Wrapper
      testID={props.testID || 'simplified-media-list-button'}
      onPress={props.onPress}
      layoutSize={props.layoutSize}
      marginLeft={props.marginLeft}>
      <>
        <Styles.CustomTMDBImage
          imageType="poster"
          layoutSize={props.layoutSize}
          onError={imageFallbackView.onError}
          onLoad={imageFallbackView.onLoad}
          image={props.image}
          testID="simplified-media-list-image"
          style={{}}
        />
        {imageFallbackView.isFallbackImageVisible && (
          <Styles.FallbackImageWrapper
            testID="fallback-image-wrapper"
            layoutSize={props.layoutSize}
            style={imageFallbackView.imageFallbackViewStyle}>
            {renderSVGIconConditionally({
              condition: imageFallbackView.hasError,
              ifTrue: {
                colorThemeRef: 'fallbackImageIcon',
                size: Styles.IMAGE_LOADING_ICON_SIZE,
                id: 'image-off',
              },
              ifFalse: {
                colorThemeRef: 'fallbackImageIcon',
                size: Styles.IMAGE_LOADING_ICON_SIZE,
                id: 'video-vintage',
              },
            })}
          </Styles.FallbackImageWrapper>
        )}
      </>
      <Styles.DefaultText
        layoutSize={props.layoutSize}
        testID="simplified-media-list-title">
        {props.title}
      </Styles.DefaultText>
      {!!props.voteAverage && !!props.voteCount && (
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
