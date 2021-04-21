import React from 'react';
import { DefaultTheme, withTheme } from 'styled-components';

import LoadingPlaceholder from '@components/common/loading-placeholder/LoadingPlaceholder';
import ProgressiveImage from '@components/common/progressive-image/ProgressiveImage';
import { useGetCurrentTheme } from '@hooks';

import * as Styles from './BackgroundImage.styles';

type BackgroundImageProps = {
  theme: DefaultTheme;
  isLoading: boolean;
  imageURL: string;
};

const BackgroundImage = ({ isLoading, imageURL, theme }: BackgroundImageProps) => {
  const { currentTheme } = useGetCurrentTheme({ theme });

  return (
    <Styles.Wrapper
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
      <Styles.SmokeShadow
        currentTheme={currentTheme}
      />
    </Styles.Wrapper>
  );
};

export default withTheme(BackgroundImage);
