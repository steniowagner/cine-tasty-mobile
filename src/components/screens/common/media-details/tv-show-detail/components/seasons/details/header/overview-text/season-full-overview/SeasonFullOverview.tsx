import React from 'react';
import {ScrollView} from 'react-native';

import * as SeasonFullOverviewStyles from './SeasonFullOverview.styles';

type SeasonFullOverviewProps = {
  overview: string;
};

const SeasonFullOverview = (props: SeasonFullOverviewProps) => (
  <ScrollView testID="season-full-overview-wrapper" bounces={false}>
    <SeasonFullOverviewStyles.FullOverviewText testID="overview-text">
      {props.overview}
    </SeasonFullOverviewStyles.FullOverviewText>
  </ScrollView>
);

export default SeasonFullOverview;
