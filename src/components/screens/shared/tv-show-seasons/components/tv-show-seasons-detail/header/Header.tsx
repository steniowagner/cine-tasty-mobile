import React from 'react';

import SeasonPosterImage from '@components/screens/shared/media-detail/common/header-info/poster-image/PosterImage';

import SeasonOverviewText from './overview-text/season-overview-text/SeasonOverviewText';
import * as Styles from './Header.styles';

type HeaderProps = {
  overview: string;
  image: string;
};

const Header = (props: HeaderProps) => (
  <Styles.Wrapper
    testID="header-wrapper"
  >
    <Styles.SeasonPosterImageWrapper
      testID="poster-image-wrapper"
    >
      <SeasonPosterImage
        image={props.image}
      />
    </Styles.SeasonPosterImageWrapper>
    <SeasonOverviewText
      overview={props.overview}
    />
  </Styles.Wrapper>
);

export default Header;
