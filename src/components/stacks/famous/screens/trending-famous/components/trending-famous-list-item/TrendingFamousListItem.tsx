import React, { memo } from 'react';

import { TMDBImage } from '@common-components';

import * as Styles from './TrendingFamousListItem.styles';

type TrendingFamousListItemProps = {
  onPress: () => void;
  image: string;
  title: string;
};

export const TrendingFamousListItem = memo(
  (props: TrendingFamousListItemProps) => (
    <Styles.Wrapper
      testID="trending-famous-list-item-button"
      onPress={props.onPress}>
      <TMDBImage
        imageType="profile"
        testID="famous-list-item-image"
        image={props.image}
        style={Styles.sheet.image}
        iconImageLoading="account"
        iconImageError="image-off"
        iconSize={Styles.DEFAULT_ICON_SIZE}
      />
      <Styles.PersonName testID="title-text">{props.title}</Styles.PersonName>
    </Styles.Wrapper>
  ),
  () => true,
);
