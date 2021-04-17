import React from 'react';
import { ScrollView } from 'react-native';

import * as Styles from './EpisodeOverviewDetail.styles';

type Props = {
  overview: string;
};

const EpisodeOverviewDetail = ({ overview }: Props) => (
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
