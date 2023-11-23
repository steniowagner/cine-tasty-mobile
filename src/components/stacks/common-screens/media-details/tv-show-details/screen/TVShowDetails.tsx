import React from 'react';

import {
  ScrollWithAnimatedHeader,
  StatusBar,
  Advice,
} from '@common-components';

import { MediaDetailsLoading, BackgroundImage, Header } from '../../common';
import { TVShowDetailsProps } from '../routes/route-params-types';
import { useTVShowDetails } from './use-tv-show-detailts';
import { Genres } from '../../common/genres/Genres';
import * as Styles from './TVShowDetails.styles';

export const TVShowDetails = (props: TVShowDetailsProps) => {
  const tvShowDetails = useTVShowDetails({
    voteAverage: props.route.params.voteAverage,
    voteCount: props.route.params.voteCount,
    genres: props.route.params.genres,
    id: props.route.params.id,
  });

  return (
    <>
      <StatusBar />
      {tvShowDetails.shouldShowBackgroundImage && (
        <BackgroundImage image={props.route.params.image || ''} />
      )}
      <ScrollWithAnimatedHeader
        canBounce={!tvShowDetails.isLoading && !tvShowDetails.hasError}
        headerTitle={props.route.params.title || '-'}
        isScrollEnabled
        backgroundColorInterpolationInput={
          tvShowDetails.headerInterpolationValues.backgroudColor.input
        }
        backgroundColorInterpolationOutput={
          tvShowDetails.headerInterpolationValues.backgroudColor.output
        }
        titleOpacityInterpolationInput={
          tvShowDetails.headerInterpolationValues.title.input
        }
        titleOpacityInterpolationOutput={
          tvShowDetails.headerInterpolationValues.title.output
        }>
        <>
          {tvShowDetails.isLoading && <MediaDetailsLoading />}
          {tvShowDetails.hasError && (
            <Advice
              description={tvShowDetails.texts.advice.description}
              suggestion={tvShowDetails.texts.advice.suggestion}
              title={tvShowDetails.texts.advice.title}
              withMarginTop
              icon="alert-box"
            />
          )}
          {tvShowDetails.details && (
            <>
              <Header
                votesAverage={tvShowDetails.voteAverage}
                voteCount={tvShowDetails.voteCount}
                poster={props.route.params.image || ''}
                title={tvShowDetails.details.title || '-'}
                mediaType={tvShowDetails.texts.tvShowTag}
              />
              <Genres
                mediaType={tvShowDetails.texts.tvShowTag}
                genres={tvShowDetails.genres}
              />
            </>
          )}
        </>
      </ScrollWithAnimatedHeader>
    </>
  );
};
