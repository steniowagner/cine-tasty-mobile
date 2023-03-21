import React from 'react';

// import {PosterImage} from '@src/components/screens/common/media-details/common/header-info/poster-image/PosterImage';

import {SeasonOverviewText} from './overview-text/season-overview-text/SeasonOverviewText';
import * as Styles from './Header.styles';

type HeaderProps = {
  overview: string;
  season: number;
  image: string;
};

export const Header = (props: HeaderProps) => (
  <Styles.Wrapper testID="header-wrapper">
    <Styles.SeasonPosterImageWrapper testID="poster-image-wrapper">
      {/* <PosterImage loadingIcon="video-vintage" image={props.image} /> */}
    </Styles.SeasonPosterImageWrapper>
    <SeasonOverviewText season={props.season} overview={props.overview} />
  </Styles.Wrapper>
);
