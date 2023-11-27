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

import { TVShowDetailsProps } from '../routes/route-params-types';
import { useTVShowDetails } from './use-tv-show-detailts';
import {
  MediaDetailsLoading,
  BackgroundImage,
  Header,
  SectionContentWrapper,
  OverviewWrapper,
  TextContentWrapper,
  MediaInfo,
  SectionWrapper,
  Videos,
  ParticipantsList,
} from '../../common';
import { SeasonsSection } from './components/seasons-section/SeasonsSection';

export const TVShowDetails = (props: TVShowDetailsProps) => {
  const tvShowDetails = useTVShowDetails({
    navigation: props.navigation,
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
                genres={tvShowDetails.genres}
              />
              <TextContentWrapper>
                <Section title={tvShowDetails.texts.sections.overview}>
                  <OverviewWrapper>
                    <MediaItemDescription
                      description={tvShowDetails.details.overview || '-'}
                    />
                  </OverviewWrapper>
                </Section>
                <SectionWrapper>
                  <MediaInfo infos={tvShowDetails.infos} />
                </SectionWrapper>
                {!!tvShowDetails.details.images.length && (
                  <SectionWrapper>
                    <ImagesList
                      images={tvShowDetails.details.images}
                      orientation="LANDSCAPE"
                    />
                  </SectionWrapper>
                )}
                {!!tvShowDetails.crew.length && (
                  <SectionWrapper>
                    <Section title={tvShowDetails.texts.sections.crew}>
                      <SectionContentWrapper>
                        <ParticipantsList
                          onPress={tvShowDetails.onPressParticipant}
                          participants={tvShowDetails.crew}
                        />
                      </SectionContentWrapper>
                    </Section>
                  </SectionWrapper>
                )}
                {!!tvShowDetails.details.cast.length && (
                  <SectionWrapper>
                    <Section title={tvShowDetails.texts.sections.cast}>
                      <SectionContentWrapper>
                        <ParticipantsList
                          onPress={tvShowDetails.onPressParticipant}
                          participants={tvShowDetails.details.cast}
                        />
                      </SectionContentWrapper>
                    </Section>
                  </SectionWrapper>
                )}
                {!!tvShowDetails.details.numberOfSeasons && (
                  <SectionWrapper>
                    <Section title={tvShowDetails.texts.sections.seasons}>
                      <SectionContentWrapper>
                        <SeasonsSection
                          numberOfSeasons={
                            tvShowDetails.details.numberOfSeasons
                          }
                        />
                      </SectionContentWrapper>
                    </Section>
                  </SectionWrapper>
                )}
                {!!tvShowDetails.details.videos.length && (
                  <SectionWrapper>
                    <Section title={tvShowDetails.texts.sections.videos}>
                      <Videos videos={tvShowDetails.details.videos} />
                    </Section>
                  </SectionWrapper>
                )}
                {!!tvShowDetails.details.similar.length && (
                  <SectionWrapper>
                    <MediaHorizontalList
                      dataset={tvShowDetails.details.similar}
                      type="TV_SHOW"
                      title={'Similar'}
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
