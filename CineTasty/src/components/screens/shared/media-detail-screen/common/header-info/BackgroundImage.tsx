import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';

import LoadingPlaceholder from 'components/common/loading-placeholder/LoadingPlaceholder';
import ProgressiveImage from 'components/common/progressive-image/ProgressiveImage';
import { ThemeId } from 'types';

const Wrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
`;

const SmokeShadow = styled(LinearGradient).attrs(({ theme }) => {
  if (theme.id === ThemeId.DARK) {
    return {
      colors: [
        ...Array(5).fill('transparent'),
        theme.colors.backgroundAlphax4,
        theme.colors.backgroundAlphax3,
        theme.colors.backgroundAlphax2,
        theme.colors.backgroundAlphax1,
        theme.colors.background,
      ],
    };
  }

  return {
    colors: [
      theme.colors.backgroundAlphax4,
      theme.colors.backgroundAlphax3,
      theme.colors.backgroundAlphax2,
      theme.colors.background,
    ],
  };
})`
  width: 100%;
  height: 100%;
  position: absolute;
`;

type Props = {
  isLoading: boolean;
  imageURL: string;
};

const BackgroundImage = ({ isLoading, imageURL }: Props) => (
  <Wrapper
    testID="background-image-wrapper"
  >
    {isLoading ? (
      <LoadingPlaceholder
        testID="background-image-loading"
        indexToDelayAnimation={2}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    ) : (
      <ProgressiveImage
        imageType="backdrop"
        image={imageURL}
        borderRadius={0}
      />
    )}
    <SmokeShadow />
  </Wrapper>
);

export default BackgroundImage;
