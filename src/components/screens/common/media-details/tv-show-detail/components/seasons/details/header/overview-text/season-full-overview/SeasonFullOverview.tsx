import React from 'react';
import {ScrollView} from 'react-native';

import * as SeasonFullOverviewStyles from './SeasonFullOverview.styles';

type SeasonFullOverviewProps = {
  overview: string;
};

export const SeasonFullOverview = (props: SeasonFullOverviewProps) => (
  <ScrollView testID="season-full-overview-wrapper" bounces={false}>
    <SeasonFullOverviewStyles.FullOverviewText testID="overview-text">
      {props.overview}
    </SeasonFullOverviewStyles.FullOverviewText>
  </ScrollView>
);
