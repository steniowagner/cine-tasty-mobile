import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';

import {TMDBImageWithFallback} from '@components';

import {useFamousListItem} from './useFamousListItem';
import * as Styles from './FamousListItem.styles';

type FamousListItemProps = {
  onPress: () => void;
  image?: string;
  title?: string;
  index: number;
};

export const FamousListItem = memo(
  (props: FamousListItemProps) => {
    const famousListItem = useFamousListItem({
      image: props.image,
      index: props.index,
    });

    return (
      <TouchableOpacity
        testID="famous-list-item-button"
        style={{...famousListItem.measures}}
        onPress={props.onPress}>
        <TMDBImageWithFallback
          imageType="profile"
          testID="famous-list-item-image"
          image={props.image}
          style={{
            ...Styles.sheet.image,
          }}
          iconImageLoading="account"
          iconImageError="image-off"
          iconSize={Styles.DEFAULT_ICON_SIZE}
        />
        <Styles.PersonName testID="title-text">{props.title}</Styles.PersonName>
      </TouchableOpacity>
    );
  },
  () => true,
);
