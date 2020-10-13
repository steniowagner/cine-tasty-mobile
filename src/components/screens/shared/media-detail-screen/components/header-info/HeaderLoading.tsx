import React from 'react';
import { View } from 'react-native';
import styled, { DefaultTheme, withTheme } from 'styled-components';

import LoadingPlaceholder from 'components/common/loading-placeholder/LoadingPlaceholder';
import CONSTANTS from 'utils/constants';
import metrics from 'styles/metrics';

import {
  BackgroundImageWrapper,
  MediaInfoWrapper,
  posterImageStyles,
  SmokeShadow,
  Wrapper,
} from './common';

const ContentWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
`;

const TextPlaceholderWrapper = styled(View)`
  width: 60%;
  margin-left: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

type Props = {
  theme: DefaultTheme;
};

const HeaderLoading = ({ theme }: Props) => (
  <Wrapper>
    <BackgroundImageWrapper>
      <LoadingPlaceholder
        colors={theme.colors.loadingColors}
        indexToDelayAnimation={2}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      <SmokeShadow />
    </BackgroundImageWrapper>
    <ContentWrapper>
      <MediaInfoWrapper>
        <LoadingPlaceholder
          colors={theme.colors.loadingColors}
          indexToDelayAnimation={3}
          style={posterImageStyles}
        />
        <TextPlaceholderWrapper>
          <LoadingPlaceholder
            colors={theme.colors.loadingColors}
            indexToDelayAnimation={4}
            style={{
              borderRadius: posterImageStyles.borderRadius,
              height: metrics.getWidthFromDP('11%'),
              marginBottom: metrics.mediumSize,
            }}
          />
          <LoadingPlaceholder
            colors={theme.colors.loadingColors}
            indexToDelayAnimation={5}
            style={{
              borderRadius: posterImageStyles.borderRadius,
              height: metrics.getWidthFromDP('11%'),
            }}
          />
        </TextPlaceholderWrapper>
      </MediaInfoWrapper>
    </ContentWrapper>
  </Wrapper>
);

export default withTheme(HeaderLoading);
