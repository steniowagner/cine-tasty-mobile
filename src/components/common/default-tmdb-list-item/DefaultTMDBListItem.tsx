import React, { memo } from 'react';

import { Icons, TMDBImage } from '@common-components';

import * as Styles from './DefaultTMDBListItem.styles';

type DefaultTMDBListItemProps = {
  iconImageLoading: Icons;
  iconImageError: Icons;
  onPress: () => void;
  testID: string;
  image: string;
  title: string;
};

export const DefaultTMDBListItem = memo(
  (props: DefaultTMDBListItemProps) => (
    <Styles.Wrapper testID={props.testID} onPress={props.onPress}>
      <TMDBImage
        imageType="profile"
        image={props.image}
        style={Styles.sheet.image}
        iconImageLoading={props.iconImageLoading}
        iconImageError={props.iconImageError}
        iconSize={Styles.DEFAULT_ICON_SIZE}
      />
      <Styles.FamousName testID="title-text">{props.title}</Styles.FamousName>
    </Styles.Wrapper>
  ),
  () => true,
);
