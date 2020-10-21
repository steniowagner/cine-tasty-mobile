/* eslint-disable react/display-name */
import React, { useLayoutEffect } from 'react';
import { ScrollView, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import SimplifiedMediaListItem from 'components/common/simplified-media-list-item/SimplifiedMediaListItem';
import ImagesList from 'components/common/images-list/ImagesList';
import Advise from 'components/common/advise/Advise';
import Section from 'components/common/Section';
import { formatDate } from 'utils/formatters';

import ProductionCompanies from '../../common/sections/ProductionCompanies';
import { MovieDetailInternalternalParams } from '../routes/route-params-types';
import Reviews from '../../common/sections/reviews/ReviewsSection';
import Overview from '../../common/sections/overview/Overview';
import PeopleList from '../../common/people-list/PeopleList';
import GeneralInfo from '../../common/sections/GeneralInfo';
import HeaderBackButton from '../../../HeaderBackButton';
import Header from '../../common/header-info/HeaderInfo';
import Tags from '../../common/sections/tags/Tags';
import Videos from '../../common/sections/Videos';
import useTVShowDetail from './useTVShowDetail';

export const TV_SHOW_ORIGINAL_TITLE_I18N_REF = 'translations:mediaDetail:sections:originalTitle';
export const TV_SHOW_RELEASE_DATE_I18N_REF = 'translations:mediaDetail:sections:releaseDate';
export const ERROR_DESCRIPTION_I18N_REF = 'translations:mediaDetail:errorDescription';
export const ERROR_SUGGESTION_I18N_REF = 'translations:mediaDetail:errorSuggestion';
export const TV_SHOWS_SIMILAR_I18N_REF = 'translations:mediaDetail:sections:similar';
export const TV_SHOWS_IMAGES_I18N_REF = 'translations:mediaDetail:sections:images';
export const TV_SHOWS_CREW_I18N_REF = 'translations:mediaDetail:sections:crew';
export const TV_SHOWS_CAST_I18N_REF = 'translations:mediaDetail:sections:cast';
export const ERROR_TITLE_I18N_REF = 'translations:mediaDetail:errorTitle';

type Props = {
  navigation: StackNavigationProp<MovieDetailInternalternalParams, 'TV_SHOW_DETAIL'>;
  route: RouteProp<MovieDetailInternalternalParams, 'TV_SHOW_DETAIL'>;
};

const TVShowDetail = ({ navigation, route }: Props) => {
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
    isLoading, hasError, tvShow, t,
  } = useTVShowDetail({
    hasVoteAverage: !!route.params.voteAverage,
    hasVoteCount: !!route.params.voteCount,
    hasGenresIds: !!route.params.genreIds,
    id: route.params.id,
  });

  if (hasError) {
    return (
      <Advise
        description={t(ERROR_DESCRIPTION_I18N_REF)}
        suggestion={t(ERROR_SUGGESTION_I18N_REF)}
        title={t(ERROR_TITLE_I18N_REF)}
        icon="alert-box"
      />
    );
  }

  return (
    <ScrollView
      bounces={false}
    >
      <Header
        votesAverage={route.params.voteAverage || tvShow?.voteAverage}
        voteCount={route.params.voteCount || tvShow?.voteCount}
        thumbnailURL={tvShow?.backdropPath || ''}
        imageURL={tvShow?.backdropPath || ''}
        posterURL={route.params.posterPath}
        title={route.params.title}
        isLoading={isLoading}
      />
      <Tags
        tags={route.params.genreIds || tvShow?.genres || []}
        isLoading={!route.params.genreIds && isLoading}
        releaseDate={tvShow?.firstAirDate || '-'}
      />
      <Overview
        overview={tvShow?.overview}
        isLoading={isLoading}
      />
      {!!tvShow && (
        <>
          <GeneralInfo
            infoItems={[
              {
                title: t(TV_SHOW_ORIGINAL_TITLE_I18N_REF),
                value: tvShow.name || '-',
              },
              {
                value: formatDate(tvShow.firstAirDate),
                title: t(TV_SHOW_RELEASE_DATE_I18N_REF),
              },
            ]}
          />
          {!!tvShow.cast.length && (
            <PeopleList
              onPressItem={(id: string) => navigation.push('FAMOUS_DETAIL', { id: Number(id) })}
              sectionTitle={t(TV_SHOWS_CAST_I18N_REF)}
              dataset={tvShow.cast}
              type="cast"
            />
          )}
          {!!tvShow.crew.length && (
            <PeopleList
              onPressItem={(id: string) => navigation.push('FAMOUS_DETAIL', { id: Number(id) })}
              sectionTitle={t(TV_SHOWS_CREW_I18N_REF)}
              dataset={tvShow.crew}
              type="crew"
            />
          )}
          {!!tvShow.images.length && (
            <Section
              title={t(TV_SHOWS_IMAGES_I18N_REF)}
            >
              <ImagesList
                images={tvShow.images}
              />
            </Section>
          )}
          {!!tvShow.videos.length && (
          <Videos
            videos={tvShow.videos}
          />
          )}
          <Reviews
            onPressViewAll={() => navigation.navigate('REVIEWS', {
              mediaTitle: tvShow.name,
              reviews: tvShow.reviews,
            })}
            reviews={tvShow.reviews}
          />
          {!!tvShow.productionCompanies.length && (
            <ProductionCompanies
              productionCompanies={tvShow.productionCompanies}
            />
          )}
          <Section
            title={
              tvShow.similar.length
                ? t(TV_SHOWS_SIMILAR_I18N_REF)
                : `${t(TV_SHOWS_SIMILAR_I18N_REF)} (0)`
            }
          >
            <FlatList
              keyExtractor={(item, index) => `${item.id}-${index}`}
              renderItem={({ item, index }) => (
                <SimplifiedMediaListItem
                  onPress={() => navigation.push('TV_SHOW_DETAIL', {
                    voteAverage: item.voteAverage,
                    posterPath: item.posterPath,
                    voteCount: item.voteCount,
                    title: item.name,
                    id: item.id,
                  })}
                  voteAverage={item.voteAverage}
                  voteCount={item.voteCount}
                  image={item.posterPath}
                  isFirst={index === 0}
                  title={item.name}
                />
              )}
              showsHorizontalScrollIndicator={false}
              data={tvShow.similar}
              horizontal
            />
          </Section>
        </>
      )}
    </ScrollView>
  );
};

export default TVShowDetail;
