/* eslint-disable react/display-name */
import React, {useEffect, useLayoutEffect, useMemo} from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {withTheme} from 'styled-components/native';

import RoundedButton from '@components/common/rounded-button/RoundedButton';
import ImagesList from '@components/common/images-list/ImagesList';
import Section from '@components/common/section/Section';
import {useShowLanguageAlert, useStatusBarStyle} from '@hooks';
import * as TRANSLATIONS from '@i18n/tags';

import ProductionCompanies from '../../common/sections/production-network-companies/ProductionNetworkCompanies';
import HeaderBackButton from '../../../header-back-button/HeaderBackButton';
import useTVShowDetailPressHandlers from './useTVShowDetailPressHandlers';
import {TVShowDetailStackProps} from '../routes/route-params-types';
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

const TVShowDetail = ({navigation, theme, route}: TVShowDetailStackProps) => {
  const {handleShowLanguageAlert} = useShowLanguageAlert();
  const {
    onPressSimilarItem,
    onPressSeeSeasons,
    onPressCreatedBy,
    onPressReviews,
    onPressCrew,
    onPressCast,
  } = useTVShowDetailPressHandlers({
    navigation,
  });
  const {barStyle} = useStatusBarStyle({theme});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.goBack()} />
      ),
    });
  }, []);

  const {isLoading, hasError, tvShow, t} = useTVShowDetail({
    hasVoteAverage: !!route.params.voteAverage,
    hasVoteCount: !!route.params.voteCount,
    hasGenresIds: !!route.params.genreIds,
    id: route.params.id,
  });

  useEffect(() => {
    if (!isLoading && tvShow && !tvShow.overview) {
      handleShowLanguageAlert({
        descriptioni18nRef: TRANSLATIONS.LANGUAGE_WARNING_MEDIA_DESCRIPTION,
        positive18nRef: TRANSLATIONS.LANGUAGE_WARNING_MEDIA_POSITIVE_ACTION,
        titlei18nRef: TRANSLATIONS.LANGUAGE_WARNING_MEDIA_TITLE,
        onPressPositiveAction: () => {},
        singleAction: true,
      });
    }
  }, [isLoading, tvShow]);

  const firstAirDate = useMemo(
    (): string => (tvShow?.firstAirDate || '-').split('-')[0],
    [tvShow],
  );

  if (hasError) {
    return <MediaDetailError barStyle={barStyle} theme={theme} />;
  }

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.secondary}
        barStyle={barStyle}
        animated
      />
      <ScrollView bounces={false}>
        <Header
          votesAverage={route.params.voteAverage || tvShow?.voteAverage}
          voteCount={route.params.voteCount || tvShow?.voteCount}
          imageURL={tvShow?.backdropPath || ''}
          posterURL={route.params.posterPath}
          title={route.params.title}
          isLoading={isLoading}
        />
        <Tags
          extraTags={[
            firstAirDate,
            t(TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_TITLE),
          ]}
          tags={route.params.genreIds || tvShow?.genres || []}
          isLoading={!route.params.genreIds && isLoading}
        />
        <Overview overview={tvShow?.overview} isLoading={isLoading} />
        {!!tvShow && (
          <>
            <TVShowDetailsSection tvShow={tvShow} />
            {tvShow?.numberOfSeasons > 0 && (
              <Styles.SeeSeasonsButtonWrapper>
                <RoundedButton
                  text={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_SEASONS)}
                  onPress={() => onPressSeeSeasons(tvShow)}
                />
              </Styles.SeeSeasonsButtonWrapper>
            )}
            {!!tvShow?.createdBy.length && (
              <PeopleList
                onPressItem={onPressCreatedBy}
                sectionTitle={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_CREATED_BY)}
                dataset={tvShow.createdBy}
                noSubtext={false}
                type="creator"
              />
            )}
            {!!tvShow?.cast.length && (
              <PeopleList
                onPressItem={onPressCast}
                sectionTitle={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_CAST)}
                dataset={tvShow.cast}
                type="cast"
              />
            )}
            {!!tvShow?.crew.length && (
              <PeopleList
                sectionTitle={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_CREW)}
                onPressItem={onPressCrew}
                dataset={tvShow.crew}
                type="crew"
              />
            )}
            {!!tvShow?.images.length && (
              <Section title={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_IMAGES)}>
                <ImagesList images={tvShow.images} />
              </Section>
            )}
            {!!tvShow?.videos.length && <Videos videos={tvShow.videos} />}
            {!!tvShow?.networks.length && (
              <Section title={t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_NETWORKS)}>
                <ProductionCompanies productionsList={tvShow.networks} />
              </Section>
            )}
            {!!tvShow?.productionCompanies.length && (
              <Section
                title={t(
                  TRANSLATIONS.MEDIA_DETAIL_SECTIONS_PRODUCTION_COMPANIES,
                )}>
                <ProductionCompanies
                  productionsList={tvShow.productionCompanies}
                />
              </Section>
            )}
            <Reviews
              onPressViewAll={() => onPressReviews(tvShow)}
              reviews={tvShow.reviews}
            />
            <SimilarSection onPressItem={onPressSimilarItem} tvShow={tvShow} />
          </>
        )}
      </ScrollView>
    </>
  );
};

export default withTheme(TVShowDetail);
