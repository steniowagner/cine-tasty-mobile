/* eslint-disable react/display-name */
import React, { useLayoutEffect, useMemo } from 'react';
import {
  ScrollView, StatusBar, FlatList, View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styled, { DefaultTheme, withTheme } from 'styled-components';

import SimplifiedMediaListItem from 'components/common/simplified-media-list-item/SimplifiedMediaListItem';
import ImagesList from 'components/common/images-list/ImagesList';
import RoundedButton from 'components/common/RoundedButton';
import Advise from 'components/common/advise/Advise';
import Section from 'components/common/Section';
import { formatDate } from 'utils/formatters';
import { useStatusBarStyle } from 'hooks';

import { MovieDetailInternalternalParams } from '../routes/route-params-types';
import ProductionCompanies from '../../common/sections/production-network-companies/ProductionNetworkCompanies';
import Reviews from '../../common/sections/reviews/ReviewsSection';
import Overview from '../../common/sections/overview/Overview';
import PeopleList from '../../common/people-list/PeopleList';
import GeneralInfo from '../../common/sections/GeneralInfo';
import HeaderBackButton from '../../../HeaderBackButton';
import Header from '../../common/header-info/HeaderInfo';
import Videos from '../../common/sections/videos/Videos';
import Tags from '../../common/sections/tags/Tags';
import useTVShowDetail from './useTVShowDetail';

export const TV_SHOWS_NUMBER_NUMBER_OF_EPISODES_I18N_REF = 'translations:mediaDetail:sections:numberOfEpisodes';
export const TV_SHOWS_NUMBER_NUMBER_OF_SEASONS_I18N_REF = 'translations:mediaDetail:sections:numberOfSeasons';
export const TV_SHOWS_PRODUCTION_COMPANIES_I18N_REF = 'translations:mediaDetail:sections:productionCompanies';
export const TV_SHOW_ORIGINAL_LANGUAGE_I18N_REF = 'translations:mediaDetail:sections:originalLanguage';
export const TV_SHOWS_EPISODE_RUN_TIME_I18N_REF = 'translations:mediaDetail:sections:episodeRunTime';
export const TV_SHOWS_ORIGIN_COUNTRY_I18N_REF = 'translations:mediaDetail:sections:originCountry';
export const TV_SHOWS_FIRST_AIR_DATE_I18N_REF = 'translations:mediaDetail:sections:firstAirDate';
export const TV_SHOW_ORIGINAL_TITLE_I18N_REF = 'translations:mediaDetail:sections:originalTitle';
export const TV_SHOWS_LAST_AIR_DATE_I18N_REF = 'translations:mediaDetail:sections:lastAirDate';
export const TV_SHOWS_CREATED_BY_I18N_REF = 'translations:mediaDetail:sections:createdBy';
export const TV_SHOWS_NETWORKS_I18N_REF = 'translations:mediaDetail:sections:networks';
export const ERROR_DESCRIPTION_I18N_REF = 'translations:mediaDetail:errorDescription';
export const ERROR_SUGGESTION_I18N_REF = 'translations:mediaDetail:errorSuggestion';
export const TV_SHOWS_SIMILAR_I18N_REF = 'translations:mediaDetail:sections:similar';
export const TV_SHOW_SEASONS_I18N_REF = 'translations:mediaDetail:sections:seasons';
export const TV_SHOWS_IMAGES_I18N_REF = 'translations:mediaDetail:sections:images';
export const TV_SHOWS_CREW_I18N_REF = 'translations:mediaDetail:sections:crew';
export const TV_SHOWS_CAST_I18N_REF = 'translations:mediaDetail:sections:cast';
export const ERROR_TITLE_I18N_REF = 'translations:mediaDetail:errorTitle';

const SeeSeasonsButtonWrapper = styled(View)`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('14%')}px;
`;

type Props = {
  navigation: StackNavigationProp<MovieDetailInternalternalParams, 'TV_SHOW_DETAIL'>;
  route: RouteProp<MovieDetailInternalternalParams, 'TV_SHOW_DETAIL'>;
  theme: DefaultTheme;
};

const TVShowDetail = ({ navigation, theme, route }: Props) => {
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
    isLoading, hasError, tvShow, t,
  } = useTVShowDetail({
    hasVoteAverage: !!route.params.voteAverage,
    hasVoteCount: !!route.params.voteCount,
    hasGenresIds: !!route.params.genreIds,
    id: route.params.id,
  });

  const firstAirDate = useMemo(
    (): string => (tvShow?.firstAirDate || '-').split('-')[0],
    [tvShow],
  );

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
          votesAverage={route.params.voteAverage || tvShow?.voteAverage}
          voteCount={route.params.voteCount || tvShow?.voteCount}
          imageURL={tvShow?.backdropPath || ''}
          posterURL={route.params.posterPath}
          title={route.params.title}
          isLoading={isLoading}
        />
        <Tags
          extraTags={[firstAirDate, t('translations:mediaDetail:tvShow:tvShow')]}
          tags={route.params.genreIds || tvShow?.genres || []}
          isLoading={!route.params.genreIds && isLoading}
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
                  value: tvShow.originalLanguage,
                  title: t(TV_SHOW_ORIGINAL_LANGUAGE_I18N_REF),
                },
                {
                  title: t(TV_SHOWS_NUMBER_NUMBER_OF_EPISODES_I18N_REF),
                  value: tvShow.numberOfEpisodes ? String(tvShow.numberOfEpisodes) : '-',
                },
                {
                  title: t(TV_SHOWS_NUMBER_NUMBER_OF_SEASONS_I18N_REF),
                  value: tvShow.numberOfSeasons ? String(tvShow.numberOfSeasons) : '-',
                },
                {
                  title: t(TV_SHOWS_EPISODE_RUN_TIME_I18N_REF),
                  value: tvShow.episodeRunTime.length
                    ? tvShow.episodeRunTime.join(', ')
                    : '-',
                },
                {
                  title: t(TV_SHOWS_ORIGIN_COUNTRY_I18N_REF),
                  value: tvShow.originCountry ? tvShow.originCountry.join(', ') : '-',
                },
                {
                  title: t(TV_SHOWS_FIRST_AIR_DATE_I18N_REF),
                  value: formatDate(tvShow.firstAirDate),
                },
                {
                  title: t(TV_SHOWS_LAST_AIR_DATE_I18N_REF),
                  value: formatDate(tvShow.lastAirDate),
                },
              ]}
            />
            {tvShow?.numberOfSeasons > 0 && (
              <SeeSeasonsButtonWrapper>
                <RoundedButton
                  text={t(TV_SHOW_SEASONS_I18N_REF)}
                  onPress={() => navigation.navigate('TV_SHOW_SEASONS', {
                    numberOfSeasons: tvShow.numberOfSeasons,
                    title: tvShow.name,
                    id: tvShow.id,
                  })}
                />
              </SeeSeasonsButtonWrapper>
            )}
            {!!tvShow?.createdBy.length && (
              <PeopleList
                onPressItem={(id: string, name: string, image: string) => navigation.push('FAMOUS_DETAIL', {
                  profileImage: image,
                  id: Number(id),
                  name,
                })}
                sectionTitle={t(TV_SHOWS_CREATED_BY_I18N_REF)}
                dataset={tvShow.createdBy}
                noSubtext={false}
                type="creator"
              />
            )}
            {!!tvShow?.cast.length && (
              <PeopleList
                onPressItem={(id: string, name: string, image: string) => navigation.push('FAMOUS_DETAIL', {
                  profileImage: image,
                  id: Number(id),
                  name,
                })}
                sectionTitle={t(TV_SHOWS_CAST_I18N_REF)}
                dataset={tvShow.cast}
                type="cast"
              />
            )}
            {!!tvShow?.crew.length && (
              <PeopleList
                onPressItem={(id: string, name: string, image: string) => navigation.push('FAMOUS_DETAIL', {
                  profileImage: image,
                  id: Number(id),
                  name,
                })}
                sectionTitle={t(TV_SHOWS_CREW_I18N_REF)}
                dataset={tvShow.crew}
                type="crew"
              />
            )}
            {!!tvShow?.images.length && (
              <Section
                title={t(TV_SHOWS_IMAGES_I18N_REF)}
              >
                <ImagesList
                  images={tvShow.images}
                />
              </Section>
            )}
            {!!tvShow?.videos.length && (
            <Videos
              videos={tvShow.videos}
            />
            )}
            {!!tvShow?.networks.length && (
              <Section
                title={t(TV_SHOWS_NETWORKS_I18N_REF)}
              >
                <ProductionCompanies
                  productionsList={tvShow.networks}
                />
              </Section>
            )}
            {!!tvShow?.productionCompanies.length && (
              <Section
                title={t(TV_SHOWS_PRODUCTION_COMPANIES_I18N_REF)}
              >
                <ProductionCompanies
                  productionsList={tvShow.productionCompanies}
                />
              </Section>
            )}
            <Reviews
              onPressViewAll={() => navigation.navigate('REVIEWS', {
                mediaTitle: tvShow.name,
                reviews: tvShow.reviews,
              })}
              reviews={tvShow.reviews}
            />
            <Section
              title={
                tvShow?.similar.length
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
    </>
  );
};

export default withTheme(TVShowDetail);
