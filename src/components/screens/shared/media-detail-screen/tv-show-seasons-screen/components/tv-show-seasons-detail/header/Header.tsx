import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import SeasonPosterImage from '../../../../common/header-info/PosterImage';
import SeasonOverviewText from './SeasonOverviewText';

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
  onPressReadMoreButton: () => void;
  overview: string;
  image: string;
};

const Header = ({ onPressReadMoreButton, overview, image }: Props) => (
  <Wrapper>
    <SeasonPosterImageWrapper>
      <SeasonPosterImage
        image={image}
      />
    </SeasonPosterImageWrapper>
    <SeasonOverviewText
      onPressReadMore={onPressReadMoreButton}
      overview={overview}
    />
  </Wrapper>
);

export default Header;
