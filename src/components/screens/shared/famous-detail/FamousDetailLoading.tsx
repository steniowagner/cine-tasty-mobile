import React from 'react';
import { View } from 'react-native';
import styled, { DefaultTheme, withTheme } from 'styled-components';

import MovieListLoading from 'components/common/movie-list/MovieListLoading';
import LoadingPlaceholder from 'components/common/loading-placeholder/LoadingPlaceholder';
import ImageListLoading from 'components/common/images-list/ImageListLoading';
import CONSTANTS from 'utils/constants';

import { DEFAULT_IMAGE_SIZE_PERCENTAGE } from './header/profile-image/ProfileImage';
import HeaderLoadingPlaceholder from './header/HeaderLoadingPlaceholder';

const HeaderLoadingWrapper = styled(View)`
  width: 100%;
  margin-left: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
  padding-top: ${({ theme }) => theme.metrics.getWidthFromDP('33%')
    + theme.metrics.getWidthFromDP(DEFAULT_IMAGE_SIZE_PERCENTAGE)}px;
`;

const DefaultLoadingWrapper = styled(View)`
  width: 100%;
  margin-left: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
  margin-top: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
`;

type Props = {
  theme: DefaultTheme;
};

const FamousDetailLoading = ({ theme }: Props) => (
  <>
    <LoadingPlaceholder
      colors={theme.colors.loadingColors}
      indexToDelayAnimation={4}
      style={{
        width: '100%',
        position: 'absolute',
        height:
            theme.metrics.getWidthFromDP('44%')
            + theme.metrics.getWidthFromDP(DEFAULT_IMAGE_SIZE_PERCENTAGE),
      }}
    />
    <HeaderLoadingWrapper>
      <HeaderLoadingPlaceholder />
    </HeaderLoadingWrapper>
    <DefaultLoadingWrapper>
      <ImageListLoading />
    </DefaultLoadingWrapper>
    <DefaultLoadingWrapper>
      <MovieListLoading />
    </DefaultLoadingWrapper>
  </>
);

export default withTheme(FamousDetailLoading);
