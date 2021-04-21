/* eslint-disable react/display-name */
import React, { useLayoutEffect, useMemo } from 'react';
import { ScrollView, StatusBar, FlatList } from 'react-native';
import { withTheme } from 'styled-components';

import SimplifiedMediaListItem from '@components/common/simplified-media-list-item/SimplifiedMediaListItem';
import ImagesList from '@components/common/images-list/ImagesList';
import { formatCurrency, formatDate } from '@utils/formatters';
import Section from '@components/common/section/Section';
import Advise from '@components/common/advise/Advise';
import { useStatusBarStyle } from '@hooks';
import * as TRANSLATIONS from '@i18n/tags';
import { Routes } from '@routes/routes';

import { MovieDetailStackProps } from '../routes/route-params-types';
import ProductionCompanies from '../../common/sections/production-network-companies/ProductionNetworkCompanies';
import Reviews from '../../common/sections/reviews/ReviewsSection';
import Overview from '../../common/sections/overview/Overview';
import PeopleList from '../../common/people-list/PeopleList';
import GeneralInfo from '../../common/sections/general-info/GeneralInfo';
import HeaderBackButton from '../../../header-back-button/HeaderBackButton';
import Header from '../../common/header-info/header-info/HeaderInfo';
import Videos from '../../common/sections/videos/Videos';
import Tags from '../../common/sections/tags/Tags';
import useMovieDetail from './useMovieDetail';

const MovieDetail = ({ navigation, theme, route }: MovieDetailStackProps) => {
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
          description={t(TRANSLATIONS.MEDIA_DETAIL_ERROR_DESCRIPTION)}
          suggestion={t(TRANSLATIONS.MEDIA_DETAIL_ERROR_SUGGESTION)}
          title={t(TRANSLATIONS.MEDIA_DETAIL_ERROR_TITLE)}
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
            <GeneralInfo
              infoItems={[
                {
                  title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE),
                  value: movie.originalTitle || '-',
                },
                {
                  title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_RELEASE_DATE),
                  value: formatDate(movie.releaseDate),
                },
                {
                  title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_BUDGET),
                  value: formatCurrency(movie.budget),
                },
                {
                  title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_REVENUE),
                  value: formatCurrency(movie.revenue),
                },
                {
                  title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_PRODUCTION_COUNTRIES),
                  value: movie.productionCountries.length
                    ? movie.productionCountries.join(', ')
                    : '-',
                },
                {
                  title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_SPOKEN_LANGUAGES),
                  value: movie.spokenLanguages.length
                    ? movie.spokenLanguages.join(', ')
                    : '-',
                },
              ]}
            />
            {!!movie.cast.length && (
              <PeopleList
                onPressItem={(id: string, name: string, image: string) => navigation.push(Routes.Famous.DETAILS, {
                  profileImage: image,
                  id: Number(id),
                  name,
                })}
                sectionTitle={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_CAST)}
                dataset={movie.cast}
                type="cast"
              />
            )}
            {!!movie.crew.length && (
              <PeopleList
                onPressItem={(id: string, name: string, image: string) => navigation.push(Routes.Famous.DETAILS, {
                  profileImage: image,
                  id: Number(id),
                  name,
                })}
                sectionTitle={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_CREW)}
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
              onPressViewAll={() => navigation.navigate(Routes.MediaDetail.REVIEWS, {
                mediaTitle: movie.title,
                reviews: movie.reviews,
              })}
              reviews={movie.reviews}
            />
            <Section
              title={
                movie.similar.length
                  ? t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_SIMILAR)
                  : `${t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_SIMILAR)} (0)`
              }
            >
              <FlatList
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={({ item, index }) => (
                  <SimplifiedMediaListItem
                    onPress={() => navigation.push(Routes.Movie.DETAILS, {
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
