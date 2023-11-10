import React from 'react';
import { FlatList } from 'react-native';

import { MediaListItem, Section } from '@common-components';
import {
  FamousDetails_famous_cast_movies,
  FamousDetails_famous_cast_tvShows,
} from '@schema-types';

import * as Styles from './MediaHorizontalList.style';

export type MediaHorizontalItem =
  | FamousDetails_famous_cast_movies
  | FamousDetails_famous_cast_tvShows;

export type MediaHorizontalListProps = {
  dataset: MediaHorizontalItem[];
  type: 'MOVIE' | 'TV_SHOW';
  title: string;
};

export const MediaHorizontalList = (props: MediaHorizontalListProps) => {
  if (!props.dataset.length) {
    return null;
  }

  return (
    <Styles.Wrapper>
      <Section title={props.title}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={Styles.sheet.flatlist}
          data={props.dataset}
          renderItem={({ item }) => (
            <MediaListItem
              layoutSize="large"
              voteAverage={item.voteAverage}
              voteCount={item.voteCount}
              image={item.posterPath}
              title={item.title}
              key={item.id}
            />
          )}
          testID={`media-horizontal-list-${props.type}`}
          horizontal
        />
      </Section>
    </Styles.Wrapper>
  );
};
