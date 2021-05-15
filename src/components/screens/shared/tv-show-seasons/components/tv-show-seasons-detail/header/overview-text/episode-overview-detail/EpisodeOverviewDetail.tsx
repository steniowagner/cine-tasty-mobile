import React from 'react';
import { ScrollView } from 'react-native';

import * as Styles from './EpisodeOverviewDetail.styles';

type EpisodeOverviewDetailProps = {
  overview: string;
};

const EpisodeOverviewDetail = (props: EpisodeOverviewDetailProps) => (
  <Styles.Wrapper>
    <ScrollView>
      <Styles.DescriptionText
        testID="overview-description-text"
      >
        {props.overview}
      </Styles.DescriptionText>
    </ScrollView>
  </Styles.Wrapper>
);

export default EpisodeOverviewDetail;
