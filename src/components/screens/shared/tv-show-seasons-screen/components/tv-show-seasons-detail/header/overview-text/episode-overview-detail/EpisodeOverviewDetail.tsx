import React from 'react';
import { ScrollView } from 'react-native';

import * as Styles from './EpisodeOverviewDetail.styles';

type EpisodeOverviewDetailProps = {
  overview: string;
};

const EpisodeOverviewDetail = ({ overview }: EpisodeOverviewDetailProps) => (
  <Styles.Wrapper>
    <ScrollView>
      <Styles.DescriptionText
        testID="overview-description-text"
      >
        {overview}
      </Styles.DescriptionText>
    </ScrollView>
  </Styles.Wrapper>
);

export default EpisodeOverviewDetail;
