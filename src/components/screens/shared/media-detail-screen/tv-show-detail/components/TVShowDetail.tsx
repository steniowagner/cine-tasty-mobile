/* eslint-disable react/display-name */
import React, { useLayoutEffect, useMemo } from 'react';
import {
  ScrollView, StatusBar, FlatList, View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styled, { DefaultTheme, withTheme } from 'styled-components';

import SimplifiedMediaListItem from '@components/common/simplified-media-list-item/SimplifiedMediaListItem';
import RoundedButton from '@components/common/rounded-button/RoundedButton';
import ImagesList from '@components/common/images-list/ImagesList';
import Section from '@components/common/section/Section';
import Advise from '@components/common/advise/Advise';
import { formatDate } from '@utils/formatters';
import { useStatusBarStyle } from '@hooks';
import * as TRANSLATIONS from '@i18n/tags';

import { MovieDetailInternalternalParams } from '../routes/route-params-types';
import ProductionCompanies from '../../common/sections/production-network-companies/ProductionNetworkCompanies';
import Reviews from '../../common/sections/reviews/ReviewsSection';
import Overview from '../../common/sections/overview/Overview';
import PeopleList from '../../common/people-list/PeopleList';
import GeneralInfo from '../../common/sections/general-info/GeneralInfo';
import HeaderBackButton from '../../../header-back-button/HeaderBackButton';
import Header from '../../common/header-info/header-info/HeaderInfo';
import Videos from '../../common/sections/videos/Videos';
import Tags from '../../common/sections/tags/Tags';
import useTVShowDetail from './useTVShowDetail';

const SeeSeasonsButtonWrapper = styled(View)`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('14%')}px;
`;

type TVShowDetailProps = {
  navigation: StackNavigationProp<MovieDetailInternalternalParams, 'TV_SHOW_DETAIL'>;
  route: RouteProp<MovieDetailInternalternalParams, 'TV_SHOW_DETAIL'>;
  theme: DefaultTheme;
};

const TVShowDetail = ({ navigation, theme, route }: TVShowDetailProps) => {
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
          votesAverage={route.params.voteAverage || tvShow?.voteAverage}
          voteCount={route.params.voteCount || tvShow?.voteCount}
          imageURL={tvShow?.backdropPath || ''}
          posterURL={route.params.posterPath}
          title={route.params.title}
          isLoading={isLoading}
        />
        <Tags
          extraTags={[firstAirDate, t(TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_TITLE)]}
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
                  title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE),
                  value: tvShow.name || '-',
                },
                {
                  value: tvShow.originalLanguage,
                  title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_ORIGINAL_LANGUAGE),
                },
                {
                  title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_NUMBER_OF_EPISODES),
                  value: tvShow.numberOfEpisodes ? String(tvShow.numberOfEpisodes) : '-',
                },
                {
                  title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_NUMBER_OF_SEASONS),
                  value: tvShow.numberOfSeasons ? String(tvShow.numberOfSeasons) : '-',
                },
                {
                  title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_EPISODE_RUNTIME),
                  value: tvShow.episodeRunTime.length
                    ? tvShow.episodeRunTime.join(', ')
                    : '-',
                },
                {
                  title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_ORIGINAL_COUNTRY),
                  value: tvShow.originCountry ? tvShow.originCountry.join(', ') : '-',
                },
                {
                  title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_FIRST_AIR_DATE),
                  value: formatDate(tvShow.firstAirDate),
                },
                {
                  title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_LAST_AIR_DATE),
                  value: formatDate(tvShow.lastAirDate),
                },
              ]}
            />
            {tvShow?.numberOfSeasons > 0 && (
              <SeeSeasonsButtonWrapper>
                <RoundedButton
                  text={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_SEASONS)}
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
                sectionTitle={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_CREATED_BY)}
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
                sectionTitle={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_CAST)}
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
                sectionTitle={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_CREW)}
                dataset={tvShow.crew}
                type="crew"
              />
            )}
            {!!tvShow?.images.length && (
              <Section
                title={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_IMAGES)}
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
                title={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_NETWORKS)}
              >
                <ProductionCompanies
                  productionsList={tvShow.networks}
                />
              </Section>
            )}
            {!!tvShow?.productionCompanies.length && (
              <Section
                title={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_PRODUCTION_COMPANIES)}
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
                  ? t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_SIMILAR)
                  : `${t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_SIMILAR)} (0)`
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
