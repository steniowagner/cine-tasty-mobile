import React from 'react';
import { FlatList } from 'react-native';

import SimplifiedMediaListItem from 'components/common/simplified-media-list-item/SimplifiedMediaListItem';
import { MovieSimplified } from 'types';

type Props = {
  movies: MovieSimplified[];
};

const MovieList = ({ movies }: Props) => (
  <FlatList
    renderItem={({ item, index }) => (
      <SimplifiedMediaListItem
        voteAverage={item.voteAverage}
        voteCount={item.voteCount}
        isFirst={index === 0}
        onPress={() => {}}
        image={item.image}
        title={item.title}
      />
    )}
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item) => `${item.id}`}
    horizontal
    data={movies}
  />
);

export default MovieList;
