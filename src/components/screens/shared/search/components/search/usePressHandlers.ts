import { useMemo } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import {
  SearchPerson_search_items_BasePerson as SearchPersonResult,
  SearchMovie_search_items_BaseMovie as SearchMovieResult,
  SearchType,
} from 'types/schema';

import useRecentSearches from '../recent-searches/useRecentSearches';
import { SearchStackParams } from '../../routes/route-params-types';

type SearchScreenNavigationProp = StackNavigationProp<SearchStackParams, 'SEARCH'>;

type State = {
  onPressListItem: (item: SearchPersonResult | SearchMovieResult) => void;
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

          console.log('SearchMovieResult - onPressListItemL: ', item.id, item.title);
        },
        onPressRecentSearchItem: (id: number) => {
          console.log('SearchMovieResult - onPressRecentSearchItem: ', id);
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
