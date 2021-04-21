import React from 'react';

import SeasonPosterImage from '@components/screens/shared/media-detail/common/header-info/poster-image/PosterImage';

import SeasonOverviewText from './overview-text/season-overview-text/SeasonOverviewText';
import * as Styles from './Header.styles';

type HeaderProps = {
  overview: string;
  image: string;
};

const Header = ({ overview, image }: HeaderProps) => (
  <Styles.Wrapper
    testID="header-wrapper"
  >
    <Styles.SeasonPosterImageWrapper
      testID="poster-image-wrapper"
    >
      <SeasonPosterImage
        image={image}
      />
    </Styles.SeasonPosterImageWrapper>
    <SeasonOverviewText
      overview={overview}
    />
  </Styles.Wrapper>
);

export default Header;
