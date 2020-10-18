import { useMemo } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import {
  SearchTVShow_search_items_BaseTVShow as SearchTVShowResult,
  SearchPerson_search_items_BasePerson as SearchPersonResult,
  SearchMovie_search_items_BaseMovie as SearchMovieResult,
  SearchType,
} from 'types/schema';
import { RecentSearchItem } from 'types';

import useRecentSearches from '../recent-searches/useRecentSearches';
import { SearchStackParams } from '../../routes/route-params-types';

type SearchScreenNavigationProp = StackNavigationProp<SearchStackParams, 'SEARCH'>;

type State = {
  onPressListItem: (
    item: SearchPersonResult | SearchMovieResult | SearchTVShowResult,
  ) => void;
  onPressRecentSearchItem: (id: number) => void;
};

type Props = {
  navigation: SearchScreenNavigationProp;
  searchType: SearchType;
};

const usePressHandler = ({ navigation, searchType }: Props): State => {
  const { persistItemToRecentSearches } = useRecentSearches({
    shouldSkipGetInitialRecentSearches: true,
    searchType,
  });

  const { onPressRecentSearchItem, onPressListItem } = useMemo(() => {
    const pressesHandlersMapping = {
      [SearchType.PERSON]: {
        onPressListItem: (item: SearchPersonResult) => {
          persistItemToRecentSearches({
            image: item.image,
            title: item.title,
            id: item.id,
          });

          navigation.navigate('FAMOUS_DETAIL', {
            id: item.id,
          });
        },
        onPressRecentSearchItem: (id: number) => {
          navigation.navigate('FAMOUS_DETAIL', {
            id,
          });
        },
      },
      [SearchType.MOVIE]: {
        onPressListItem: (movie: SearchMovieResult) => {
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
        onPressRecentSearchItem: (movie: RecentSearchItem) => {
          navigation.navigate('MOVIE_DETAIL', {
            posterPath: movie.image,
            title: movie.title,
            id: movie.id,
          });
        },
      },
      [SearchType.TV]: {
        onPressListItem: (item: SearchTVShowResult) => {
          persistItemToRecentSearches({
            image: item.posterPath,
            title: item.title,
            id: item.id,
          });

          navigation.navigate('MEDIA_DETAIL', {
            isMovie: false,
            id: item.id,
          });
        },
        onPressRecentSearchItem: (id: number) => {
          navigation.navigate('MEDIA_DETAIL', {
            isMovie: false,
            id,
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
