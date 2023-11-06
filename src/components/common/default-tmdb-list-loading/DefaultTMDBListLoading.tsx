import React from 'react';
import { View } from 'react-native';

import * as DefaultTMDBListItemStyles from '../default-tmdb-list-item/DefaultTMDBListItem.styles';
import * as Styles from './DefaultTMDBListLoading.styles';
import { LoadingPlaceholder } from '..';

export const DefaultTMDBListLoading = () => (
  <Styles.LoadingWrapper testID="default-tmdb-list-loading">
    {Array(Styles.NUMBER_OF_LOADING_ITEMS)
      .fill({})
      .map((_, index) => (
        <View style={DefaultTMDBListItemStyles.sheet.loading} key={index}>
          <LoadingPlaceholder
            style={DefaultTMDBListItemStyles.sheet.loadingImage}
            indexToDelayAnimation={index}
          />
          <LoadingPlaceholder
            style={DefaultTMDBListItemStyles.sheet.loadingText}
            indexToDelayAnimation={index}
          />
        </View>
      ))}
  </Styles.LoadingWrapper>
);
