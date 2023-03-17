import React from 'react';
import {useHeaderHeight} from '@react-navigation/elements';

import {LoadingPlaceholder} from '@components';

import * as Styles from './MediaDetails.styles';

export const MediaDetailsLoading = () => {
  const headerHeight = useHeaderHeight();

  return (
    <Styles.Wrapper headerHeight={headerHeight}>
      <LoadingPlaceholder
        indexToDelayAnimation={0}
        style={Styles.sheet.poster}
      />
      <LoadingPlaceholder
        indexToDelayAnimation={1}
        style={Styles.sheet.title}
      />
      <LoadingPlaceholder
        indexToDelayAnimation={2}
        style={Styles.sheet.stars}
      />
      <Styles.Row>
        <LoadingPlaceholder
          indexToDelayAnimation={3}
          style={Styles.sheet.genreItem}
        />
        <LoadingPlaceholder
          indexToDelayAnimation={4}
          style={Styles.sheet.middleGenreItem}
        />
        <LoadingPlaceholder
          indexToDelayAnimation={5}
          style={Styles.sheet.genreItem}
        />
      </Styles.Row>
      <Styles.Row>
        <LoadingPlaceholder
          indexToDelayAnimation={6}
          style={Styles.sheet.middleGenreItem}
        />
        <LoadingPlaceholder
          indexToDelayAnimation={7}
          style={Styles.sheet.genreItem}
        />
      </Styles.Row>
    </Styles.Wrapper>
  );
};
