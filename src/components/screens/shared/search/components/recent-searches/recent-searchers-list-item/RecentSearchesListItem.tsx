import React from 'react';

import renderSVGIconConditionally from '@components/common/svg-icon/renderSVGIconConditionally';
import TMDBImage from '@components/common/tmdb-image/TMDBImage';
import SVGIcon from '@components/common/svg-icon/SVGIcon';
import { useLoadListItemImage } from '@hooks';
import metrics from '@styles/metrics';
import * as Types from '@local-types';

import * as Styles from './RecentSearchesListItem.styles';

type RecentSearchesListItemProps = {
  item: Types.RecentSearchItem;
  onPressRemove: () => void;
  onPressItem: () => void;
};

const RecentSearchesListItem = (props: RecentSearchesListItemProps) => {
  const loadListItemImage = useLoadListItemImage({
    image: props.item.image,
  });

  return (
    <Styles.Wrapper
      testID="recent-searches-list-item"
    >
      <Styles.PressableContent
        onPress={props.onPressItem}
        testID="recent-searches-list-item-button"
      >
        <>
          <TMDBImage
            onError={loadListItemImage.onError}
            onLoad={loadListItemImage.onLoad}
            image={props.item.image}
            imageType="profile"
            style={{
              width: metrics.getWidthFromDP(Styles.IMAGE_WIDTH_PERCENTAGE),
              height: metrics.getWidthFromDP(Styles.IMAGE_HEIGHT_PERCENTAGE),
              borderRadius: metrics.smallSize,
            }}
          />
          {loadListItemImage.isFallbackImageVisible && (
            <Styles.FallbackImageWrapper
              testID="fallback-image-wrapper"
              style={[
                {
                  opacity: loadListItemImage.opacity,
                },
              ]}
            >
              {renderSVGIconConditionally({
                condition: loadListItemImage.hasError,
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
        onPress={props.onPressRemove}
      >
        <SVGIcon
          size={metrics.extraLargeSize}
          id="close"
        />
      </Styles.CloseButtonWrapper>
    </Styles.Wrapper>
  );
};

export default RecentSearchesListItem;
