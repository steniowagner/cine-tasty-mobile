import React from 'react';

import {
  ScrollWithAnimatedHeader,
  MediaItemDescription,
  StatusBar,
  Advice,
  Section,
  ImagesList,
} from '@common-components';

import { TVShowDetailsProps } from '../routes/route-params-types';
import { useTVShowDetails } from './use-tv-show-detailts';
import {
  MediaDetailsLoading,
  BackgroundImage,
  Header,
  SectionContentWrapper,
  TextContentWrapper,
  MediaInfo,
  SectionWrapper,
} from '../../common';
import { SeasonsSection } from './components/seasons-section/SeasonsSection';

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
                genres={tvShowDetails.genres}
              />
              <TextContentWrapper>
                <SectionWrapper>
                  <Section title={tvShowDetails.texts.sections.overview}>
                    <SectionContentWrapper>
                      <MediaItemDescription
                        description={tvShowDetails.details.overview || '-'}
                      />
                    </SectionContentWrapper>
                  </Section>
                </SectionWrapper>
                <SectionWrapper>
                  <MediaInfo infos={tvShowDetails.infos} />
                </SectionWrapper>
                {tvShowDetails.details?.images.length && (
                  <SectionWrapper>
                    <ImagesList
                      images={tvShowDetails?.details.images}
                      orientation="LANDSCAPE"
                    />
                  </SectionWrapper>
                )}
                <SectionWrapper>
                  <SeasonsSection
                    numberOfSeasons={
                      tvShowDetails?.details.numberOfSeasons || 0
                    }
                  />
                </SectionWrapper>
              </TextContentWrapper>
            </>
          )}
        </>
      </ScrollWithAnimatedHeader>
    </>
  );
};
