import React from 'react';
import { ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import ImagesList from 'components/common/images-list/ImagesList';

import { MovieDetailInternalternalParams } from '../routes/route-params-types';
import ProductionCompanies from '../../common/sections/ProductionCompanies';
import Reviews from '../../common/sections/reviews/ReviewsSection';
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
      <ImagesList
        images={[
          '/zzWGRw277MNoCs3zhyG3YmYQsXv.jpg',
          '/xl5oCFLVMo4d4Pgxvrf8Jmc2IlA.jpg',
          '/qAKvUu2FSaDlnqznY4VOp5PmjIF.jpg',
          '/zMrk2G3XsnfYKiIp1NEfdtvDyBH.jpg',
          '/yw3ZvsL6uh78u9jqZeUOAa4R1jz.jpg',
          '/xFAGjsaVlg7n33hjyfM1EnBkYlK.jpg',
          '/bP8V1IVNRml68Xfmbtp4kqjUxkh.jpg',
          '/m7TH3tOD1krBRNcEfXMIsqVsifW.jpg',
          '/lRDfTlAtotNHSxJceQXZhBA2Hyv.jpg',
          '/aoHiMjRt0Qs1dtkV61LyxTnQtJl.jpg',
          '/6BKUUvR2UcUSCXHSyUdyPEJcBsV.jpg',
          '/vjMrfX3aNDXfgW8igmoWmF4UjQ0.jpg',
          '/v5FoP9d4M6rfrV2WA0MmpJKHmZ5.jpg',
          '/b0G2U0rWKmKF6wudvmh4CuHI2E3.jpg',
          '/duMoVxeEg4VX1MIOIGAiOYMiZ19.jpg',
          '/xuBDXlbjGNTMdQwobDjnx8pdIm0.jpg',
          '/wbAHIMM2oIB6gJLneWf6D6LwJz9.jpg',
          '/txwO4KbxsDRbv7p2WJD24YI8t9i.jpg',
          '/5Hjp9BxalM0eDviMcD8gdHplGbT.jpg',
          '/dPIwHRKSAMn40Ukew9L8WEW3Nm4.jpg',
          '/tfHhZU7y6guc2CqjRUK2G1Bwe9S.jpg',
          '/8AoUSkWjXCxe2Ez8Jx6enkq47Fz.jpg',
          '/pbAszLhGyW6yaYFoMW4aAF8BhsZ.jpg',
          '/a4Tp0t3ep4dhLcDoWSTkwLHJep2.jpg',
        ]}
      />
      <Videos
        videos={movie.videos}
      />
      <Reviews
        reviews={movie.reviews}
      />
      <ProductionCompanies
        productionCompanies={movie.productionCompanies}
      />
    </ScrollView>
  );
};

export default MovieDetail;
