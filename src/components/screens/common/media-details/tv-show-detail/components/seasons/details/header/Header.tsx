import React from 'react';

import {TMDBImageWithFallback} from '@components';

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
      <TMDBImageWithFallback
        imageType="profile"
        testID="profile-image"
        image={props.image}
        style={Styles.sheet.poster}
        iconImageLoading="video-vintage"
        iconImageError="image-off"
        iconSize={Styles.IMAGE_OFF_ICON_SIZE}
      />
    </Styles.SeasonPosterImageWrapper>
    <SeasonOverviewText season={props.season} overview={props.overview} />
  </Styles.Wrapper>
);
