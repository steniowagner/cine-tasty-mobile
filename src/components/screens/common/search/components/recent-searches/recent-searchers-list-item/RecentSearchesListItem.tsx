import React from 'react';

import {TMDBImageWithFallback, SVGIcon} from '@components';
import metrics from '@styles/metrics';
import * as Types from '@local-types';

import * as Styles from './RecentSearchesListItem.styles';

type RecentSearchesListItemProps = {
  item: Types.RecentSearchItem;
  onPressRemove: () => void;
  onPressItem: () => void;
};

export const RecentSearchesListItem = (props: RecentSearchesListItemProps) => (
  <Styles.Wrapper>
    <Styles.PressableContent
      onPress={props.onPressItem}
      testID="recent-searches-list-item-button">
      <>
        <TMDBImageWithFallback
          iconImageLoading="account"
          iconImageError="image-off"
          imageType="profile"
          style={Styles.sheet.image}
          iconSize={Styles.DEFAULT_ICON_SIZE}
          image={props.item.image}
          testID="recent-searches-list-item-image"
        />
      </>
      <Styles.ItemText testID="recent-searches-list-item-title">
        {props.item.title}
      </Styles.ItemText>
    </Styles.PressableContent>
    <Styles.CloseButtonWrapper
      testID="recent-searches-list-item-close-button"
      onPress={props.onPressRemove}>
      <SVGIcon size={metrics.extraLargeSize} id="close" />
    </Styles.CloseButtonWrapper>
  </Styles.Wrapper>
);
