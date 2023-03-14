import React from 'react';

import {useTMDBImage} from '@components';

import * as Styles from './BackgroundImage.styles';

type BackgroundImageProps = {
  isLoading: boolean;
  image: string;
};

export const BackgroundImage = (props: BackgroundImageProps) => {
  const tmdbImage = useTMDBImage({
    isThumbnail: true,
    imageType: 'poster',
    image: props.image,
  });

  return (
    <Styles.Wrapper testID="background-image-wrapper">
      <Styles.BackgroundImage blurRadius={1} source={{uri: tmdbImage.uri}} />
      <Styles.SmokeShadow />
    </Styles.Wrapper>
  );
};
