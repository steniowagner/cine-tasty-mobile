import React from 'react';

import {RoundedButton, ImagesList, Section} from '@components';
import * as SchemaTypes from '@schema-types';

import {ProductionNetworkCompanies} from '../../common/sections/production-network-companies/ProductionNetworkCompanies';
import {ReviewsSection} from '../../common/sections/reviews/ReviewsSection';
import {GeneralInfo} from '../../common/sections/general-info/GeneralInfo';
import {HeaderInfo} from '../../common/header-info/header-info/HeaderInfo';
import {Overview} from '../../common/sections/overview/Overview';
import {PeopleList, PressItemParams} from '../../common/people-list/PeopleList';
import {Similar} from '../../common/sections/similar/Similar';
import {Videos} from '../../common/sections/videos/Videos';
import * as MediaDetailsCommonStyles from '../../Styles';
import * as Styles from './TVShowDetails.styles';

type InfoItem = {
  value: string;
  title: any;
};

type TVShowDetailsContentProps = {
  onPressReviews: () => void;
  onPressSimilarTVShow: (
    similarTVShow: SchemaTypes.TVShowDetail_tvShow_similar,
  ) => void;
  onPressCast: (params: PressItemParams) => void;
  onPressCrew: (params: PressItemParams) => void;
  onPressCreatedBy: (params: PressItemParams) => void;
  onPressSeeSeasons: () => void;
  votesAverage: number;
  voteCount: number;
  poster: string;
  title: string;
  tags: string[];
  releaseDate: string;
  texts: Record<string, any>;
  tvShow: SchemaTypes.TVShowDetail_tvShow;
  infoItems: InfoItem[];
  firstAirDate: string;
};

export const TVShowDetailsContent = (props: TVShowDetailsContentProps) => (
  <>
    <HeaderInfo
      votesAverage={props.votesAverage}
      voteCount={props.voteCount}
      poster={props.poster}
      title={props.title}
      tags={props.tags}
      extraTags={[props.releaseDate, props.texts.tvShowTag]}
    />
    <MediaDetailsCommonStyles.Wrapper>
      <Overview overview={props.tvShow?.overview} isLoading={false} />
      <>
        <GeneralInfo infoItems={props.infoItems} />
        {!!props.tvShow.numberOfSeasons && (
          <Styles.SeeSeasonsButtonWrapper>
            <RoundedButton
              text={props.texts.seeSeasons}
              onPress={props.onPressSeeSeasons}
            />
          </Styles.SeeSeasonsButtonWrapper>
        )}
        {!!props.tvShow.createdBy.length && (
          <PeopleList
            sectionTitle={props.texts.sections.createdBy}
            onPressItem={props.onPressCreatedBy}
            dataset={props.tvShow.createdBy}
            type="creator"
          />
        )}
        {!!props.tvShow.cast.length && (
          <PeopleList
            sectionTitle={props.texts.sections.cast}
            onPressItem={props.onPressCast}
            dataset={props.tvShow.cast}
            type="cast"
          />
        )}
        {!!props.tvShow.crew.length && (
          <PeopleList
            sectionTitle={props.texts.sections.crew}
            onPressItem={props.onPressCrew}
            dataset={props.tvShow.crew}
            type="crew"
          />
        )}
        {!!props.tvShow.images.length && (
          <Section title={props.texts.sections.images}>
            <ImagesList images={props.tvShow.images} orientation="LANDSCAPE" />
          </Section>
        )}
        {!!props.tvShow.videos.length && (
          <Videos videos={props.tvShow.videos} />
        )}
        {!!props.tvShow.networks.length && (
          <Section title={props.texts.sections.networks}>
            <ProductionNetworkCompanies
              productionNetworkCompaniesList={props.tvShow.networks}
            />
          </Section>
        )}
        {!!props.tvShow.productionCompanies.length && (
          <Section title={props.texts.sections.productionCompanies}>
            <ProductionNetworkCompanies
              productionNetworkCompaniesList={props.tvShow.productionCompanies}
            />
          </Section>
        )}
        <ReviewsSection
          onPressViewAll={props.onPressReviews}
          reviews={props.tvShow.reviews}
        />
        <Similar
          similar={props.tvShow.similar}
          onPressItem={props.onPressSimilarTVShow}
        />
      </>
    </MediaDetailsCommonStyles.Wrapper>
  </>
);
