import React from 'react';
import { ScrollView, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import SimplifiedMediaListItem from 'components/common/simplified-media-list-item/SimplifiedMediaListItem';
import ImagesList from 'components/common/images-list/ImagesList';
import Section from 'components/common/Section';

import { MovieDetailInternalternalParams } from '../routes/route-params-types';
import ProductionCompanies from '../../common/sections/ProductionCompanies';
import Reviews from '../../common/sections/reviews/ReviewsSection';
import Overview from '../../common/sections/overview/Overview';
import PeopleList from '../../common/people-list/PeopleList';
import GeneralInfo from '../../common/sections/GeneralInfo';
import Header from '../../common/header-info/HeaderInfo';
import Videos from '../../common/sections/Videos';
import Tags from '../../common/sections/tags/Tags';
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

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const MovieDetail = ({ route }: Props) => {
  const { isLoading, movie, t } = useMovieDetail({
    hasVoteAverage: !!route.params.voteAverage,
    hasVoteCount: !!route.params.voteCount,
    hasGenresIds: !!route.params.genreIds,
    id: route.params.id,
  });

  return (
    <>
      <ScrollView
        bounces={false}
      >
        <Header
          thumbnailURL={movie?.backdropPath || ''}
          votesAverage={route.params.voteAverage}
          imageURL={movie?.backdropPath || ''}
          posterURL={route.params.posterPath}
          voteCount={route.params.voteCount}
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
                  value: movie.releaseDate || '-',
                },
                {
                  title: t('translations:mediaDetail:sections:budget'),
                  value: movie.budget ? formatter.format(movie.budget) : '-',
                },
                {
                  title: t('translations:mediaDetail:sections:revenue'),
                  value: movie.revenue ? formatter.format(movie.revenue) : '-',
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
            <PeopleList
              sectionTitle={t('translations:mediaDetail:sections:cast')}
              onPressItem={() => {}}
              dataset={movie.cast}
              type="cast"
            />
            <PeopleList
              sectionTitle={t('translations:mediaDetail:sections:crew')}
              onPressItem={() => {}}
              dataset={movie.crew}
              type="crew"
            />
            <Section
              title={t('translations:mediaDetail:sections:images')}
            >
              <ImagesList
                images={movie.images}
              />
            </Section>
            <Videos
              videos={movie.videos}
            />
            <Reviews
              reviews={movie.reviews}
            />
            <ProductionCompanies
              productionCompanies={movie.productionCompanies}
            />
            <Section
              title={t('translations:mediaDetail:sections:similar')}
            >
              <FlatList
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={({ item, index }) => (
                  <SimplifiedMediaListItem
                    onPress={() => console.log(item)}
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

export default MovieDetail;
