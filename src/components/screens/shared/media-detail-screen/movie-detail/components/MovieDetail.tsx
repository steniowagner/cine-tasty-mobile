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
import PeopleList from '../../common/people-list/PeopleList';
import GeneralInfo from '../../common/sections/GeneralInfo';
import Header from '../../common/header-info/HeaderInfo';
import Overview from '../../common/sections/Overview';
import Videos from '../../common/sections/Videos';
import Tags from '../../common/sections/Tags';
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

const MovieDetail = ({ route }: Props) => {
  const { isLoading, movie } = useMovieDetail({
    hasVoteAverage: !!route.params.voteAverage,
    hasVoteCount: !!route.params.voteCount,
    hasGenresIds: !!route.params.genreIds,
    id: route.params.id,
  });

  if (!movie) {
    return null;
  }

  return (
    <ScrollView>
      <Header
        isLoading={isLoading}
        thumbnailURL={movie.backdropPath}
        votesAverage={route.params.voteAverage}
        voteCount={route.params.voteCount}
        posterURL={route.params.posterPath}
        title={route.params.title}
        imageURL={movie.backdropPath}
      />
      <Tags
        tags={route.params.genreIds || movie.genres}
        releaseDate={movie.releaseDate}
      />
      <Overview
        overview={movie.overview}
      />
      <GeneralInfo
        infoItems={[
          {
            title: 'Original title',
            value: movie.originalTitle,
          },
          {
            title: 'Release date',
            value: movie.releaseDate,
          },
          {
            title: 'Budget',
            value: movie.budget,
          },
          {
            title: 'Revenue',
            value: movie.revenue,
          },
          {
            title: 'Spoken languages',
            value: movie.spokenLanguages,
          },
          {
            title: 'Production countries',
            value: movie.productionCountries.join(', '),
          },
        ]}
      />
      <PeopleList
        sectionTitle="Cast"
        onPressItem={() => {}}
        dataset={movie.cast}
        type="cast"
      />
      <PeopleList
        sectionTitle="Crew"
        onPressItem={() => {}}
        dataset={movie.crew}
        type="crew"
      />
      <Section
        title="Images"
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
        title="Similar"
      >
        <FlatList
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
          keyExtractor={(item, index) => `${item.id}-${index}`}
          showsHorizontalScrollIndicator={false}
          data={movie.similar}
          horizontal
        />
      </Section>
    </ScrollView>
  );
};

export default MovieDetail;
