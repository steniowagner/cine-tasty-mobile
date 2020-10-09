import { useMemo } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import {
  SearchTVShow_search_items_BaseTVShow as SearchTVShowResult,
  SearchPerson_search_items_BasePerson as SearchPersonResult,
  SearchMovie_search_items_BaseMovie as SearchMovieResult,
  SearchType,
} from 'types/schema';

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
        onPressListItem: (item: SearchMovieResult) => {
          persistItemToRecentSearches({
            image: item.posterPath,
            title: item.title,
            id: item.id,
          });

          navigation.navigate('MEDIA_DETAIL', {
            isMovie: true,
            id: item.id,
          });
        },
        onPressRecentSearchItem: (id: number) => {
          navigation.navigate('MEDIA_DETAIL', {
            isMovie: true,
            id,
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
