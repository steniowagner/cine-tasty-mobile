import React from 'react';
import { View } from 'react-native';

import * as Styles from './DefaultTMDBListItem.styles';
import { LoadingPlaceholder } from '..';

type DefaultTMDBListItemLoadingPlaceholderProps = {
  indexToDelayAnimation: number;
};

export const DefaultTMDBListItemLoadingPlaceholder = (
  props: DefaultTMDBListItemLoadingPlaceholderProps,
) => (
  <View style={Styles.sheet.loading}>
    <LoadingPlaceholder
      style={Styles.sheet.loadingImage}
      indexToDelayAnimation={props.indexToDelayAnimation}
    />
    <LoadingPlaceholder
      style={Styles.sheet.loadingText}
      indexToDelayAnimation={props.indexToDelayAnimation}
    />
  </View>
);
