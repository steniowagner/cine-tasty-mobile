/* eslint-disable camelcase */
import { useMemo } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

import useRecentSearches from '../recent-searches/useRecentSearches';
import { SearchStackParams } from '../../routes/route-params-types';

type SearchScreenNavigationProp = StackNavigationProp<SearchStackParams, 'SEARCH'>;

type State = {
  onPressListItem: (
    item:
      | SchemaTypes.SearchPerson_search_items_BasePerson
      | SchemaTypes.SearchMovie_search_items_BaseMovie
      | SchemaTypes.SearchTVShow_search_items_BaseTVShow,
  ) => void;
  onPressRecentSearchItem: (recentSearchItem: Types.RecentSearchItem) => void;
};

type Props = {
  navigation: SearchScreenNavigationProp;
  searchType: SchemaTypes.SearchType;
};

const usePressHandler = ({ navigation, searchType }: Props): State => {
  const { persistItemToRecentSearches } = useRecentSearches({
    shouldSkipGetInitialRecentSearches: true,
    searchType,
  });

  const { onPressRecentSearchItem, onPressListItem } = useMemo(() => {
    const pressesHandlersMapping = {
      [SchemaTypes.SearchType.PERSON]: {
        onPressListItem: (item: SchemaTypes.SearchPerson_search_items_BasePerson) => {
          persistItemToRecentSearches({
            image: item.image,
            title: item.title,
            id: item.id,
          });

          navigation.navigate('FAMOUS_DETAIL', {
            profileImage: item.image,
            name: item.title,
            id: item.id,
          });
        },
        onPressRecentSearchItem: (person: Types.RecentSearchItem) => {
          navigation.navigate('FAMOUS_DETAIL', {
            profileImage: person.image,
            name: person.title,
            id: person.id,
          });
        },
      },
      [SchemaTypes.SearchType.MOVIE]: {
        onPressListItem: (movie: SchemaTypes.SearchMovie_search_items_BaseMovie) => {
          persistItemToRecentSearches({
            image: movie.posterPath,
            title: movie.title,
            id: movie.id,
          });

          navigation.navigate('MOVIE_DETAIL', {
            genreIds: movie.genreIds || [],
            voteAverage: movie.voteAverage,
            posterPath: movie.posterPath,
            voteCount: movie.voteCount,
            title: movie.title,
            id: movie.id,
          });
        },
        onPressRecentSearchItem: (movie: Types.RecentSearchItem) => {
          navigation.navigate('MOVIE_DETAIL', {
            posterPath: movie.image,
            title: movie.title,
            id: movie.id,
          });
        },
      },
      [SchemaTypes.SearchType.TV]: {
        onPressListItem: (tvShow: SchemaTypes.SearchTVShow_search_items_BaseTVShow) => {
          persistItemToRecentSearches({
            image: tvShow.posterPath,
            title: tvShow.title,
            id: tvShow.id,
          });

          navigation.navigate('TV_SHOW_DETAIL', {
            genreIds: tvShow.genreIds || [],
            voteAverage: tvShow.voteAverage,
            posterPath: tvShow.posterPath,
            voteCount: tvShow.voteCount,
            title: tvShow.title,
            id: tvShow.id,
          });
        },
        onPressRecentSearchItem: (tvShow: Types.RecentSearchItem) => {
          navigation.navigate('TV_SHOW_DETAIL', {
            posterPath: tvShow.image,
            title: tvShow.title,
            id: tvShow.id,
          });
        },
      },
    };

    return pressesHandlersMapping[searchType];
  }, [searchType]);

  return {
    onPressRecentSearchItem,
    onPressListItem,
  };
};

export default usePressHandler;
