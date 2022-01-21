import {useMemo} from 'react';

import * as SchemaTypes from '@schema-types';

import {SearchNavigationProp} from '../../../routes/route-params-types';
import useTVShowsPressHandlers from './useTVShowsPressHandlers';
import useFamousPressHandlers from './useFamousPressHandlers';
import useMoviesPressHandlers from './useMoviesPressHandlers';

type UsePressHandlerProps = {
  searchType: SchemaTypes.SearchType;
  navigation: SearchNavigationProp;
};

const usePressHandler = ({navigation, searchType}: UsePressHandlerProps) => {
  const tvShowsPressHandlers = useTVShowsPressHandlers({navigation});
  const famousPressHandlers = useFamousPressHandlers({navigation});
  const moviesPressHandlers = useMoviesPressHandlers({navigation});

  const {onPressRecentSearchItem, onPressListItem} = useMemo(() => {
    const pressesHandlersMapping = {
      [SchemaTypes.SearchType.PERSON]: {
        onPressRecentSearchItem: famousPressHandlers.onPressRecentSearchItem,
        onPressListItem: famousPressHandlers.onPressListItem,
      },
      [SchemaTypes.SearchType.MOVIE]: {
        onPressListItem: moviesPressHandlers.onPressListItem,
        onPressRecentSearchItem: moviesPressHandlers.onPressRecentSearchItem,
      },
      [SchemaTypes.SearchType.TV]: {
        onPressListItem: tvShowsPressHandlers.onPressListItem,
        onPressRecentSearchItem: tvShowsPressHandlers.onPressRecentSearchItem,
      },
    };

    return pressesHandlersMapping[searchType];
  }, [
    tvShowsPressHandlers,
    famousPressHandlers,
    moviesPressHandlers,
    searchType,
  ]);

  return {
    onPressRecentSearchItem,
    onPressListItem,
  };
};

export default usePressHandler;
