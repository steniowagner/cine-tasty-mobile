import React, {useLayoutEffect} from 'react';
import {ScrollView} from 'react-native';

import {
  HeaderBackButton,
  StatusBarStyled,
  ImagesList,
  Section,
} from '@components';

import {ProductionNetworkCompanies} from '../../common/sections/production-network-companies/ProductionNetworkCompanies';
import {MediaDetailsError} from '../../common/media-details-error/MediaDetailsError';
import {ReviewsSection} from '../../common/sections/reviews/ReviewsSection';
import {HeaderInfo} from '../../common/header-info/header-info/HeaderInfo';
import {GeneralInfo} from '../../common/sections/general-info/GeneralInfo';
import {MovieDetailStackProps} from '../routes/route-params-types';
import {Overview} from '../../common/sections/overview/Overview';
import {PeopleList} from '../../common/people-list/PeopleList';
import {Similar} from '../../common/sections/similar/Similar';
import {Videos} from '../../common/sections/videos/Videos';
import {Tags} from '../../common/sections/tags/Tags';
import {useMovieDetails} from './useMovieDetails';

export const MovieDetail = (props: MovieDetailStackProps) => {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton onPress={() => props.navigation.goBack()} />
      ),
    });
  }, []);

  const movieDetails = useMovieDetails({
    hasVoteAverage: !!props.route.params.voteAverage,
    hasVoteCount: !!props.route.params.voteCount,
    hasGenresIds: !!props.route.params.genreIds,
    navigation: props.navigation,
    id: props.route.params.id,
  });

  if (movieDetails.hasError) {
    return <MediaDetailsError />;
  }

  return (
    <>
      <StatusBarStyled />
      <ScrollView bounces={false}>
        <HeaderInfo
          votesAverage={
            props.route.params.voteAverage || movieDetails.movie?.voteAverage
          }
          voteCount={
            props.route.params.voteCount || movieDetails.movie?.voteCount
          }
          imageURL={movieDetails.movie?.backdropPath || ''}
          posterURL={props.route.params.posterPath}
          title={props.route.params.title}
          isLoading={movieDetails.isLoading}
        />
        <Tags
          extraTags={[movieDetails.releaseDate, movieDetails.texts.movieTag]}
          tags={props.route.params.genreIds || movieDetails.movie?.genres || []}
          isLoading={!props.route.params.genreIds && movieDetails.isLoading}
        />
        <Overview
          overview={movieDetails.movie?.overview}
          isLoading={movieDetails.isLoading}
        />
        {movieDetails.movie && (
          <>
            <GeneralInfo infoItems={movieDetails.infoItems} />
            {!!movieDetails.movie.cast.length && (
              <PeopleList
                sectionTitle={movieDetails.texts.sections.cast}
                onPressItem={movieDetails.onPressCast}
                dataset={movieDetails.movie.cast}
                type="cast"
              />
            )}
            {!!movieDetails.movie.crew.length && (
              <PeopleList
                sectionTitle={movieDetails.texts.sections.crew}
                onPressItem={movieDetails.onPressCrew}
                dataset={movieDetails.movie.crew}
                type="crew"
              />
            )}
            {!!movieDetails.movie.images.length && (
              <Section title={movieDetails.texts.sections.images}>
                <ImagesList images={movieDetails.movie.images} />
              </Section>
            )}
            {!!movieDetails.movie.videos.length && (
              <Videos videos={movieDetails.movie.videos} />
            )}
            {!!movieDetails.movie.productionCompanies.length && (
              <Section title={movieDetails.texts.sections.productionCompanies}>
                <ProductionNetworkCompanies
                  productionNetworkCompaniesList={
                    movieDetails.movie.productionCompanies
                  }
                />
              </Section>
            )}
            <ReviewsSection
              onPressViewAll={() =>
                movieDetails.onPressReviews(movieDetails.movie)
              }
              reviews={movieDetails.movie.reviews}
            />
            <Similar
              similar={movieDetails.movie.similar}
              onPressItem={movieDetails.onPressSimilarItem}
            />
          </>
        )}
      </ScrollView>
    </>
  );
};
