import React from 'react';

import {renderSVGIconConditionally, TMDBImage, SVGIcon} from '@components';
import {useImageFallbackView} from '@hooks';
import metrics from '@styles/metrics';
import * as Types from '@local-types';

import * as Styles from './RecentSearchesListItem.styles';

type RecentSearchesListItemProps = {
  item: Types.RecentSearchItem;
  onPressRemove: () => void;
  onPressItem: () => void;
};

export const RecentSearchesListItem = (props: RecentSearchesListItemProps) => {
  const imageFallbackView = useImageFallbackView({
    image: props.item.image,
  });
  return (
    <Styles.Wrapper testID="recent-searches-list-item">
      <Styles.PressableContent
        onPress={props.onPressItem}
        testID="recent-searches-list-item-button">
        <>
          <TMDBImage
            onError={imageFallbackView.onError}
            onLoad={imageFallbackView.onLoad}
            image={props.item.image}
            imageType="profile"
            style={{
              width: metrics.getWidthFromDP(Styles.IMAGE_WIDTH_PERCENTAGE),
              height: metrics.getWidthFromDP(Styles.IMAGE_HEIGHT_PERCENTAGE),
              borderRadius: metrics.smallSize,
            }}
          />
          {imageFallbackView.isFallbackImageVisible && (
            <Styles.FallbackImageWrapper
              testID="fallback-image-wrapper"
              style={[
                {
                  opacity: imageFallbackView.opacity,
                },
              ]}>
              {renderSVGIconConditionally({
                condition: imageFallbackView.hasError,
                ifTrue: {
                  colorThemeRef: 'fallbackImageIcon',
                  size: Styles.DEFAULT_ICON_SIZE,
                  id: 'image-off',
                },
                ifFalse: {
                  colorThemeRef: 'fallbackImageIcon',
                  size: Styles.DEFAULT_ICON_SIZE,
                  id: 'account',
                },
              })}
            </Styles.FallbackImageWrapper>
          )}
        </>
        <Styles.ItemText>{props.item.title}</Styles.ItemText>
      </Styles.PressableContent>
      <Styles.CloseButtonWrapper
        testID="recent-searches-list-item-close-button"
        onPress={props.onPressRemove}>
        <SVGIcon size={metrics.extraLargeSize} id="close" />
      </Styles.CloseButtonWrapper>
    </Styles.Wrapper>
  );
};
