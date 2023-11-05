import React from 'react';

import { TMDBImage, SVGIcon } from '@common-components';
import metrics from '@styles/metrics';

import * as Styles from './RecentSearchesListItem.styles';
import { SearchItem } from '../../../types';

type RecentSearchesListItemProps = {
  onPressRemove: () => void;
  onPressItem: () => void;
  item: SearchItem;
};

export const RecentSearchesListItem = (props: RecentSearchesListItemProps) => (
  <Styles.Wrapper>
    <Styles.PressableContent
      onPress={props.onPressItem}
      testID="recent-searches-list-item-button">
      <>
        <TMDBImage
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
      <SVGIcon size={metrics.xl} id="close" />
    </Styles.CloseButtonWrapper>
  </Styles.Wrapper>
);
