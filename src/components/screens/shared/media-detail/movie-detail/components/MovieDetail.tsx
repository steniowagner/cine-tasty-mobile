/* eslint-disable react/display-name */
import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { withTheme } from 'styled-components';

import ImagesList from '@components/common/images-list/ImagesList';
import { useShowLanguageAlert, useStatusBarStyle } from '@hooks';
import Section from '@components/common/section/Section';
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

const MovieDetail = ({ navigation, theme, route }: MovieDetailStackProps) => {
  const { handleShowLanguageAlert } = useShowLanguageAlert();
  const {
    onPressSimilarItem,
    onPressCrew,
    onPressReviews,
    onPressCast,
  } = useMovieDetailPressHandlers({
    navigation,
  });
  const { barStyle } = useStatusBarStyle({ theme });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, []);

  const {
    isLoading, hasError, movie, t,
  } = useMovieDetail({
    hasVoteAverage: !!route.params.voteAverage,
    hasVoteCount: !!route.params.voteCount,
    hasGenresIds: !!route.params.genreIds,
    id: route.params.id,
  });

  useEffect(() => {
    if (!isLoading && movie && !movie.overview) {
      handleShowLanguageAlert({
        descriptioni18nRef: TRANSLATIONS.LANGUAGE_WARNING_MEDIA_DESCRIPTION,
        positive18nRef: TRANSLATIONS.LANGUAGE_WARNING_MEDIA_POSITIVE_ACTION,
        titlei18nRef: TRANSLATIONS.LANGUAGE_WARNING_MEDIA_TITLE,
        onPressPositiveAction: () => {},
        singleAction: true,
      });
    }
  }, [isLoading, movie]);

  const releaseDate = useMemo((): string => (movie?.releaseDate || '-').split('-')[0], [
    movie,
  ]);

  if (hasError) {
    return (
      <MediaDetailError
        barStyle={barStyle}
        theme={theme}
      />
    );
  }

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.secondary}
        barStyle={barStyle}
        animated
      />
      <ScrollView
        bounces={false}
      >
        <Header
          votesAverage={route.params.voteAverage || movie?.voteAverage}
          voteCount={route.params.voteCount || movie?.voteCount}
          imageURL={movie?.backdropPath || ''}
          posterURL={route.params.posterPath}
          title={route.params.title}
          isLoading={isLoading}
        />
        <Tags
          extraTags={[releaseDate, t(TRANSLATIONS.MEDIA_DETAIL_MOVIE_TITLE)]}
          tags={route.params.genreIds || movie?.genres || []}
          isLoading={!route.params.genreIds && isLoading}
        />
        <Overview
          overview={movie?.overview}
          isLoading={isLoading}
        />
        {!!movie && (
          <>
            <DetailsSection
              movie={movie}
            />
            {!!movie.cast.length && (
              <PeopleList
                sectionTitle={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_CAST)}
                onPressItem={onPressCast}
                dataset={movie.cast}
                type="cast"
              />
            )}
            {!!movie.crew.length && (
              <PeopleList
                sectionTitle={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_CREW)}
                onPressItem={onPressCrew}
                dataset={movie.crew}
                type="crew"
              />
            )}
            {!!movie.images.length && (
              <Section
                title={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_IMAGES)}
              >
                <ImagesList
                  images={movie.images}
                />
              </Section>
            )}
            {!!movie.videos.length && (
            <Videos
              videos={movie.videos}
            />
            )}
            {!!movie.productionCompanies.length && (
              <Section
                title={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_PRODUCTION_COMPANIES)}
              >
                <ProductionCompanies
                  productionsList={movie.productionCompanies}
                />
              </Section>
            )}
            <Reviews
              onPressViewAll={() => onPressReviews(movie)}
              reviews={movie.reviews}
            />
            <SimilarSection
              movie={movie}
              onPressItem={onPressSimilarItem}
            />
          </>
        )}
      </ScrollView>
    </>
  );
};

export default withTheme(MovieDetail);
