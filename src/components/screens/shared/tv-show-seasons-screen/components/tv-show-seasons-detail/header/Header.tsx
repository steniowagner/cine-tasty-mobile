import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import SeasonPosterImage from 'components/screens/shared/media-detail-screen/common/header-info/PosterImage';
import SeasonOverviewText from './overview-text/season-overview-text/SeasonOverviewText';

const Wrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.metrics.extraLargeSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const SeasonPosterImageWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('30%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('40%')}px;
`;

type Props = {
  overview: string;
  image: string;
};

const Header = ({ overview, image }: Props) => (
  <Wrapper
    testID="header-wrapper"
  >
    <SeasonPosterImageWrapper
      testID="poster-image-wrapper"
    >
      <SeasonPosterImage
        image={image}
      />
    </SeasonPosterImageWrapper>
    <SeasonOverviewText
      overview={overview}
    />
  </Wrapper>
);

export default Header;
