import React from 'react';

import { LoadingPlaceholder } from '@common-components';

import * as Styles from './MediaDetails.styles';

export const MediaDetailsLoading = () => (
  <Styles.Wrapper testID="media-details-loading">
    <LoadingPlaceholder indexToDelayAnimation={0} style={Styles.sheet.poster} />
    <LoadingPlaceholder indexToDelayAnimation={1} style={Styles.sheet.title} />
    <LoadingPlaceholder indexToDelayAnimation={2} style={Styles.sheet.stars} />
  </Styles.Wrapper>
);
