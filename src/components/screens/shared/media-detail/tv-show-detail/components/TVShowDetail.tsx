/* eslint-disable react/display-name */
import React, { useLayoutEffect, useMemo } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { withTheme } from 'styled-components';

import RoundedButton from '@components/common/rounded-button/RoundedButton';
import ImagesList from '@components/common/images-list/ImagesList';
import Section from '@components/common/section/Section';
import { useStatusBarStyle } from '@hooks';
import * as TRANSLATIONS from '@i18n/tags';

import ProductionCompanies from '../../common/sections/production-network-companies/ProductionNetworkCompanies';
import HeaderBackButton from '../../../header-back-button/HeaderBackButton';
import useTVShowDetailPressHandlers from './useTVShowDetailPressHandlers';
import { TVShowDetailStackProps } from '../routes/route-params-types';
import Header from '../../common/header-info/header-info/HeaderInfo';
import Reviews from '../../common/sections/reviews/ReviewsSection';
import Overview from '../../common/sections/overview/Overview';
import PeopleList from '../../common/people-list/PeopleList';
import MediaDetailError from '../../common/MediaDetailError';
import TVShowDetailsSection from './TVShowDetailsSection';
import Videos from '../../common/sections/videos/Videos';
import Tags from '../../common/sections/tags/Tags';
import useTVShowDetail from './useTVShowDetail';
import * as Styles from './TVShowDetail.styles';
import SimilarSection from './SimilarSection';

const TVShowDetail = (props: TVShowDetailStackProps) => {
  const tvShowDetailPressHandlers = useTVShowDetailPressHandlers({
    navigation: props.navigation,
  });

  const statusBarStyle = useStatusBarStyle({ theme: props.theme });

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => props.navigation.goBack()}
        />
      ),
    });
  }, []);

  const tvShowDetail = useTVShowDetail({
    hasVoteAverage: !!props.route.params.voteAverage,
    hasVoteCount: !!props.route.params.voteCount,
    hasGenresIds: !!props.route.params.genreIds,
    id: props.route.params.id,
  });

  const firstAirDate = useMemo(
    (): string => (tvShowDetail.tvShow?.firstAirDate || '-').split('-')[0],
    [tvShowDetail.tvShow],
  );

  if (tvShowDetail.hasError) {
    return (
      <MediaDetailError
        barStyle={statusBarStyle.barStyle}
        theme={props.theme}
      />
    );
  }

  return (
    <>
      <StatusBar
        backgroundColor={props.theme.colors.secondary}
        barStyle={statusBarStyle.barStyle}
        animated
      />
      <ScrollView
        bounces={false}
      >
        <Header
          votesAverage={
            props.route.params.voteAverage || tvShowDetail.tvShow?.voteAverage
          }
          voteCount={props.route.params.voteCount || tvShowDetail.tvShow?.voteCount}
          imageURL={tvShowDetail.tvShow?.backdropPath || ''}
          posterURL={props.route.params.posterPath}
          title={props.route.params.title}
          isLoading={tvShowDetail.isLoading}
        />
        <Tags
          extraTags={[
            firstAirDate,
            tvShowDetail.t(TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_TITLE),
          ]}
          tags={props.route.params.genreIds || tvShowDetail.tvShow?.genres || []}
          isLoading={!props.route.params.genreIds && tvShowDetail.isLoading}
        />
        <Overview
          overview={tvShowDetail.tvShow?.overview}
          isLoading={tvShowDetail.isLoading}
        />
        {!!tvShowDetail.tvShow && (
          <>
            <TVShowDetailsSection
              tvShow={tvShowDetail.tvShow}
            />
            {tvShowDetail.tvShow?.numberOfSeasons > 0 && (
              <Styles.SeeSeasonsButtonWrapper>
                <RoundedButton
                  text={tvShowDetail.t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_SEASONS)}
                  onPress={() => tvShowDetailPressHandlers.onPressSeeSeasons(tvShowDetail.tvShow)}
                />
              </Styles.SeeSeasonsButtonWrapper>
            )}
            {!!tvShowDetail.tvShow?.createdBy.length && (
              <PeopleList
                onPressItem={tvShowDetailPressHandlers.onPressCreatedBy}
                sectionTitle={tvShowDetail.t(
                  TRANSLATIONS.MEDIA_DETAIL_SECTIONS_CREATED_BY,
                )}
                dataset={tvShowDetail.tvShow.createdBy}
                withSubtext={false}
                type="creator"
              />
            )}
            {!!tvShowDetail.tvShow?.cast.length && (
              <PeopleList
                onPressItem={tvShowDetailPressHandlers.onPressCast}
                sectionTitle={tvShowDetail.t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_CAST)}
                dataset={tvShowDetail.tvShow.cast}
                withSubtext
                type="cast"
              />
            )}
            {!!tvShowDetail.tvShow?.crew.length && (
              <PeopleList
                sectionTitle={tvShowDetail.t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_CREW)}
                onPressItem={tvShowDetailPressHandlers.onPressCrew}
                dataset={tvShowDetail.tvShow.crew}
                withSubtext
                type="crew"
              />
            )}
            {!!tvShowDetail.tvShow?.images.length && (
              <Section
                title={tvShowDetail.t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_IMAGES)}
              >
                <ImagesList
                  images={tvShowDetail.tvShow.images}
                />
              </Section>
            )}
            {!!tvShowDetail.tvShow?.videos.length && (
              <Videos
                videos={tvShowDetail.tvShow.videos}
              />
            )}
            {!!tvShowDetail.tvShow?.networks.length && (
              <Section
                title={tvShowDetail.t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_NETWORKS)}
              >
                <ProductionCompanies
                  productionsList={tvShowDetail.tvShow.networks}
                />
              </Section>
            )}
            {!!tvShowDetail.tvShow?.productionCompanies.length && (
              <Section
                title={tvShowDetail.t(
                  TRANSLATIONS.MEDIA_DETAIL_SECTIONS_PRODUCTION_COMPANIES,
                )}
              >
                <ProductionCompanies
                  productionsList={tvShowDetail.tvShow.productionCompanies}
                />
              </Section>
            )}
            <Reviews
              onPressViewAll={() => tvShowDetailPressHandlers.onPressReviews(tvShowDetail.tvShow)}
              reviews={tvShowDetail.tvShow.reviews}
            />
            <SimilarSection
              onPressItem={tvShowDetailPressHandlers.onPressSimilarItem}
              tvShow={tvShowDetail.tvShow}
            />
          </>
        )}
      </ScrollView>
    </>
  );
};

export default withTheme(TVShowDetail);
