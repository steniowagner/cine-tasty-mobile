/* eslint-disable react/display-name */
import React, { useLayoutEffect, useMemo } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { withTheme } from 'styled-components';

import ImagesList from '@components/common/images-list/ImagesList';
import Section from '@components/common/section/Section';
import { useStatusBarStyle } from '@hooks';
import * as TRANSLATIONS from '@i18n/tags';

import ProductionCompanies from '../../common/sections/production-network-companies/ProductionNetworkCompanies';
import HeaderBackButton from '../../../header-back-button/HeaderBackButton';
import useMovieDetailPressHandlers from './useMovieDetailPressHandlers';
import Header from '../../common/header-info/header-info/HeaderInfo';
import { MovieDetailStackProps } from '../routes/route-params-types';
import Reviews from '../../common/sections/reviews/ReviewsSection';
import Overview from '../../common/sections/overview/Overview';
import MediaDetailError from '../../common/MediaDetailError';
import PeopleList from '../../common/people-list/PeopleList';
import Videos from '../../common/sections/videos/Videos';
import Tags from '../../common/sections/tags/Tags';
import useMovieDetail from './useMovieDetail';
import DetailsSection from './MovieDetailsSection';
import SimilarSection from './SimilarSection';

const MovieDetail = (props: MovieDetailStackProps) => {
  const movieDetailPressHandlers = useMovieDetailPressHandlers({
    navigation: props.navigation,
  });
  const statusBarStyle = useStatusBarStyle({ theme: props.theme });

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => props.navigation.goBack()}
        />
      ),
    });
  }, []);

  const movieDetail = useMovieDetail({
    hasVoteAverage: !!props.route.params.voteAverage,
    hasVoteCount: !!props.route.params.voteCount,
    hasGenresIds: !!props.route.params.genreIds,
    id: props.route.params.id,
  });

  const releaseDate = useMemo(
    (): string => (movieDetail.movie?.releaseDate || '-').split('-')[0],
    [movieDetail.movie],
  );

  if (movieDetail.hasError) {
    return (
      <MediaDetailError
        barStyle={statusBarStyle.barStyle}
        theme={props.theme}
      />
    );
  }

  return (
    <>
      <StatusBar
        backgroundColor={props.theme.colors.secondary}
        barStyle={statusBarStyle.barStyle}
        animated
      />
      <ScrollView
        bounces={false}
      >
        <Header
          votesAverage={props.route.params.voteAverage || movieDetail.movie?.voteAverage}
          voteCount={props.route.params.voteCount || movieDetail.movie?.voteCount}
          imageURL={movieDetail.movie?.backdropPath || ''}
          posterURL={props.route.params.posterPath}
          title={props.route.params.title}
          isLoading={movieDetail.isLoading}
        />
        <Tags
          extraTags={[releaseDate, movieDetail.t(TRANSLATIONS.MEDIA_DETAIL_MOVIE_TITLE)]}
          tags={props.route.params.genreIds || movieDetail.movie?.genres || []}
          isLoading={!props.route.params.genreIds && movieDetail.isLoading}
        />
        <Overview
          overview={movieDetail.movie?.overview}
          isLoading={movieDetail.isLoading}
        />
        {!!movieDetail.movie && (
          <>
            <DetailsSection
              movie={movieDetail.movie}
            />
            {!!movieDetail.movie.cast.length && (
              <PeopleList
                sectionTitle={movieDetail.t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_CAST)}
                onPressItem={movieDetailPressHandlers.onPressCast}
                dataset={movieDetail.movie.cast}
                withSubtext
                type="cast"
              />
            )}
            {!!movieDetail.movie.crew.length && (
              <PeopleList
                sectionTitle={movieDetail.t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_CREW)}
                onPressItem={movieDetailPressHandlers.onPressCrew}
                dataset={movieDetail.movie.crew}
                withSubtext
                type="crew"
              />
            )}
            {!!movieDetail.movie.images.length && (
              <Section
                title={movieDetail.t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_IMAGES)}
              >
                <ImagesList
                  images={movieDetail.movie.images}
                />
              </Section>
            )}
            {!!movieDetail.movie.videos.length && (
              <Videos
                videos={movieDetail.movie.videos}
              />
            )}
            {!!movieDetail.movie.productionCompanies.length && (
              <Section
                title={movieDetail.t(
                  TRANSLATIONS.MEDIA_DETAIL_SECTIONS_PRODUCTION_COMPANIES,
                )}
              >
                <ProductionCompanies
                  productionsList={movieDetail.movie.productionCompanies}
                />
              </Section>
            )}
            <Reviews
              onPressViewAll={() => movieDetailPressHandlers.onPressReviews(movieDetail.movie)}
              reviews={movieDetail.movie.reviews}
            />
            <SimilarSection
              movie={movieDetail.movie}
              onPressItem={movieDetailPressHandlers.onPressSimilarItem}
            />
          </>
        )}
      </ScrollView>
    </>
  );
};

export default withTheme(MovieDetail);
