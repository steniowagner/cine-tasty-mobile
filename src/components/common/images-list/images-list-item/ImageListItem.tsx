import React, { useMemo } from 'react';

import { TMDBImage } from '@common-components';

import * as Styles from './ImageListItem.styles';

type ImageListItemProps = Styles.ImageOrientation & {
  onPress: () => void;
  image: string;
};

export const ImageListItem = (props: ImageListItemProps) => {
  const imageStyles = useMemo(
    () => Styles.makeImageStyle(props.orientation),
    [props.orientation],
  );

  return (
    <Styles.Wrapper testID="image-list-item-button" onPress={props.onPress}>
      <TMDBImage
        iconImageLoading="account"
        iconImageError="image-off"
        imageType={props.orientation === 'PORTRAIT' ? 'profile' : 'still'}
        style={imageStyles.image}
        iconSize={Styles.DEFAULT_ICON_SIZE}
        image={props.image}
        testID="image-list-item"
      />
    </Styles.Wrapper>
  );
};
