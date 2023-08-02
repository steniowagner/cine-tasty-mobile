import React from 'react';
import {useHeaderHeight} from '@react-navigation/elements';

import {TMDBImageWithFallback} from '@components';

import {MediaHeadline} from './components/media-headline/MediaHeadline';
import * as Styles from './HeaderInfo.styles';
import {Tags} from '../../sections/tags/Tags';

type HeaderInfoProps = {
  votesAverage: number;
  voteCount: number;
  poster: string;
  title: string;
  tags: string[];
  extraTags: string[];
};

export const HeaderInfo = (props: HeaderInfoProps) => {
  const headerHeight = useHeaderHeight();
  return (
    <Styles.Wrapper headerHeight={headerHeight} testID="header-info-wrapper">
      <Styles.SmokeShadow />
      <TMDBImageWithFallback
        iconImageLoading="video-vintage"
        iconImageError="image-off"
        imageType="poster"
        style={Styles.sheet.poster}
        iconSize={Styles.POSTER_IMAGE_ICON_SIZE}
        image={props.poster}
        testID="poster-image"
      />
      <Styles.MediaHeadlineWrapper>
        <MediaHeadline
          title={props.title}
          voteCount={props.voteCount}
          voteAverage={props.votesAverage}
        />
      </Styles.MediaHeadlineWrapper>
      <Tags extraTags={props.extraTags} tags={props.tags} />
    </Styles.Wrapper>
  );
};
