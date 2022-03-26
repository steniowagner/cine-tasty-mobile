import React from 'react';

import {renderSVGIconConditionally, TMDBImage, SVGIcon} from '@components';
import {useLoadListItemImage} from '@hooks';
import metrics from '@styles/metrics';
import * as Types from '@local-types';

import * as Styles from './RecentSearchesListItem.styles';

type RecentSearchesListItemProps = {
  item: Types.RecentSearchItem;
  onPressRemove: () => void;
  onPressItem: () => void;
};

const RecentSearchesListItem = (props: RecentSearchesListItemProps) => {
  const loadListImage = useLoadListItemImage({
    image: props.item.image,
  });
  return (
    <Styles.Wrapper testID="recent-searches-list-item">
      <Styles.PressableContent
        onPress={props.onPressItem}
        testID="recent-searches-list-item-button">
        <>
          <TMDBImage
            onError={loadListImage.onError}
            onLoad={loadListImage.onLoad}
            image={props.item.image}
            imageType="profile"
            style={{
              width: metrics.getWidthFromDP(Styles.IMAGE_WIDTH_PERCENTAGE),
              height: metrics.getWidthFromDP(Styles.IMAGE_HEIGHT_PERCENTAGE),
              borderRadius: metrics.smallSize,
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

export default RecentSearchesListItem;
