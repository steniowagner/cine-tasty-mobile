import React, {useLayoutEffect} from 'react';
import {ScrollView} from 'react-native';

import {
  HeaderBackButton,
  StatusBarStyled,
  RoundedButton,
  ImagesList,
  Section,
} from '@components';

import {ProductionNetworkCompanies} from '../../common/sections/production-network-companies/ProductionNetworkCompanies';
import {MediaDetailsError} from '../../common/media-details-error/MediaDetailsError';
import {ReviewsSection} from '../../common/sections/reviews/ReviewsSection';
import {GeneralInfo} from '../../common/sections/general-info/GeneralInfo';
import {HeaderInfo} from '../../common/header-info/header-info/HeaderInfo';
import {TVShowDetailStackProps} from '../routes/route-params-types';
import {Overview} from '../../common/sections/overview/Overview';
import {PeopleList} from '../../common/people-list/PeopleList';
import {Similar} from '../../common/sections/similar/Similar';
import {Videos} from '../../common/sections/videos/Videos';
import {Tags} from '../../common/sections/tags/Tags';
import {useTVShowDetails} from './useTVShowDetails';
import * as Styles from './TVShowDetail.styles';

export const TVShowDetail = (props: TVShowDetailStackProps) => {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton onPress={() => props.navigation.goBack()} />
      ),
    });
  }, []);

  const tvShowDetails = useTVShowDetails({
    hasVoteAverage: !!props.route.params.voteAverage,
    hasVoteCount: !!props.route.params.voteCount,
    hasGenresIds: !!props.route.params.genreIds,
    navigation: props.navigation,
    id: props.route.params.id,
  });

  if (tvShowDetails.hasError) {
    return <MediaDetailsError />;
  }

  return (
    <>
      <StatusBarStyled />
      <ScrollView bounces={false}>
        <HeaderInfo
          votesAverage={
            props.route.params.voteAverage || tvShowDetails.tvShow?.voteAverage
          }
          voteCount={
            props.route.params.voteCount || tvShowDetails.tvShow?.voteCount
          }
          imageURL={tvShowDetails.tvShow?.backdropPath || ''}
          posterURL={props.route.params.posterPath}
          isLoading={tvShowDetails.isLoading}
          title={props.route.params.title}
        />
        <Tags
          extraTags={[tvShowDetails.firstAirDate, tvShowDetails.texts.tvTag]}
          tags={
            props.route.params.genreIds || tvShowDetails.tvShow?.genres || []
          }
          isLoading={!props.route.params.genreIds && tvShowDetails.isLoading}
        />
        <Overview
          overview={tvShowDetails.tvShow?.overview}
          isLoading={tvShowDetails.isLoading}
        />
        {tvShowDetails?.tvShow && (
          <>
            <GeneralInfo infoItems={tvShowDetails.infoItems} />
            {!!tvShowDetails.tvShow.numberOfSeasons && (
              <Styles.SeeSeasonsButtonWrapper>
                <RoundedButton
                  text={tvShowDetails.texts.seeSeasons}
                  onPress={tvShowDetails.onPressSeeSeasons}
                />
              </Styles.SeeSeasonsButtonWrapper>
            )}
            {!!tvShowDetails.tvShow.createdBy.length && (
              <PeopleList
                sectionTitle={tvShowDetails.texts.sections.createdBy}
                onPressItem={tvShowDetails.onPressCreatedBy}
                dataset={tvShowDetails.tvShow.createdBy}
                type="creator"
              />
            )}
            {!!tvShowDetails.tvShow.cast.length && (
              <PeopleList
                sectionTitle={tvShowDetails.texts.sections.cast}
                onPressItem={tvShowDetails.onPressCast}
                dataset={tvShowDetails.tvShow.cast}
                type="cast"
              />
            )}
            {!!tvShowDetails.tvShow.crew.length && (
              <PeopleList
                sectionTitle={tvShowDetails.texts.sections.crew}
                onPressItem={tvShowDetails.onPressCrew}
                dataset={tvShowDetails.tvShow.crew}
                type="crew"
              />
            )}
            {!!tvShowDetails.tvShow.images.length && (
              <Section title={tvShowDetails.texts.sections.images}>
                <ImagesList
                  images={tvShowDetails.tvShow.images}
                  orientation="LANDSCAPE"
                />
              </Section>
            )}
            {!!tvShowDetails.tvShow.videos.length && (
              <Videos videos={tvShowDetails.tvShow.videos} />
            )}
            {!!tvShowDetails.tvShow.networks.length && (
              <Section title={tvShowDetails.texts.sections.networks}>
                <ProductionNetworkCompanies
                  productionNetworkCompaniesList={tvShowDetails.tvShow.networks}
                />
              </Section>
            )}
            {!!tvShowDetails.tvShow.productionCompanies.length && (
              <Section title={tvShowDetails.texts.sections.productionCompanies}>
                <ProductionNetworkCompanies
                  productionNetworkCompaniesList={
                    tvShowDetails.tvShow.productionCompanies
                  }
                />
              </Section>
            )}
            <ReviewsSection
              onPressViewAll={tvShowDetails.onPressReviews}
              reviews={tvShowDetails.tvShow.reviews}
            />
            <Similar
              similar={tvShowDetails.tvShow.similar}
              onPressItem={tvShowDetails.onPressSimilarItem}
            />
          </>
        )}
      </ScrollView>
    </>
  );
};
