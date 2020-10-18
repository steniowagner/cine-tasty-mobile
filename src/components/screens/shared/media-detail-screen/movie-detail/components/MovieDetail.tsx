/* eslint-disable react/display-name */
import React, { useLayoutEffect } from 'react';
import { ScrollView, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import SimplifiedMediaListItem from 'components/common/simplified-media-list-item/SimplifiedMediaListItem';
import ImagesList from 'components/common/images-list/ImagesList';
import { formatCurrency, formatDate } from 'utils/formatters';
import Advise from 'components/common/advise/Advise';
import Section from 'components/common/Section';

import { MovieDetailInternalternalParams } from '../routes/route-params-types';
import ProductionCompanies from '../../common/sections/ProductionCompanies';
import Reviews from '../../common/sections/reviews/ReviewsSection';
import Overview from '../../common/sections/overview/Overview';
import HeaderBackButton from '../../common/HeaderBackButton';
import PeopleList from '../../common/people-list/PeopleList';
import GeneralInfo from '../../common/sections/GeneralInfo';
import Header from '../../common/header-info/HeaderInfo';
import Tags from '../../common/sections/tags/Tags';
import Videos from '../../common/sections/Videos';
import useMovieDetail from './useMovieDetail';

type MovieDetailScreenNavigationProp = StackNavigationProp<
  MovieDetailInternalternalParams,
  'MOVIE_DETAIL'
>;

type MovieDetailScreenRouteProp = RouteProp<
  MovieDetailInternalternalParams,
  'MOVIE_DETAIL'
>;

type Props = {
  navigation: MovieDetailScreenNavigationProp;
  route: MovieDetailScreenRouteProp;
};

const MovieDetail = ({ navigation, route }: Props) => {
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

  if (hasError) {
    return (
      <Advise
        description={t('translations:mediaDetail:errorDescription')}
        suggestion={t('translations:mediaDetail:errorSuggestion')}
        title={t('translations:mediaDetail:errorTitle')}
        icon="alert-box"
      />
    );
  }

  return (
    <>
      <ScrollView
        bounces={false}
      >
        <Header
          votesAverage={route.params.voteAverage || movie?.voteAverage}
          voteCount={route.params.voteCount || movie?.voteCount}
          thumbnailURL={movie?.backdropPath || ''}
          imageURL={movie?.backdropPath || ''}
          posterURL={route.params.posterPath}
          title={route.params.title}
          isLoading={isLoading}
        />
        <Tags
          tags={route.params.genreIds || movie?.genres || []}
          isLoading={!route.params.genreIds && isLoading}
          releaseDate={movie?.releaseDate || '-'}
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
                  title: t('translations:mediaDetail:sections:originalTitle'),
                  value: movie.originalTitle || '-',
                },
                {
                  title: t('translations:mediaDetail:sections:releaseDate'),
                  value: formatDate(movie.releaseDate),
                },
                {
                  title: t('translations:mediaDetail:sections:budget'),
                  value: formatCurrency(movie.budget),
                },
                {
                  title: t('translations:mediaDetail:sections:revenue'),
                  value: formatCurrency(movie.revenue),
                },
                {
                  title: t('translations:mediaDetail:sections:productionCountries'),
                  value: movie.productionCountries.length
                    ? movie.productionCountries.join(', ')
                    : '-',
                },
                {
                  title: t('translations:mediaDetail:sections:spokenLanguages'),
                  value: movie.spokenLanguages.length
                    ? movie.spokenLanguages.join(', ')
                    : '-',
                },
              ]}
            />
            {!!movie.cast.length && (
              <PeopleList
                onPressItem={(id: string) => navigation.push('FAMOUS_DETAIL', { id: Number(id) })}
                sectionTitle={t('translations:mediaDetail:sections:cast')}
                dataset={movie.cast}
                type="cast"
              />
            )}
            {!!movie.crew.length && (
              <PeopleList
                onPressItem={(id: string) => navigation.push('FAMOUS_DETAIL', { id: Number(id) })}
                sectionTitle={t('translations:mediaDetail:sections:crew')}
                dataset={movie.crew}
                type="crew"
              />
            )}
            {!!movie.images.length && (
              <Section
                title={t('translations:mediaDetail:sections:images')}
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
              reviews={movie.reviews}
            />
            {!!movie.productionCompanies.length && (
              <ProductionCompanies
                productionCompanies={movie.productionCompanies}
              />
            )}
            {!!movie.similar.length && (
              <Section
                title={t('translations:mediaDetail:sections:similar')}
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
            )}
          </>
        )}
      </ScrollView>
    </>
  );
};

export default MovieDetail;
