import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';

import {TMDBImageWithFallback} from '@components';

import * as Styles from './FamousListItem.styles';

type FamousListItemProps = {
  onPress: () => void;
  image?: string;
  title?: string;
  index: number;
};

export const FamousListItem = memo(
  (props: FamousListItemProps) => (
    <Styles.Wrapper testID="famous-list-item-button" onPress={props.onPress}>
      <TMDBImageWithFallback
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
