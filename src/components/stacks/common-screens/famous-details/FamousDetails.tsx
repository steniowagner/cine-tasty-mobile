import React from 'react';

import {
  ScrollWithAnimatedHeader,
  ImagesList,
  MediaHorizontalList,
  Advice,
} from '@common-components';

import { FamousDetailsNavigationProps as FamousDetailsProps } from './routes/route-params-types';
import { useFamousDetails } from './use-famous-details';
import { Header } from './components/header/Header';
import { DeathDay } from './components/death-day/DeathDay';
import { Biography } from './components/biography/Biography';
import * as Styles from './FamousDetails.styles';

export const FamousDetails = (props: FamousDetailsProps) => {
  const famousDetails = useFamousDetails({ id: props.route.params.id });

  if (famousDetails.hasError) {
    return (
      <Styles.AdviceWrapper>
        <Advice
          description={famousDetails.texts.advice.description}
          suggestion={famousDetails.texts.advice.suggestion}
          title={famousDetails.texts.advice.title}
          icon="alert-box"
        />
      </Styles.AdviceWrapper>
    );
  }

  return (
    <ScrollWithAnimatedHeader
      canBounce={!famousDetails.isLoading && !famousDetails.hasError}
      isScrollEnabled={!famousDetails.isLoading}
      headerTitle={props.route.params.name || '-'}
      backgroundColorInterpolationInput={
        famousDetails.headerInterpolationValues.backgroudColor.input
      }
      backgroundColorInterpolationOutput={
        famousDetails.headerInterpolationValues.backgroudColor.output
      }
      titleOpacityInterpolationInput={
        famousDetails.headerInterpolationValues.title.input
      }
      titleOpacityInterpolationOutput={
        famousDetails.headerInterpolationValues.title.output
      }>
      <>
        <Header
          knownForDepartment={famousDetails.details?.knownForDepartment}
          profileImage={props.route.params.profileImage}
          placeOfBirth={famousDetails.details?.placeOfBirth}
          birthDate={famousDetails.details?.birthday}
          isLoading={famousDetails.isLoading}
          name={props.route.params.name}
        />
        {famousDetails.details && (
          <>
            {!!famousDetails.details.deathday && (
              <DeathDay day={famousDetails.details.deathday} />
            )}
            {!!famousDetails.details.biography && (
              <Biography
                sectionTitle={famousDetails.texts.biography}
                text={famousDetails.details.biography}
              />
            )}
            <ImagesList
              images={famousDetails.details.images}
              orientation="PORTRAIT"
            />
            <MediaHorizontalList
              title={famousDetails.texts.castMovies}
              dataset={famousDetails.details.cast.movies}
              type="MOVIE"
            />
            <MediaHorizontalList
              title={famousDetails.texts.castTVShows}
              dataset={famousDetails.details.cast.tvShows}
              type="TV_SHOW"
            />
          </>
        )}
      </>
    </ScrollWithAnimatedHeader>
  );
};
