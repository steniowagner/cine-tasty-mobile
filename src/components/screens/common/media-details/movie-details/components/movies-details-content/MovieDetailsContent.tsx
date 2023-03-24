import React from 'react';

import {ImagesList, Section} from '@components';
import * as SchemaTypes from '@schema-types';

import {ProductionNetworkCompanies} from '../../../common/sections/production-network-companies/ProductionNetworkCompanies';
import {ReviewsSection} from '../../../common/sections/reviews/ReviewsSection';
import {HeaderInfo} from '../../../common/header-info/header-info/HeaderInfo';
import {GeneralInfo} from '../../../common/sections/general-info/GeneralInfo';
import {Overview} from '../../../common/sections/overview/Overview';
import {
  PeopleList,
  PressItemParams,
} from '../../../common/people-list/PeopleList';
import {Similar} from '../../../common/sections/similar/Similar';
import {Videos} from '../../../common/sections/videos/Videos';
import * as Styles from './MoviesDetailsContent.styles';

type Texts = Record<string, any>;

type InfoItem = {
  value: string;
  title: any;
};

type MovieDetailsContentProps = {
  onPressReviews: (movie: SchemaTypes.MovieDetail_movie) => void;
  onPressSimilarMovie: (
    similarMovie: SchemaTypes.MovieDetail_movie_similar,
  ) => void;
  onPressCast: (params: PressItemParams) => void;
  onPressCrew: (params: PressItemParams) => void;
  votesAverage: number;
  voteCount: number;
  poster: string;
  title: string;
  tags: string[];
  releaseDate: string;
  texts: Texts;
  movie: SchemaTypes.MovieDetail_movie;
  infoItems: InfoItem[];
};

export const MovieDetailsContent = (props: MovieDetailsContentProps) => (
  <>
    <HeaderInfo
      votesAverage={props.votesAverage}
      voteCount={props.voteCount}
      poster={props.poster}
      title={props.title}
      tags={props.tags}
      extraTags={[props.releaseDate, props.texts.movieTag]}
    />
    <Styles.Wrapper>
      <Overview overview={props.movie.overview} />
      <>
        <GeneralInfo infoItems={props.infoItems} />
        {!!props.movie.cast.length && (
          <PeopleList
            sectionTitle={props.texts.sections.cast}
            onPressItem={props.onPressCast}
            dataset={props.movie.cast}
            type="cast"
          />
        )}
        {!!props.movie.crew.length && (
          <PeopleList
            sectionTitle={props.texts.sections.crew}
            onPressItem={props.onPressCrew}
            dataset={props.movie.crew}
            type="crew"
          />
        )}
        {!!props.movie.images.length && (
          <Section title={props.texts.sections.images}>
            <ImagesList images={props.movie.images} orientation="LANDSCAPE" />
          </Section>
        )}
        {!!props.movie.videos.length && <Videos videos={props.movie.videos} />}
        {!!props.movie.productionCompanies.length && (
          <Section title={props.texts.sections.productionCompanies}>
            <ProductionNetworkCompanies
              productionNetworkCompaniesList={props.movie.productionCompanies}
            />
          </Section>
        )}
        <ReviewsSection
          onPressViewAll={() => props.onPressReviews(props.movie)}
          reviews={props.movie.reviews}
        />
        <Similar
          similar={props.movie.similar}
          onPressItem={props.onPressSimilarMovie}
        />
      </>
    </Styles.Wrapper>
  </>
);
