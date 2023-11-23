import React from 'react';
import { FlatList } from 'react-native';

import { MediaListItem, Section } from '@common-components';
import {
  FamousDetails_famous_cast_movies,
  FamousDetails_famous_cast_tvShows,
} from '@schema-types';

import { MediaType } from '../media-list-item/use-media-list-item';
import * as Styles from './MediaHorizontalList.style';

export type MediaHorizontalItem =
  | FamousDetails_famous_cast_movies
  | FamousDetails_famous_cast_tvShows;

export type MediaHorizontalListProps = {
  dataset: MediaHorizontalItem[];
  type: MediaType;
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
              mediaType={props.type}
              layoutSize="large"
              voteAverage={item.voteAverage}
              voteCount={item.voteCount}
              image={item.posterPath}
              title={item.title}
              id={item.id}
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
