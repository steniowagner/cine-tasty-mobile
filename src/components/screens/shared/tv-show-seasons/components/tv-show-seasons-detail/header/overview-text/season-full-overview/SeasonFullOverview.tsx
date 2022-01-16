import React from 'react';
import { ScrollView } from 'react-native';

import * as SeasonFullOverviewStyles from './SeasonFullOverview.styles';

type SeasonFullOverviewProps = {
  overview: string;
};

const SeasonFullOverview = ({ overview }: SeasonFullOverviewProps) => (
  <ScrollView
    bounces={false}
    testID="season-full-overview-wrapper"
  >
    <SeasonFullOverviewStyles.FullOverviewText
      testID="overview-text"
    >
      {overview}
    </SeasonFullOverviewStyles.FullOverviewText>
  </ScrollView>
);

export default SeasonFullOverview;
