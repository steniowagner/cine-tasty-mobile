import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled, { DefaultTheme, withTheme } from 'styled-components';

import LoadingPlaceholder from 'components/common/loading-placeholder/LoadingPlaceholder';
import ProgressiveImage from 'components/common/progressive-image/ProgressiveImage';
import { useGetCurrentTheme } from 'hooks';
import { ThemeId } from 'types';

type SmokeShadowStyleProps = {
  currentTheme: ThemeId;
};

const Wrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
`;

const SmokeShadow = styled(LinearGradient).attrs<SmokeShadowStyleProps>(
  ({ currentTheme, theme }) => {
    if (currentTheme === ThemeId.DARK) {
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
        ...Array(5).fill(theme.colors.backgroundAlphax4),
        theme.colors.backgroundAlphax3,
        theme.colors.backgroundAlphax2,
        theme.colors.background,
      ],
    };
  },
)`
  width: 100%;
  height: 100%;
  position: absolute;
`;

type Props = {
  theme: DefaultTheme;
  isLoading: boolean;
  imageURL: string;
};

const BackgroundImage = ({ isLoading, imageURL, theme }: Props) => {
  const { currentTheme } = useGetCurrentTheme({ theme });

  return (
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
      <SmokeShadow
        currentTheme={currentTheme}
      />
    </Wrapper>
  );
};

export default withTheme(BackgroundImage);
