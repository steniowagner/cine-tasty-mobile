import React from 'react';
import {useHeaderHeight} from '@react-navigation/elements';

import {MediaHeadline} from '@components';

import {PosterImage} from '../poster-image/PosterImage';
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
      <PosterImage loadingIcon="video-vintage" image={props.poster} />
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
