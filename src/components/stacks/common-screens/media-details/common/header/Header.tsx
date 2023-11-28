import React from 'react';

import { TMDBImage, Typography, StarsVotes } from '@common-components';

import * as Styles from './Header.styles';

type HeaderInfoProps = {
  votesAverage: number;
  voteCount: number;
  poster: string;
  title: string;
  genres?: string[];
  mediaType: string;
};

export const Header = (props: HeaderInfoProps) => (
  <Styles.Wrapper testID="header-info-wrapper">
    <Styles.SmokeShadow colors={[]} />
    <TMDBImage
      iconImageLoading="video-vintage"
      iconImageError="image-off"
      imageType="poster"
      style={Styles.sheet.poster}
      iconSize={Styles.POSTER_IMAGE_ICON_SIZE}
      image={props.poster}
      testID="poster-image"
    />
    <Styles.MediaHeadlineWrapper>
      <Typography.LargeText testID="media-title" alignment="center" bold>
        {props.title}
      </Typography.LargeText>
      <Styles.MiddleContent>
        <Styles.StarsWrapper>
          <StarsVotes
            voteCount={props.voteCount}
            votes={props.votesAverage}
            textColor="white"
            withText
          />
        </Styles.StarsWrapper>
        {props.genres?.length && (
          <Typography.ExtraSmallText testID="genres" alignment="center">
            {props.genres.join(' \u2022 ')}
          </Typography.ExtraSmallText>
        )}
      </Styles.MiddleContent>
    </Styles.MediaHeadlineWrapper>
  </Styles.Wrapper>
);
