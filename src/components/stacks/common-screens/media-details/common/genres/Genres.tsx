import React from 'react';

import { Typography } from '@common-components';
import { dark } from '@styles/themes';

import * as Styles from './Genres.styles';

type GenresProps = {
  mediaType: string;
  genres: string[];
};

export const Genres = (props: GenresProps) => (
  <Styles.Wrapper testID="genres">
    <Styles.Item testID="genre-media-type-item" isGenre={false}>
      <Typography.ExtraSmallText
        testID="genre-media-type-text"
        color="white"
        bold>
        {props.mediaType}
      </Typography.ExtraSmallText>
    </Styles.Item>
    {props.genres.map(genre => (
      <Styles.Item isGenre key={genre} testID="genre-item">
        <Typography.ExtraSmallText
          color={dark.colors.buttonText}
          testID="genre-text"
          bold>
          {genre}
        </Typography.ExtraSmallText>
      </Styles.Item>
    ))}
  </Styles.Wrapper>
);
