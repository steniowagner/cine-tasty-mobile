import React from 'react';
import {DefaultTheme, withTheme} from 'styled-components/native';

import {LoadingPlaceholder, ProgressiveImage} from '@components';
import {useGetCurrentTheme} from '@hooks';

import * as Styles from './BackgroundImage.styles';

type BackgroundImageProps = {
  theme: DefaultTheme;
  isLoading: boolean;
  imageURL: string;
};

export const BackgroundImage = (props: BackgroundImageProps) => {
  const getCurrentTheme = useGetCurrentTheme({theme: props.theme});
  return (
    <Styles.Wrapper testID="background-image-wrapper">
      {props.isLoading ? (
        <LoadingPlaceholder
          testID="background-image-loading"
          indexToDelayAnimation={2}
          style={Styles.LoadingPlaceholderStyle}
        />
      ) : (
        <ProgressiveImage
          imageType="backdrop"
          image={props.imageURL}
          borderRadius={0}
        />
      )}
      <Styles.SmokeShadow
        // @ts-ignore
        currentTheme={getCurrentTheme.currentTheme}
      />
    </Styles.Wrapper>
  );
};

export default withTheme(BackgroundImage);
