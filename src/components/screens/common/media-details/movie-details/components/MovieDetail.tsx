import React, {useEffect, useLayoutEffect, useMemo} from 'react';
import {ScrollView} from 'react-native';

import {HeaderBackButton, ImagesList} from '@components';
import * as TRANSLATIONS from '@i18n/tags';
import {showLanguageAlert} from '@utils';
import {StatusBarStyled, Section} from '@components';

import {ProductionNetworkCompanies} from '../../common/sections/production-network-companies/ProductionNetworkCompanies';
import useMovieDetailPressHandlers from './useMovieDetailPressHandlers';
import {HeaderInfo} from '../../common/header-info/header-info/HeaderInfo';
import {MovieDetailStackProps} from '../routes/route-params-types';
import {ReviewsSection} from '../../common/sections/reviews/ReviewsSection';
import {Overview} from '../../common/sections/overview/Overview';
import {MediaDetailsError} from '../../common/media-details-error/MediaDetailsError';
import {PeopleList} from '../../common/people-list/PeopleList';
import {Videos} from '../../common/sections/videos/Videos';
import {Tags} from '../../common/sections/tags/Tags';
import useMovieDetail from './useMovieDetail';
import DetailsSection from './MovieDetailsSection';
import SimilarSection from './SimilarSection';

export const MovieDetail = ({navigation, route}: MovieDetailStackProps) => {
  const {onPressSimilarItem, onPressCrew, onPressReviews, onPressCast} =
    useMovieDetailPressHandlers({
      navigation,
    });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.goBack()} />
      ),
    });
  }, []);

  const {isLoading, hasError, movie, t} = useMovieDetail({
    hasVoteAverage: !!route.params.voteAverage,
    hasVoteCount: !!route.params.voteCount,
    hasGenresIds: !!route.params.genreIds,
    id: route.params.id,
  });

  useEffect(() => {
    if (!isLoading && movie && !movie.overview) {
      showLanguageAlert({
        description: TRANSLATIONS.LANGUAGE_WARNING_MEDIA_DESCRIPTION,
        positiveActionTitle:
          TRANSLATIONS.LANGUAGE_WARNING_MEDIA_POSITIVE_ACTION,
        title: TRANSLATIONS.LANGUAGE_WARNING_MEDIA_TITLE,
        onPressPositiveAction: () => {},
        singleAction: true,
      });
    }
  }, [isLoading, movie]);

  const releaseDate = useMemo(
    (): string => (movie?.releaseDate || '-').split('-')[0],
    [movie],
  );

  if (hasError) {
    return <MediaDetailsError />;
  }

  return (
    <>
      <StatusBarStyled />
      <ScrollView bounces={false}>
        <HeaderInfo
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
        <Overview overview={movie?.overview} isLoading={isLoading} />
        {!!movie && (
          <>
            <DetailsSection movie={movie} />
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
              <Section title={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_IMAGES)}>
                <ImagesList images={movie.images} />
              </Section>
            )}
            {!!movie.videos.length && <Videos videos={movie.videos} />}
            {!!movie.productionCompanies.length && (
              <Section
                title={t(
                  TRANSLATIONS.MEDIA_DETAIL_SECTIONS_PRODUCTION_COMPANIES,
                )}>
                <ProductionNetworkCompanies
                  productionNetworkCompaniesList={movie.productionCompanies}
                />
              </Section>
            )}
            <ReviewsSection
              onPressViewAll={() => onPressReviews(movie)}
              reviews={movie.reviews}
            />
            <SimilarSection movie={movie} onPressItem={onPressSimilarItem} />
          </>
        )}
      </ScrollView>
    </>
  );
};
