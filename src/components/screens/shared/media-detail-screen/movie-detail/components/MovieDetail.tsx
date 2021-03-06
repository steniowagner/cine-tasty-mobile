/* eslint-disable react/display-name */
import React, { useLayoutEffect, useMemo } from 'react';
import { ScrollView, StatusBar, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DefaultTheme, withTheme } from 'styled-components';
import { RouteProp } from '@react-navigation/native';

import SimplifiedMediaListItem from 'components/common/simplified-media-list-item/SimplifiedMediaListItem';
import ImagesList from 'components/common/images-list/ImagesList';
import { formatCurrency, formatDate } from 'utils/formatters';
import Advise from 'components/common/advise/Advise';
import Section from 'components/common/Section';
import { useStatusBarStyle } from 'hooks';

import { MovieDetailInternalternalParams } from '../routes/route-params-types';
import ProductionCompanies from '../../common/sections/ProductionsList';
import Reviews from '../../common/sections/reviews/ReviewsSection';
import Overview from '../../common/sections/overview/Overview';
import PeopleList from '../../common/people-list/PeopleList';
import GeneralInfo from '../../common/sections/GeneralInfo';
import HeaderBackButton from '../../../HeaderBackButton';
import Header from '../../common/header-info/HeaderInfo';
import Tags from '../../common/sections/tags/Tags';
import Videos from '../../common/sections/Videos';
import useMovieDetail from './useMovieDetail';

export const MOVIE_PRODUCTION_COMPANIES_I18N_REF = 'translations:mediaDetail:sections:productionCompanies';
export const MOVIE_PRODUCTION_COUNTRIES_I18N_REF = 'translations:mediaDetail:sections:productionCountries';
export const MOVIE_SPOKEN_LANGUAGES_I18N_REF = 'translations:mediaDetail:sections:spokenLanguages';
export const ERROR_DESCRIPTION_I18N_REF = 'translations:mediaDetail:errorDescription';
export const ERROR_SUGGESTION_I18N_REF = 'translations:mediaDetail:errorSuggestion';
export const MOVIE_ORIGINAL_TITLE_I18N_REF = 'translations:mediaDetail:sections:originalTitle';
export const MOVIE_RELEASE_DATE_I18N_REF = 'translations:mediaDetail:sections:releaseDate';
export const MOVIE_SIMILAR_I18N_REF = 'translations:mediaDetail:sections:similar';
export const MOVIE_IMAGES_I18N_REF = 'translations:mediaDetail:sections:images';
export const MOVIE_CREW_I18N_REF = 'translations:mediaDetail:sections:crew';
export const MOVIE_CAST_I18N_REF = 'translations:mediaDetail:sections:cast';
export const ERROR_TITLE_I18N_REF = 'translations:mediaDetail:errorTitle';
export const MOVIE_REVENUE_I18N_REF = 'translations:mediaDetail:sections:revenue';
export const MOVIE_BUDGET_I18N_REF = 'translations:mediaDetail:sections:budget';

type Props = {
  navigation: StackNavigationProp<MovieDetailInternalternalParams, 'MOVIE_DETAIL'>;
  route: RouteProp<MovieDetailInternalternalParams, 'MOVIE_DETAIL'>;
  theme: DefaultTheme;
};

const MovieDetail = ({ navigation, theme, route }: Props) => {
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

  const releaseDate = useMemo((): string => (movie?.releaseDate || '-').split('-')[0], [
    movie,
  ]);

  if (hasError) {
    return (
      <>
        <StatusBar
          backgroundColor={theme.colors.secondary}
          barStyle={barStyle}
          animated
        />
        <Advise
          description={t(ERROR_DESCRIPTION_I18N_REF)}
          suggestion={t(ERROR_SUGGESTION_I18N_REF)}
          title={t(ERROR_TITLE_I18N_REF)}
          icon="alert-box"
        />
      </>
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
          extraTags={[releaseDate, t('translations:mediaDetail:movie:movie')]}
          tags={route.params.genreIds || movie?.genres || []}
          isLoading={!route.params.genreIds && isLoading}
        />
        <Overview
          overview={movie?.overview}
          isLoading={isLoading}
        />
        {!!movie && (
          <>
            <GeneralInfo
              infoItems={[
                {
                  title: t(MOVIE_ORIGINAL_TITLE_I18N_REF),
                  value: movie.originalTitle || '-',
                },
                {
                  title: t(MOVIE_RELEASE_DATE_I18N_REF),
                  value: formatDate(movie.releaseDate),
                },
                {
                  title: t(MOVIE_BUDGET_I18N_REF),
                  value: formatCurrency(movie.budget),
                },
                {
                  title: t(MOVIE_REVENUE_I18N_REF),
                  value: formatCurrency(movie.revenue),
                },
                {
                  title: t(MOVIE_PRODUCTION_COUNTRIES_I18N_REF),
                  value: movie.productionCountries.length
                    ? movie.productionCountries.join(', ')
                    : '-',
                },
                {
                  title: t(MOVIE_SPOKEN_LANGUAGES_I18N_REF),
                  value: movie.spokenLanguages.length
                    ? movie.spokenLanguages.join(', ')
                    : '-',
                },
              ]}
            />
            {!!movie.cast.length && (
              <PeopleList
                onPressItem={(id: string, name: string, image: string) => navigation.push('FAMOUS_DETAIL', {
                  profileImage: image,
                  id: Number(id),
                  name,
                })}
                sectionTitle={t(MOVIE_CAST_I18N_REF)}
                dataset={movie.cast}
                type="cast"
              />
            )}
            {!!movie.crew.length && (
              <PeopleList
                onPressItem={(id: string, name: string, image: string) => navigation.push('FAMOUS_DETAIL', {
                  profileImage: image,
                  id: Number(id),
                  name,
                })}
                sectionTitle={t(MOVIE_CREW_I18N_REF)}
                dataset={movie.crew}
                type="crew"
              />
            )}
            {!!movie.images.length && (
              <Section
                title={t(MOVIE_IMAGES_I18N_REF)}
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
            <Reviews
              onPressViewAll={() => navigation.navigate('REVIEWS', {
                mediaTitle: movie.title,
                reviews: movie.reviews,
              })}
              reviews={movie.reviews}
            />
            {!!movie.productionCompanies.length && (
              <Section
                title={t(MOVIE_PRODUCTION_COMPANIES_I18N_REF)}
              >
                <ProductionCompanies
                  productionsList={movie.productionCompanies}
                />
              </Section>
            )}
            <Section
              title={
                movie.similar.length
                  ? t(MOVIE_SIMILAR_I18N_REF)
                  : `${t(MOVIE_SIMILAR_I18N_REF)} (0)`
              }
            >
              <FlatList
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={({ item, index }) => (
                  <SimplifiedMediaListItem
                    onPress={() => navigation.push('MOVIE_DETAIL', {
                      voteAverage: item.voteAverage,
                      posterPath: item.posterPath,
                      voteCount: item.voteCount,
                      title: item.title,
                      id: item.id,
                    })}
                    voteAverage={item.voteAverage}
                    voteCount={item.voteCount}
                    image={item.posterPath}
                    isFirst={index === 0}
                    title={item.title}
                  />
                )}
                showsHorizontalScrollIndicator={false}
                data={movie.similar}
                horizontal
              />
            </Section>
          </>
        )}
      </ScrollView>
    </>
  );
};

export default withTheme(MovieDetail);
