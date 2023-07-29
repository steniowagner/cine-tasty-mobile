import React from 'react';

import {LoadingPlaceholder} from '@components';

import * as Styles from './SearchMediaLoading.styles';

export const NUMBER_OF_ITEMS = 9;

export const SearchMediaLoading = () => (
  <Styles.Wrapper>
    {Array(NUMBER_OF_ITEMS)
      .fill({})
      .map((_, index) => (
        <LoadingPlaceholder
          indexToDelayAnimation={index}
          style={Styles.sheet.loadingItem}
          key={index}
        />
      ))}
  </Styles.Wrapper>
);
