import React from 'react';

import {
  ScrollWithAnimatedHeader,
  MediaItemDescription,
  StatusBar,
  Advice,
  Section,
  ImagesList,
  MediaHorizontalList,
} from '@common-components';

import { MovieDetailsProps } from '../routes/route-params-types';
import { useMovieDetails } from './use-movie-details';
import {
  BackgroundImage,
  Header,
  MediaDetailsLoading,
  TextContentWrapper,
  OverviewWrapper,
  SectionWrapper,
  MediaInfo,
  SectionContentWrapper,
  ParticipantsList,
  Videos,
} from '../../common';

export const MovieDetails = (props: MovieDetailsProps) => {
  const movieDetails = useMovieDetails(props);

  return (
    <>
      <StatusBar />
      {movieDetails.shouldShowBackgroundImage && (
        <BackgroundImage image={props.route.params.image || ''} />
      )}
      <ScrollWithAnimatedHeader
        canBounce={!movieDetails.isLoading && !movieDetails.hasError}
        headerTitle={props.route.params.title || '-'}
        isScrollEnabled
        backgroundColorInterpolationInput={
          movieDetails.headerInterpolationValues.backgroudColor.input
        }
        backgroundColorInterpolationOutput={
          movieDetails.headerInterpolationValues.backgroudColor.output
        }
        titleOpacityInterpolationInput={
          movieDetails.headerInterpolationValues.title.input
        }
        titleOpacityInterpolationOutput={
          movieDetails.headerInterpolationValues.title.output
        }>
        <>
          {movieDetails.isLoading && <MediaDetailsLoading />}
          {movieDetails.hasError && (
            <Advice
              description={movieDetails.texts.advice.description}
              suggestion={movieDetails.texts.advice.suggestion}
              title={movieDetails.texts.advice.title}
              withMarginTop
              icon="alert-box"
            />
          )}
          {movieDetails.details && (
            <>
              <Header
                votesAverage={
                  props.route.params.voteAverage ||
                  movieDetails.details.voteAverage ||
                  0
                }
                voteCount={
                  props.route.params.voteCount ||
                  movieDetails.details.voteCount ||
                  0
                }
                poster={props.route.params.image || ''}
                title={movieDetails.details.title || '-'}
                genres={movieDetails.genres}
              />
              <TextContentWrapper testID="movie-details">
                <OverviewWrapper>
                  <MediaItemDescription
                    description={movieDetails.details.overview || '-'}
                    alignment="center"
                  />
                </OverviewWrapper>
                <SectionWrapper>
                  <MediaInfo infos={movieDetails.infoItems} />
                </SectionWrapper>
                {!!movieDetails.details.cast.length && (
                  <SectionWrapper>
                    <Section title={movieDetails.texts.sections.cast}>
                      <SectionContentWrapper>
                        <ParticipantsList
                          onPress={movieDetails.onPressParticipant}
                          participants={movieDetails.details.cast}
                        />
                      </SectionContentWrapper>
                    </Section>
                  </SectionWrapper>
                )}
                {!!movieDetails.details.crew.length && (
                  <SectionWrapper>
                    <Section title={movieDetails.texts.sections.crew}>
                      <SectionContentWrapper>
                        <ParticipantsList
                          onPress={movieDetails.onPressParticipant}
                          participants={movieDetails.details.crew}
                        />
                      </SectionContentWrapper>
                    </Section>
                  </SectionWrapper>
                )}
                {!!movieDetails.details.images.length && (
                  <SectionWrapper>
                    <ImagesList
                      images={movieDetails.details.images}
                      orientation="LANDSCAPE"
                    />
                  </SectionWrapper>
                )}
                {!!movieDetails.details.videos.length && (
                  <SectionWrapper>
                    <Section title={movieDetails.texts.sections.videos}>
                      <Videos videos={movieDetails.details.videos} />
                    </Section>
                  </SectionWrapper>
                )}
                {!!movieDetails.details.similar.length && (
                  <SectionWrapper>
                    <MediaHorizontalList
                      dataset={movieDetails.details.similar}
                      type="MOVIE"
                      title={movieDetails.texts.sections.similar}
                    />
                  </SectionWrapper>
                )}
              </TextContentWrapper>
            </>
          )}
        </>
      </ScrollWithAnimatedHeader>
    </>
  );
};
